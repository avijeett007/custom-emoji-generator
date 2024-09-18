// src/components/dashboard/EmojiSlider.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

  return (
    <div className="relative overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.05}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = offset.x * velocity.x;
          if (swipe < -10000) {
            setCurrentIndex(prev => (prev + 1) % emojis.length);
          } else if (swipe > 10000) {
            setCurrentIndex(prev => (prev - 1 + emojis.length) % emojis.length);
          }
        }}
        className="flex"
      >
        {emojis.map((emoji, index) => (
          <motion.div
            key={emoji.id}
            className="w-full flex-shrink-0"
            style={{ x: `${(index - currentIndex) * 100}%` }}
          >
            <div className="relative w-64 h-64 mx-auto">
              <Image
                src={emoji.imageUrl}
                alt={emoji.emotion}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-center rounded-b-lg">
                {emoji.emotion}
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleDownload(emoji.imageUrl, emoji.emotion)}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={handleDislike}>
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};