import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EmojiGenerator } from '@/components/emoji/EmojiGenerator';
import { CreditDisplay } from '@/components/dashboard/CreditDisplay';
import { EmojiList } from '@/components/dashboard/EmojiList';
import { Emoji } from '@/types/emoji';

const Dashboard: React.FC = () => {
  const [newEmoji, setNewEmoji] = useState<Emoji | undefined>(undefined);

  const handleEmojiGenerated = (emoji: Emoji) => {
    setNewEmoji(emoji);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EmojiGenerator onEmojiGenerated={handleEmojiGenerated} />
          </div>
          <div>
            <CreditDisplay />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Emojis</h2>
          <EmojiList newEmoji={newEmoji} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Dashboard;