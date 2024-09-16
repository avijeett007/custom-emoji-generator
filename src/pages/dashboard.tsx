import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { EmojiGenerator } from '@/components/emoji/EmojiGenerator'
import { CreditDisplay } from '@/components/dashboard/CreditDisplay';
import { EmojiList } from '@/components/dashboard/EmojiList';
import { useCredits } from '@/hooks/useCredits';

const Dashboard: React.FC = () => {
  const { credits } = useCredits();

  return (
    <Layout>
      <h1>Dashboard</h1>
      <CreditDisplay credits={credits} />
      <EmojiGenerator />
      <EmojiList emojis={[]} /> {/* Pass actual emojis here */}
    </Layout>
  );
};

export default Dashboard;