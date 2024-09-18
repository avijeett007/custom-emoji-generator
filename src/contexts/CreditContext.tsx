import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

type CreditState = {
  credits: number;
  tier: 'FREE' | 'PREMIUM';
};

type CreditAction = 
  | { type: 'SET_CREDITS'; payload: number }
  | { type: 'SET_TIER'; payload: 'FREE' | 'PREMIUM' }
  | { type: 'SET_ALL'; payload: CreditState };

type CreditContextType = {
  state: CreditState;
  dispatch: React.Dispatch<CreditAction>;
};

const CreditContext = createContext<CreditContextType | undefined>(undefined);

const creditReducer = (state: CreditState, action: CreditAction): CreditState => {
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

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(creditReducer, { credits: 0, tier: 'FREE' });
  const { user } = useUser();

  useEffect(() => {
    const fetchCredits = async () => {
      if (user) {
        try {
          const response = await fetch('/api/credits');
          const data = await response.json();
          dispatch({ type: 'SET_ALL', payload: { credits: data.credits, tier: data.tier } });
        } catch (error) {
          console.error('Failed to fetch credits:', error);
        }
      }
    };

    fetchCredits();
  }, [user]);

  return (
    <CreditContext.Provider value={{ state, dispatch }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};