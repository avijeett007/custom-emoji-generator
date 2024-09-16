import React from 'react';
import { useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export const SignUpButton: React.FC = () => {
  const { openSignUp } = useClerk();

  return (
    <Button onClick={() => openSignUp()}>
      Sign Up
    </Button>
  );
};