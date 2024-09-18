import React from 'react';
import { useCredits } from '@/hooks/useCredits';
import { CreditPurchaseModal } from '../CreditPurchaseModal';

export const CreditDisplay: React.FC = () => {
  const { credits } = useCredits();

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-bold mb-4">{credits} credits remaining</p>
      <CreditPurchaseModal />
    </div>
  );
};