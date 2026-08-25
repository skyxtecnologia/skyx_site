'use client';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'PT' | 'EN' | 'ES';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'PT',
  setLang: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>('PT');

  useEffect(() => {
    const saved = localStorage.getItem('skyx-lang') as Lang;
    if (saved && ['PT', 'EN', 'ES'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('skyx-lang', newLang);
    window.location.reload();
  };

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
