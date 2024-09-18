import React from 'react';
import { useCredits } from '@/contexts/CreditContext';
import { CreditPurchaseModal } from '../CreditPurchaseModal';
import { AnimatedCreditDisplay } from '../AnimatedCreditDisplay';

export const CreditDisplay: React.FC = () => {
  const { state } = useCredits();

  return (
    <div className="flex flex-col items-center">
      <AnimatedCreditDisplay />
      {state.credits === 0 && <p className="text-2xl font-bold mb-4">No Credits Left</p>}
      <CreditPurchaseModal tier={state.tier} />
    </div>
  );
};