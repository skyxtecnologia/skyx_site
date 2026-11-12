'use client';

import { HomeHero } from '@/components/home';
import { SiteHeader } from '@/components/layout';
import { AboutSection, PartnersBanner } from '@/components/site/sections';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { useLanguage } from '@/contexts/LanguageContext';
import dynamic from 'next/dynamic';

// Dynamic code splitting for below-the-fold sections to ensure instantaneous initial paint and zero TBT
const CapsuleSection = dynamic(
  () => import('@/components/site/sections').then((mod) => mod.CapsuleSection),
  { ssr: true }
);
const SolutionsSection = dynamic(
  () => import('@/components/site/sections').then((mod) => mod.SolutionsSection),
  { ssr: true }
);
const CaseShowcase = dynamic(
  () => import('@/components/site/sections').then((mod) => mod.CaseShowcase),
  { ssr: true }
);
const NewsSection = dynamic(
  () => import('@/components/site/sections').then((mod) => mod.NewsSection),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import('@/components/site/sections').then((mod) => mod.ContactSection),
  { ssr: true }
);
const SiteFooter = dynamic(() => import('@/components/layout').then((mod) => mod.SiteFooter), {
  ssr: true,
});

export default function Home() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <SiteHeader />
      <ScrollProgress />
      <ScrollToTopButton />
      <HomeHero lang={lang} setLang={setLang} />

      <main className="flex min-h-screen flex-col items-center justify-between">
        <AboutSection lang={lang} />
        <PartnersBanner />

        {/* Novas Seções de Imersão e Soluções */}
        <CapsuleSection />
        <SolutionsSection />

        {/* Cases */}
        <CaseShowcase lang={lang} />

        <NewsSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <SiteFooter />
    </>
  );
}
