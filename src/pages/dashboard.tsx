// src/pages/dashboard.tsx

import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EmojiGenerator } from '@/components/emoji/EmojiGenerator';
import { CreditMenu } from '@/components/dashboard/CreditMenu';
import { EmojiSlider } from '@/components/dashboard/EmojiSlider';
import { Emoji } from '@/types/emoji';

const Dashboard: React.FC = () => {
  const [newEmoji, setNewEmoji] = useState<Emoji | undefined>(undefined);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  const handleEmojiGenerated = (emoji: Emoji) => {
    setNewEmoji(emoji);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <EmojiGenerator onEmojiGenerated={handleEmojiGenerated} />
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Emojis</h2>
              <EmojiSlider newEmoji={newEmoji} />
            </div>
          </div>
          <div>
            <CreditMenu />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;