// src/components/dashboard/EmojiSlider.tsx

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Emoji } from '@/types/emoji';
import { Download, Heart, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

interface EmojiSliderProps {
  newEmoji?: Emoji;
}

export const EmojiSlider: React.FC<EmojiSliderProps> = ({ newEmoji }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchEmojis = async () => {
      const response = await fetch('/api/emoji/list');
      if (response.ok) {
        const data = await response.json();
        setEmojis(data);
      }
    };
    fetchEmojis();
  }, []);

  useEffect(() => {
    if (newEmoji) {
      setEmojis(prevEmojis => [newEmoji, ...prevEmojis]);
    }
  }, [newEmoji]);

  const handleDownload = async (emojiUrl: string, emotion: string) => {
    const response = await fetch(emojiUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `emoji_${emotion}.png`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDislike = () => {
    router.push('/dashboard');
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % emojis.length);
  }, [emojis.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (emojis.length === 0) {
    return <p className="text-center text-lg">You haven't created any emoji yet!</p>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md"> {/* Adjusted width for better responsiveness */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-40 h-40 mb-2">
              <Image
                src={emojis[currentIndex].imageUrl}
                alt={emojis[currentIndex].emotion}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <p className="text-center mb-2 text-sm">{emojis[currentIndex].emotion}</p>
            <div className="flex justify-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(emojis[currentIndex].imageUrl, emojis[currentIndex].emotion)}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleDislike}>
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};