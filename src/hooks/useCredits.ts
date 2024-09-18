import { useReducer, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { loadStripe } from '@stripe/stripe-js';

type State = {
  credits: number;
  tier: 'FREE' | 'PREMIUM';
};

type Action = 
  | { type: 'SET_CREDITS', payload: number }
  | { type: 'SET_TIER', payload: 'FREE' | 'PREMIUM' }
  | { type: 'SET_ALL', payload: State };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CREDITS':
      return { ...state, credits: action.payload };
    case 'SET_TIER':
      return { ...state, tier: action.payload };
    case 'SET_ALL':
      return action.payload;
    default:
      return state;
  }
};

export const useCredits = () => {
  const { user } = useUser();
  const [state, dispatch] = useReducer(reducer, { credits: 0, tier: 'FREE' });

  const fetchCredits = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch('/api/credits');
        const data = await response.json();
        dispatch({ type: 'SET_ALL', payload: { credits: data.credits, tier: data.tier } });
      } catch (error) {
        console.error('Failed to fetch credits:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  const setCredits = (newCredits: number) => {
    dispatch({ type: 'SET_CREDITS', payload: newCredits });
  };

  const purchaseCredits = async () => {
    try {
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'credits' }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate purchase');
      }

      const { sessionId } = await response.json();

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error purchasing credits:', error);
    }
  };

  const upgradeToPremium = async () => {
    try {
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'premium' }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate upgrade');
      }

      const { sessionId } = await response.json();

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error upgrading to premium:', error);
    }
  };

  return { 
    credits: state.credits, 
    tier: state.tier, 
    setCredits, 
    purchaseCredits, 
    upgradeToPremium, 
    fetchCredits 
  };
};