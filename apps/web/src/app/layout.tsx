import type { Metadata } from 'next';
import { Poppins, Roboto, Roboto_Condensed, Zen_Dots } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
});

const zenDots = Zen_Dots({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-zen-dots',
});

export const metadata: Metadata = {
  title: 'SkyX - Inovação em Tecnologia',
  description: 'SkyX - Plataforma de inovação tecnológica e soluções avançadas em cloud computing',
  keywords: ['SkyX', 'tecnologia', 'inovação', 'cloud', 'software'],
  openGraph: {
    title: 'SkyX',
    description: 'Plataforma de inovação tecnológica',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} ${roboto.variable} ${robotoCondensed.variable} ${zenDots.variable} bg-dark text-white antialiased`}
        style={{
          fontFamily: 'var(--font-poppins), sans-serif',
        }}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
