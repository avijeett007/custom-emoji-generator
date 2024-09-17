import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const EmojiGenerator: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // TODO: Implement actual file upload logic
      console.log("File selected:", file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenerate = () => {
    // TODO: Implement emoji generation logic
    console.log("Generating emoji...");
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
          placeholder="Save to file"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="flex-grow"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
          accept="image/*"
        />
        <Button onClick={handleUploadClick}>Upload</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {emotions.map((emotion) => (
          <div key={emotion} className="flex items-center space-x-2">
            <Checkbox id={emotion} />
            <Label htmlFor={emotion}>{emotion}</Label>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <Button onClick={() => setCount(Math.max(1, count - 1))}>-</Button>
        <span className="text-xl font-bold">{count}</span>
        <Button onClick={() => setCount(count + 1)}>+</Button>
        <Button onClick={handleGenerate} className="ml-auto">Generate Emoji</Button>
      </div>
      {imageUrl && (
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          src={imageUrl}
          alt="Generated Emoji"
          className="mt-4 rounded-lg shadow-md"
        />
      )}
    </motion.div>
  );
};