import React from 'react';
import Link from 'next/link';
import { SignInButton } from '../auth/SignInButton';
import { SignUpButton } from '../auth/SignUpButton';

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
      <div>
        <SignInButton />
        <SignUpButton />
      </div>
    </header>
  );
};