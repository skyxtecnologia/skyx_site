import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notícias, Tendências & Artigos de Tecnologia',
  description:
    'Acompanhe as últimas publicações, novidades tecnológicas, insights sobre inteligência artificial, computação em nuvem e lançamentos da SkyX Tecnologia.',
  alternates: {
    canonical: 'https://skyxtecnologia.com.br/noticias',
  },
  openGraph: {
    title: 'Notícias & Insights Tecnológicos | SkyX',
    description:
      'Artigos, estudos de caso e notícias sobre o mercado de tecnologia, IA e inovação.',
    url: 'https://skyxtecnologia.com.br/noticias',
    type: 'website',
  },
};

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
