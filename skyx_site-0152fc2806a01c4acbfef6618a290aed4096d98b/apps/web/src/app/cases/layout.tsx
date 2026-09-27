import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cases de Sucesso & Projetos',
  description:
    'Explore os principais cases de sucesso, soluções personalizadas e projetos inovadores desenvolvidos pela SkyX Tecnologia para clientes líderes de mercado.',
  alternates: {
    canonical: 'https://skyxtecnologia.com.br/cases',
  },
  openGraph: {
    title: 'Cases de Sucesso | SkyX Tecnologia',
    description:
      'Soluções de software, inteligência artificial e imersão desenvolvidas com excelência para empresas de alto impacto.',
    url: 'https://skyxtecnologia.com.br/cases',
    type: 'website',
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
