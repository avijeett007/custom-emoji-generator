import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCredits } from '@/hooks/useCredits';

interface CreditPurchaseModalProps {
  tier: 'FREE' | 'PREMIUM';
}

export const CreditPurchaseModal: React.FC<CreditPurchaseModalProps> = ({ tier }) => {
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
        <Button>
          {tier === 'PREMIUM' ? 'Purchase Additional Credits' : 'Purchase Credits / Upgrade'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {tier === 'PREMIUM' ? 'Purchase Additional Credits' : 'Purchase Credits or Upgrade to Premium'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Button onClick={handleCreditPurchase}>
            Buy 10 credits for $2.99
          </Button>
          {tier === 'FREE' && (
            <Button onClick={handlePremiumUpgrade}>
              Upgrade to Premium for $9.99/month
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};