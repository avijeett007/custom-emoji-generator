import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Emoji } from '@/types/emoji';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmojiListProps {
  newEmoji?: Emoji;
}

export const EmojiList: React.FC<EmojiListProps> = ({ newEmoji }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch('/api/emoji/list');
        if (!response.ok) {
          throw new Error('Failed to fetch emojis');
        }
        const data = await response.json();
        setEmojis(data);
      } catch (err) {
        setError('Failed to load emojis. Please try again later.');
        console.error('Error fetching emojis:', err);
      } finally {
        setIsLoading(false);
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
    try {
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
    } catch (err) {
      console.error('Error downloading emoji:', err);
    }
  };

  if (isLoading) {
    return <p>Loading your emojis...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (emojis.length === 0) {
    return <p>You haven't generated any emojis yet. Start creating!</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {emojis.map((emoji) => (
        <div key={emoji.id} className="flex flex-col items-center">
          <div className="relative">
            <Image 
              src={emoji.imageUrl} 
              alt={emoji.emotion} 
              width={64} 
              height={64} 
              className="rounded-full"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute -top-2 -right-2"
              onClick={() => handleDownload(emoji.imageUrl, emoji.emotion)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-sm">{emoji.emotion}</p>
        </div>
      ))}
    </div>
  );
};