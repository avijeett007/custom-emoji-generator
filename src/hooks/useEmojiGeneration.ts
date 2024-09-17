import { useState } from 'react';
import { fal } from '@/lib/fal';

interface GeneratedEmoji {
  sticker_image: {
    url: string;
  };
  sticker_image_background_removed: {
    url: string;
  };
}

export const useEmojiGeneration = () => {
  const [generatedEmoji, setGeneratedEmoji] = useState<GeneratedEmoji | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmoji = async (file: File, prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Upload the file
      const imageUrl = await fal.storage.upload(file);

      // Generate the emoji
      const result = await fal.subscribe("fal-ai/face-to-sticker", {
        input: {
          image_url: imageUrl,
          prompt,
          image_size: "square", // This generates a square image
          num_inference_steps: 20, // Increase steps for better quality
          guidance_scale: 7.5, // Adjust guidance scale for better results
        },
      });

      // Type assertion
      const typedResult = result as GeneratedEmoji;

      setGeneratedEmoji(typedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { generatedEmoji, isLoading, error, generateEmoji };
};