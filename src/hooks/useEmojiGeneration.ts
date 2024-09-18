import { useState } from 'react';
import { fal } from '@/lib/fal';
import { useCredits } from './useCredits';

interface GeneratedEmoji {
  sticker_image: {
    url: string;
  };
  sticker_image_background_removed: {
    url: string;
  };
}

interface ApiResponse extends GeneratedEmoji {
  creditsRemaining: number;
}

export const useEmojiGeneration = () => {
  const [generatedEmoji, setGeneratedEmoji] = useState<GeneratedEmoji | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCredits } = useCredits();

  const generateEmoji = async (file: File, prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Upload the file
      const imageUrl = await fal.storage.upload(file);

      // Generate the emoji
      const response = await fetch('/api/emoji/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate emoji');
      }

      const result = await response.json() as ApiResponse;

      setGeneratedEmoji(result);
      setCredits(result.creditsRemaining);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { generatedEmoji, isLoading, error, generateEmoji };
};