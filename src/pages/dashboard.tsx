import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { EmojiGenerator } from '@/components/emoji/EmojiGenerator'
import { useUser } from '@clerk/nextjs';
import { CreditDisplay } from '@/components/dashboard/CreditDisplay';
import { EmojiList } from '@/components/dashboard/EmojiList';
import { useCredits } from '@/hooks/useCredits';

const Dashboard: React.FC = () => {
  const { credits } = useCredits();
  const { user } = useUser();

  return (
    <Layout>
    <div>
      <h1>Welcome to Your Dashboard, {user?.firstName}!</h1>
      {/* Add your dashboard content here */}
    </div>   
      <CreditDisplay credits={credits} />
      <EmojiGenerator />
      <EmojiList emojis={[]} /> {/* Pass actual emojis here */}
    </Layout>
  );
};

export default Dashboard;