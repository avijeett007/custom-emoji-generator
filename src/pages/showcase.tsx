import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { EmojiList } from '@/components/dashboard/EmojiList';

const Showcase: React.FC = () => {
  return (
    <Layout>
      <h1>Emoji Showcase</h1>
      <EmojiList emojis={[]} /> {/* Fetch and pass public emojis here */}
    </Layout>
  );
};

export default Showcase;