import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCredits } from '@/contexts/CreditContext';
import { Download, Upload } from 'lucide-react';
import Image from 'next/image';
import { CreditPurchaseModal } from '../CreditPurchaseModal';
import { AnimatedCreditDisplay } from '../AnimatedCreditDisplay';
import { Emoji } from '@/types/emoji';

interface EmojiGeneratorProps {
  onEmojiGenerated: (emoji: Emoji) => void;
}

interface GeneratedEmoji {
  id: string;
  userId: string;
  emojiUrl: string;
  isPublic: boolean;
  creditsRemaining: number | 'Unlimited';
}

export const EmojiGenerator: React.FC<EmojiGeneratorProps> = ({ onEmojiGenerated }) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [generatedEmoji, setGeneratedEmoji] = useState<GeneratedEmoji | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useCredits();

  const emotions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Confused', 'Excited', 'Love'];

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
      setFile(selectedFile);
    } else {
      setError('Please select a JPEG or PNG image file.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenerate = async () => {
    if (!file) {
      setError('Please upload an image first.');
      return;
    }
    if (!selectedEmotion) {
      setError('Please select an emotion.');
      return;
    }
    if (state.credits <= 0) {
      setError('Not enough credits. Please purchase more. Premium members get twice more credit.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('emotion', selectedEmotion);

      const response = await fetch('/api/emoji/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate emoji');
      }

      const result: GeneratedEmoji = await response.json();
      setGeneratedEmoji(result);
      
      if (typeof result.creditsRemaining === 'number') {
        dispatch({ type: 'SET_CREDITS', payload: result.creditsRemaining });
      }

      // Call the callback function with the new emoji
      onEmojiGenerated({
        id: result.id,
        userId: result.userId,
        imageUrl: result.emojiUrl,
        emotion: selectedEmotion,
        isPublic: result.isPublic,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the emoji');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (generatedEmoji) {
      try {
        const response = await fetch(generatedEmoji.emojiUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `generated_emoji_${selectedEmotion}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        setError('Failed to download the emoji. Please try again.');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6 bg-card rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Create Your Custom Emoji</h2>
        <AnimatedCreditDisplay />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="No file selected"
            value={file ? file.name : ''}
            readOnly
            className="flex-grow"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
            accept=".jpg,.jpeg,.png"
          />
          <Button onClick={handleUploadClick}>
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {emotions.map((emotion) => (
            <div key={emotion} className="flex items-center space-x-2">
              <Checkbox 
                id={emotion} 
                checked={selectedEmotion === emotion}
                onCheckedChange={() => setSelectedEmotion(emotion)}
              />
              <Label htmlFor={emotion}>{emotion}</Label>
            </div>
          ))}
        </div>

        <Button 
          onClick={handleGenerate} 
          className="w-full"
          disabled={isLoading || !file || !selectedEmotion || (state.credits <= 0 && state.tier !== 'PREMIUM')}
        >
          {isLoading ? 'Generating...' : 'Generate Emoji'}
        </Button>

        {state.credits <= 0 && state.tier !== 'PREMIUM' && (
          <div className="text-center">
            <p className="text-red-500 mb-2">You've run out of credits.</p>
            <CreditPurchaseModal tier={state.tier} />
          </div>
        )}

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {generatedEmoji && (
          <div className="mt-6 space-y-4">
            <div className="relative mx-auto w-48 h-48">
              <Image
                src={generatedEmoji.emojiUrl}
                alt="Generated Emoji"
                layout="fill"
                objectFit="contain"
                className="rounded-lg shadow-md"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-center text-gray-500">
              Click the download button to save your generated emoji.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};