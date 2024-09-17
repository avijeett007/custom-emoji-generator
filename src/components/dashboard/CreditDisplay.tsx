import React from 'react';
import { Button } from "@/components/ui/button";

interface CreditDisplayProps {
  credits: number;
}

export const CreditDisplay: React.FC<CreditDisplayProps> = ({ credits }) => {
  const handlePurchaseCredits = () => {
    // Implement credit purchase logic here
    console.log('Purchase credits');
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-bold mb-4">{credits} credits remaining</p>
      <Button onClick={handlePurchaseCredits}>Purchase More Credits</Button>
    </div>
  );
};