// src/components/dashboard/EmojiList.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Emoji } from '@/types/emoji';
import { Download, Heart, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useCredits } from '@/hooks/useCredits';

interface EmojiListProps {
  showActions?: boolean;
}

export const EmojiList: React.FC<EmojiListProps> = ({ showActions = false }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { tier } = useCredits();

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

  const handleDislike = (emojiId: string) => {
    router.push(`/dashboard?regenerate=${emojiId}`);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {emojis.map((emoji) => (
        <div key={emoji.id} className="flex flex-col items-center bg-card rounded-lg p-4 shadow-md">
          <div className="relative w-40 h-40 mb-4">
            <Image 
              src={emoji.imageUrl} 
              alt={emoji.emotion} 
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <p className="text-lg font-semibold mb-2">{emoji.emotion}</p>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDownload(emoji.imageUrl, emoji.emotion)}
            >
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
            {showActions && (
              <>
                <Button size="sm" variant="outline">
                  <Heart className="h-4 w-4 mr-1" /> Like
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDislike(emoji.id)}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" /> Dislike
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};