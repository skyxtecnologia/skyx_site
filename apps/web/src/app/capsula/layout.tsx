import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cápsula Imersiva | Robótica, VR & Realidade Estendida',
  description:
    'Descubra a Cápsula Imersiva da SkyX: tecnologia de ponta integrando robótica, simulação virtual realista para treinamentos de alto risco, eventos e educação.',
  alternates: {
    canonical: 'https://skyxtecnologia.com.br/capsula',
  },
  openGraph: {
    title: 'Cápsula Imersiva SkyX | O Futuro da Simulação e Robótica',
    description:
      'Imersão profunda em realidade virtual e robótica aplicada. Treinamentos corporativos e simulações avançadas.',
    url: 'https://skyxtecnologia.com.br/capsula',
    type: 'website',
  },
};

export default function CapsulaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
