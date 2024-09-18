import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { loadStripe } from '@stripe/stripe-js';

export const useCredits = () => {
  const { user } = useUser();
  const [credits, setCredits] = useState(0);
  const [tier, setTier] = useState('FREE');

  useEffect(() => {
    const fetchCredits = async () => {
      if (user) {
        try {
          const response = await fetch('/api/credits');
          const data = await response.json();
          setCredits(data.credits);
          setTier(data.tier);
        } catch (error) {
          console.error('Failed to fetch credits:', error);
        }
      }
    };

    fetchCredits();
  }, [user]);

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

  return { credits, tier, purchaseCredits, upgradeToPremium };
};