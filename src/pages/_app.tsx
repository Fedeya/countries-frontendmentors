import Layout from '@/components/Layout';
import FiltersProvider from '@/contexts/FiltersContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FiltersProvider>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </FiltersProvider>
  );
}

export default MyApp;
