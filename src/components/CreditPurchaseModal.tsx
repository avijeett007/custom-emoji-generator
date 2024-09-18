import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCredits } from '@/hooks/useCredits';

export const CreditPurchaseModal: React.FC = () => {
  const { purchaseCredits, upgradeToPremium } = useCredits();

  const handleCreditPurchase = () => {
    purchaseCredits();
  };

  const handlePremiumUpgrade = () => {
    upgradeToPremium();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Purchase Credits / Upgrade</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Credits or Upgrade to Premium</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Button onClick={handleCreditPurchase}>
            Buy 10 credits for $2.99
          </Button>
          <Button onClick={handlePremiumUpgrade}>
            Upgrade to Premium for $9.99/month
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};