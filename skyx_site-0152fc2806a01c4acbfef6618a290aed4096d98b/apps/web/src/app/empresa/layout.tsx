import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A Empresa | Quem Somos & Nossa Missão',
  description:
    'Conheça a história da SkyX Tecnologia, nossa missão, valores corporativos e o compromisso em transformar empresas e a sociedade através de soluções imersivas e tecnologia de ponta.',
  alternates: {
    canonical: 'https://skyxtecnologia.com.br/empresa',
  },
  openGraph: {
    title: 'Sobre a SkyX Tecnologia | Inovação e Propósito',
    description:
      'Conheça nossa trajetória, cultura de inovação e engenharia focada em resolver desafios complexos de tecnologia.',
    url: 'https://skyxtecnologia.com.br/empresa',
    type: 'website',
  },
};

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
