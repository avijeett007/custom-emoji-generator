// src/components/dashboard/CreditMenu.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCredits } from '@/hooks/useCredits';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export const CreditMenu: React.FC = () => {
  const { credits, tier, setCredits, purchaseCredits, upgradeToPremium } = useCredits();

  const premiumBenefits = [
    'Unlimited emoji generation',
    'Priority support',
    'Early access to new features',
    'Ad-free experience'
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Credits</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          className="text-4xl font-bold text-center"
        >
          {credits} {tier === 'PREMIUM' ? '' : ''}
        </motion.div>
        <p className="text-center">Current Tier: {tier}</p>
        
        {tier === 'FREE' && (
          <div className="space-y-2">
            <p className="font-semibold">Upgrade to Premium for:</p>
            <ul className="list-disc list-inside">
              {premiumBenefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {benefit}
                </motion.li>
              ))}
            </ul>
            <Button 
              onClick={upgradeToPremium} 
              className="w-full mt-4"
              variant="premium"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Upgrade to Premium
            </Button>
          </div>
        )}
        
        {tier === 'FREE' && (
          <Button onClick={purchaseCredits} className="w-full mt-4">
            Purchase More Credits
          </Button>
        )}
      </CardContent>
    </Card>
  );
};