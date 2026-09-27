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
  metadataBase: new URL('https://skyxtecnologia.com.br'),
  title: {
    default: 'SkyX Tecnologia | Inovação, Soluções Imersivas & Engenharia de Software',
    template: '%s | SkyX Tecnologia',
  },
  description:
    'A SkyX é líder em inovação tecnológica, engenharia de software de alta performance, soluções em cloud computing, inteligência artificial e a revolucionária Cápsula Imersiva.',
  keywords: [
    'SkyX',
    'SkyX Tecnologia',
    'Inovação Tecnológica',
    'Cápsula Imersiva',
    'Realidade Virtual',
    'Engenharia de Software',
    'Cloud Computing',
    'Inteligência Artificial',
    'Desenvolvimento de Software',
    'Transformação Digital',
    'Soluções Corporativas de TI',
    'Tecnologia Brasil',
  ],
  authors: [{ name: 'SkyX Tecnologia', url: 'https://skyxtecnologia.com.br' }],
  creator: 'SkyX Tecnologia',
  publisher: 'SkyX Tecnologia',
  applicationName: 'SkyX Tecnologia',
  category: 'technology',
  alternates: {
    canonical: 'https://skyxtecnologia.com.br',
    languages: {
      'pt-BR': 'https://skyxtecnologia.com.br',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://skyxtecnologia.com.br',
    siteName: 'SkyX Tecnologia',
    title: 'SkyX Tecnologia | Inovação, Soluções Imersivas & Software',
    description:
      'Soluções corporativas inovadoras em engenharia de software, computação em nuvem e a pioneira Cápsula Imersiva.',
    images: [
      {
        url: '/img/logo_footer.png',
        width: 1200,
        height: 630,
        alt: 'SkyX Tecnologia - Inovação & Soluções Avançadas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkyX Tecnologia | Inovação, Soluções Imersivas & Software',
    description:
      'Especialistas em desenvolvimento de software de alta performance, computação em nuvem e soluções imersivas.',
    images: ['/img/logo_footer.png'],
  },
  verification: {
    google: '5FAGvz0hOmb8NGytiy9YpmXtl703TLHqlEW89ejHpyo',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://skyxtecnologia.com.br/#organization',
      name: 'SkyX Tecnologia',
      url: 'https://skyxtecnologia.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skyxtecnologia.com.br/img/logo_footer.png',
      },
      description:
        'Empresa especialista em engenharia de software, soluções imersivas com Cápsula VR e computação em nuvem.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'contato@skyxtecnologia.com.br',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://skyxtecnologia.com.br/#website',
      url: 'https://skyxtecnologia.com.br',
      name: 'SkyX Tecnologia',
      publisher: {
        '@id': 'https://skyxtecnologia.com.br/#organization',
      },
      inLanguage: 'pt-BR',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="google-site-verification" content="5FAGvz0hOmb8NGytiy9YpmXtl703TLHqlEW89ejHpyo" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
