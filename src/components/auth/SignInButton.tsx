import React from 'react';
import { useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export const SignInButton: React.FC = () => {
  const { openSignIn } = useClerk();

  return (
    <Button onClick={() => openSignIn()}>
      Sign In
    </Button>
  );
};