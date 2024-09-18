// src/pages/index.tsx

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SignInButton } from '@/components/auth/SignInButton'
import { SignUpButton } from '@/components/auth/SignUpButton'
import UserProfile from '@/components/UserProfile'
import { useUser } from '@clerk/nextjs'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Pricing } from '@/components/landing/Pricing'
import { PublicEmojiShowcase } from '@/components/landing/PublicEmojiShowcase'

const Home: NextPage = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>YouMoji - Custom Emoji Generator</title>
        <meta name="description" content="Generate custom emojis for your YouTube channel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image 
              src="/images/logo.png" 
              alt="YouMoji Logo" 
              width={40} 
              height={40}
            />
            <h1 className="text-2xl font-bold">YouMoji</h1>
          </div>
          {isLoaded && (
            isSignedIn ? (
              <UserProfile />
            ) : (
              <div className="space-x-4">
                <SignInButton />
                <SignUpButton />
              </div>
            )
          )}
        </div>
      </header>

      <main className="flex-grow">
        <Hero />
        <Features />
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Created by Our Community</h2>
            <PublicEmojiShowcase />
          </div>
        </section>
        <Pricing />
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 YouMoji. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home