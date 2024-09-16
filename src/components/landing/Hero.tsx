import React from 'react';
import { SignUpButton } from '../auth/SignUpButton';

export const Hero: React.FC = () => {
  return (
    <section>
      <h1>Create Custom Emojis for Your YouTube Channel</h1>
      <p>Engage your audience with unique, AI-generated emojis.</p>
      <SignUpButton />
    </section>
  );
};