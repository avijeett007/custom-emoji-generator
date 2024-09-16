import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ProfileForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Name" />
      <Input type="email" placeholder="Email" />
      <Button type="submit">Update Profile</Button>
    </form>
  );
};