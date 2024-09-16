import React from 'react';

interface CreditDisplayProps {
  credits: number;
}

export const CreditDisplay: React.FC<CreditDisplayProps> = ({ credits }) => {
  return (
    <div>
      <h2>Your Credits</h2>
      <p>{credits} credits remaining</p>
    </div>
  );
};