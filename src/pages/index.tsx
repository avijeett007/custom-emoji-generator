import type { NextPage } from 'next'
import Head from 'next/head'
import { Button } from "@/components/ui/button"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Custom Emoji Generator</title>
        <meta name="description" content="Generate custom emojis for your YouTube channel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Custom Emoji Generator</h1>
        <Button>Get Started</Button>
        {/* TODO: Add main content */}
      </main>

      <footer className="container mx-auto px-4 py-8">
        {/* TODO: Add footer content */}
      </footer>
    </div>
  )
}

export default Home