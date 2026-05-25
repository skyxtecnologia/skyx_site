'use client';

import { HomeHero } from '@/components/home';
import { SiteFooter } from '@/components/layout';
import {
  AboutSection,
  CaseShowcase,
  CasesSection,
  ContactSection,
  NewsSection,
} from '@/components/site/sections';
import { useState } from 'react';

export default function Home() {
  const [lang, setLang] = useState<'PT' | 'EN'>('PT');

  return (
    <>
      <HomeHero lang={lang} setLang={setLang} />

      <AboutSection lang={lang} />

      <CasesSection lang={lang} />

      <CaseShowcase lang={lang} />

      <NewsSection lang={lang} />

      <ContactSection lang={lang} />

      <SiteFooter lang={lang} />
    </>
  );
}
