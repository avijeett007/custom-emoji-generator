import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEmojiGeneration } from '@/hooks/useEmojiGeneration';
import { Download } from 'lucide-react';
import Image from 'next/image';

export const EmojiGenerator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { generatedEmoji, isLoading, error, generateEmoji } = useEmojiGeneration();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/jpg')) {
      setFile(selectedFile);
    } else {
      alert('Please select a JPEG image file.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenerate = () => {
    if (file && selectedEmotion) {
      generateEmoji(file, selectedEmotion);
    }
  };

  const handleDownload = async (url: string, fileName: string, size: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const img = await createImageBitmap(blob);
        ctx.drawImage(img, 0, 0, size, size);
        
        canvas.toBlob((resizedBlob) => {
          if (resizedBlob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(resizedBlob);
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(link.href);
          }
        }, 'image/png');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const emotions = ['Sending Love', 'LOL', 'So Sad', 'Genuine Smile', 'Smile With Teeth', 'Angry', 'Frustrated'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-6 bg-card rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold">Create Emoji</h2>
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
          accept=".jpg,.jpeg"
        />
        <Button onClick={handleUploadClick}>Upload JPEG</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
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
      <div className="flex items-center space-x-4">
        <Button onClick={handleGenerate} className="ml-auto" disabled={isLoading || !file || !selectedEmotion}>
          {isLoading ? 'Generating...' : 'Generate Emoji'}
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {generatedEmoji && (
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Image
              src={generatedEmoji.sticker_image.url}
              alt="Generated Emoji"
              width={200}
              height={200}
              className="rounded-lg shadow-md"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-0 right-0"
              onClick={() => handleDownload(generatedEmoji.sticker_image.url, 'emoji_48x48.png', 48)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-500">Click the download button to get the 48x48 version for YouTube.</p>
          <p className="text-sm text-gray-500">Premium users can download the full-size image. <a href="#" className="text-blue-500">Upgrade now!</a></p>
          <div className="relative">
            <Image
              src={generatedEmoji.sticker_image_background_removed.url}
              alt="Generated Emoji (Background Removed)"
              width={200}
              height={200}
              className="rounded-lg shadow-md"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-0 right-0"
              onClick={() => handleDownload(generatedEmoji.sticker_image_background_removed.url, 'emoji_no_bg_48x48.png', 48)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};