import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { SignInButton } from '@/components/auth/SignInButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Hero: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleGenerateClick = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Create Custom Emojis for Your YouTube Channel</h1>
        <p className="text-xl mb-8">Engage your audience with unique, AI-generated emojis.</p>
        {isLoaded && (
          isSignedIn ? (
            <Button size="lg" variant="secondary" onClick={handleGenerateClick}>
              Generate Emoji
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary">
                  Generate Emoji
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign In Required</DialogTitle>
                  <DialogDescription>
                    Please sign in to start generating emojis.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center mt-4">
                  <SignInButton />
                </div>
              </DialogContent>
            </Dialog>
          )
        )}
      </div>
    </section>
  );
};