import React from 'react';
import Image from 'next/image';

interface Emoji {
  id: string;
  imageUrl: string;
  emotion: string;
}

interface PublicEmojiShowcaseProps {
  emojis: Emoji[];
}

export const PublicEmojiShowcase: React.FC<PublicEmojiShowcaseProps> = ({ emojis }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Created by Our Community</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {emojis.map((emoji) => (
            <div key={emoji.id} className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <Image
                  src={emoji.imageUrl}
                  alt={`Emoji: ${emoji.emotion}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>
              <p className="mt-2 text-sm text-center">{emoji.emotion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};