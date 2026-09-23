import type { Metadata, Viewport } from 'next';
import { site } from '@/content/site';
import Grain from '@/components/Grain';
import Secret from '@/components/Secret';

// Self-hosted. The site builds offline and never blocks paint on a third party.
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'RKI レイキ',
    template: '%s · RKI',
  },
  description: site.description,
  openGraph: {
    title: 'RKI レイキ',
    description: site.description,
    url: site.url,
    siteName: 'RKI',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#050506',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#music">
          skip to music
        </a>
        {children}
        <Grain />
        <Secret />
      </body>
    </html>
  );
}
