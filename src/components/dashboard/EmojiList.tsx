import React from 'react';
import { Emoji } from '@/types/emoji';

interface EmojiListProps {
  emojis: Emoji[];
}

export const EmojiList: React.FC<EmojiListProps> = ({ emojis }) => {
  return (
    <div>
      <h2>Your Emojis</h2>
      <ul>
        {emojis.map((emoji) => (
          <li key={emoji.id}>{/* Render emoji */}</li>
        ))}
      </ul>
    </div>
  );
};