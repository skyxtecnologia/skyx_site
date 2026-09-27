'use client';

import { HomeHero } from '@/components/home';
import { SiteFooter, SiteHeader } from '@/components/layout';
import {
  AboutSection,
  CapsuleSection,
  CaseShowcase,
  ContactSection,
  NewsSection,
  PartnersBanner,
  SolutionsSection,
} from '@/components/site/sections';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { useLanguage } from '@/contexts/LanguageContext';

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
