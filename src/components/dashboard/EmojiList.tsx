import React from 'react';
import Image from 'next/image';
import { Emoji } from '@/types/emoji';

interface EmojiListProps {
  emojis: Emoji[];
}

export const EmojiList: React.FC<EmojiListProps> = ({ emojis }) => {
  if (emojis.length === 0) {
    return <p>You haven't generated any emojis yet. Start creating!</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {emojis.map((emoji) => (
        <div key={emoji.id} className="flex flex-col items-center">
          <Image 
            src={emoji.imageUrl} 
            alt={emoji.emotion} 
            width={64} 
            height={64} 
            className="rounded-full"
          />
          <p className="mt-2 text-sm">{emoji.emotion}</p>
        </div>
      ))}
    </div>
  );
};