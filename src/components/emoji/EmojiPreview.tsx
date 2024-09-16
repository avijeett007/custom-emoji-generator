import React from 'react';

interface EmojiPreviewProps {
  imageUrl: string;
}

export const EmojiPreview: React.FC<EmojiPreviewProps> = ({ imageUrl }) => {
  return (
    <div>
      <h3>Preview</h3>
      <img src={imageUrl} alt="Generated Emoji" />
    </div>
  );
};