import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import { CreditProvider } from '@/contexts/CreditContext';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CreditProvider>
          <Component {...pageProps} />
        </CreditProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default MyApp;