// src/components/landing/PublicEmojiShowcase.tsx

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { Emoji } from '@/types/emoji';

export const PublicEmojiShowcase: React.FC = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    const fetchPublicEmojis = async () => {
      try {
        const response = await fetch('/api/emoji/public');
        if (response.ok) {
          const data = await response.json();
          setEmojis(data);
        }
      } catch (error) {
        console.error('Failed to fetch public emojis:', error);
      }
    };

    fetchPublicEmojis();
  }, []);

  useEffect(() => {
    const animate = async () => {
      await controls.start({ x: '-100%' });
      controls.set({ x: '0%' });
    };

    const interval = setInterval(animate, 10000); // Move every 10 seconds

    return () => clearInterval(interval);
  }, [controls]);

  if (emojis.length === 0) {
    return <p className="text-center text-lg">No public emojis available yet!</p>;
  }

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex"
        animate={controls}
        transition={{ duration: 20, ease: "linear" }}
        style={{ width: `${emojis.length * 25}%` }} // Adjusted to show 4 emojis at once
      >
        {emojis.concat(emojis).map((emoji, index) => (
          <div key={`${emoji.id}-${index}`} className="w-1/4 flex-shrink-0 px-1"> {/* Reduced padding */}
            <div className="relative w-24 h-24 mx-auto"> {/* Reduced size */}
              <Image
                src={emoji.imageUrl}
                alt={emoji.emotion}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <p className="text-center mt-2 text-sm">{emoji.emotion}</p> {/* Reduced text size */}
          </div>
        ))}
      </motion.div>
    </div>
  );
};