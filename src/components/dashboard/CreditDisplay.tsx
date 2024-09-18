import React from 'react';
import { useCredits } from '@/contexts/CreditContext';
import { CreditPurchaseModal } from '../CreditPurchaseModal';
import { AnimatedCreditDisplay } from '../AnimatedCreditDisplay';

export const CreditDisplay: React.FC = () => {
  const { state } = useCredits();

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-bold mb-4">
        {state.credits > 0 ? `` : 'No Credits Left'}
      </p>
      <br/>
      <CreditPurchaseModal tier={state.tier} />
    </div>
  );
};