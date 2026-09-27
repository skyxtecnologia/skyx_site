'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Flag from 'react-world-flags';

type DropdownItem = {
  title: string;
  href: string;
};

type NavItem = {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
};

const navTranslations = {
  PT: [
    {
      name: 'Empresa',
      href: '/#sobre',
      dropdown: [
        { title: 'A Empresa', href: '/empresa' },
        { title: 'Nossa História', href: '/empresa' },
        { title: 'Missão e Valores', href: '/empresa' },
      ],
    },
    {
      name: 'Cápsula Imersiva',
      href: '/#capsula',
      dropdown: [
        { title: 'Sobre a Cápsula', href: '/capsula' },
        { title: 'Aplicações', href: '/capsula' },
        { title: 'Contato & Contratação', href: '/capsula' },
      ],
    },
    {
      name: 'Soluções',
      href: '/#solucoes',
      dropdown: [
        { title: 'Engenharia de Software', href: '/solucoes' },
        { title: 'Segurança & Inovação', href: '/solucoes' },
      ],
    },
    { name: 'Cases', href: '/cases' },
    { name: 'Impacto', href: '/#sobre' },
    { name: 'Contato', href: '/#contato' },
  ],
  EN: [
    {
      name: 'Company',
      href: '/#sobre',
      dropdown: [
        { title: 'The Company', href: '/empresa' },
        { title: 'Our History', href: '/empresa' },
        { title: 'Mission and Values', href: '/empresa' },
      ],
    },
    {
      name: 'Immersive Capsule',
      href: '/#capsula',
      dropdown: [
        { title: 'About the Capsule', href: '/capsula' },
        { title: 'Applications', href: '/capsula' },
        { title: 'Contact & Booking', href: '/capsula' },
      ],
    },
    {
      name: 'Solutions',
      href: '/#solucoes',
      dropdown: [
        { title: 'Software Engineering', href: '/solucoes' },
        { title: 'Security & Innovation', href: '/solucoes' },
      ],
    },
    { name: 'Cases', href: '/cases' },
    { name: 'Impact', href: '/#sobre' },
    { name: 'Contact', href: '/#contato' },
  ],
  ES: [
    {
      name: 'Empresa',
      href: '/#sobre',
      dropdown: [
        { title: 'La Empresa', href: '/empresa' },
        { title: 'Nuestra Historia', href: '/empresa' },
        { title: 'Misión y Valores', href: '/empresa' },
      ],
    },
    {
      name: 'Cápsula Inmersiva',
      href: '/#capsula',
      dropdown: [
        { title: 'Sobre la Cápsula', href: '/capsula' },
        { title: 'Aplicaciones', href: '/capsula' },
        { title: 'Contacto y Contratación', href: '/capsula' },
      ],
    },
    {
      name: 'Soluciones',
      href: '/#solucoes',
      dropdown: [
        { title: 'Ingeniería de Software', href: '/solucoes' },
        { title: 'Seguridad e Innovación', href: '/solucoes' },
      ],
    },
    { name: 'Casos', href: '/cases' },
    { name: 'Impacto', href: '/#sobre' },
    { name: 'Contacto', href: '/#contato' },
  ],
};

const uiTranslations = {
  PT: {
    language: 'Idioma',
    login: 'LOGIN',
  },
  EN: {
    language: 'Language',
    login: 'LOGIN',
  },
  ES: {
    language: 'Idioma',
    login: 'INICIAR SESIÓN',
  },
};

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { lang: currentLang, setLang: setCurrentLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let dropdownTimeout: NodeJS.Timeout;
  const handleMouseEnter = (name: string) => {
    clearTimeout(dropdownTimeout);
    setActiveDropdown(name);
  };
  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  return (
    <motion.header
      className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 flex items-center justify-between px-6 transition-all duration-500 rounded-full border ${
        isScrolled
          ? 'top-4 py-3 bg-[#010D13]/90 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'top-8 py-4 bg-white/5 backdrop-blur-md border-white/20'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/img/logo-nav.png"
            alt="SkyX Logo"
            width={139}
            height={30}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex flex-grow justify-center gap-8 items-center font-roboto">
        {navTranslations[currentLang].map((item) => (
          <div
            key={item.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.href}
              className="text-white hover:text-[#67a7d5] transition-colors text-sm font-normal relative group whitespace-nowrap tracking-wide py-4 flex items-center gap-1"
            >
              {item.name}
              {item.dropdown && (
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                  <title>Seta</title>
                </svg>
              )}
              <span className="absolute bottom-3 left-0 w-0 h-0.5 bg-[#67a7d5] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Dropdown Menu */}
            {item.dropdown && (
              <AnimatePresence>
                {activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[240px] bg-[#010D13]/95 backdrop-blur-xl border border-[#013149] rounded-2xl shadow-[0_20px_50px_rgba(1,66,99,0.3)] overflow-hidden py-3"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#010D13] border-l border-t border-[#013149] rotate-45" />
                    <div className="relative z-10 flex flex-col gap-1 px-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="px-4 py-2 hover:bg-[#013149]/50 rounded-xl transition-all group flex items-center"
                        >
                          <span className="text-gray-300 font-normal text-[14px] group-hover:text-white group-hover:translate-x-1 transition-all">
                            {subItem.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </nav>

      {/* Desktop Actions */}
      <div className="hidden lg:flex flex-shrink-0 items-center gap-4">
        {/* Language Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setLangDropdownOpen(true)}
          onMouseLeave={() => setLangDropdownOpen(false)}
        >
          <button
            type="button"
            className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/20 transition text-white text-xs font-roboto tracking-wide"
          >
            <span className="flex items-center">
              {currentLang === 'PT' ? (
                <Flag code="BR" className="w-5 h-4 rounded-sm object-cover flex-shrink-0" />
              ) : currentLang === 'EN' ? (
                <Flag code="US" className="w-5 h-4 rounded-sm object-cover flex-shrink-0" />
              ) : (
                <Flag code="ES" className="w-5 h-4 rounded-sm object-cover flex-shrink-0" />
              )}
            </span>
            <span>{currentLang}</span>
          </button>

          <AnimatePresence>
            {langDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-full right-0 mt-2 w-[110px] bg-[#020E16]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden flex flex-col py-1"
              >
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLang('PT');
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 text-white text-sm transition-colors text-left"
                >
                  <Flag code="BR" className="w-5 h-4 rounded-sm object-cover flex-shrink-0" /> PT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLang('EN');
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 text-white text-sm transition-colors text-left"
                >
                  <Flag code="US" className="w-5 h-4 rounded-sm object-cover flex-shrink-0" /> EN
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLang('ES');
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 text-white text-sm transition-colors text-left"
                >
                  <Flag code="ES" className="w-5 h-4 rounded-sm object-cover flex-shrink-0" /> ES
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <Link
          href="/login"
          className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#013149] to-[#000d13] text-white rounded-full font-roboto font-normal text-sm tracking-[0.48px] border border-white/10 hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all"
        >
          {uiTranslations[currentLang].login}
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-white hover:text-[#67a7d5] transition p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
          <title>Menu</title>
        </svg>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-[#010D13]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 absolute top-full left-0 w-full mt-4 shadow-2xl flex flex-col gap-6 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-4 font-roboto">
              {navTranslations[currentLang].map((item) => (
                <div key={item.name} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white font-medium text-lg py-2 border-b border-white/5"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="flex flex-col gap-2 pl-4 pt-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="text-gray-300 text-sm hover:text-[#67a7d5] transition-colors"
                        >
                          - {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <span className="text-white font-medium">
                  {uiTranslations[currentLang].language}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentLang('PT')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm ${currentLang === 'PT' ? 'bg-[#013149] border-[#67a7d5] text-white' : 'border-white/10 text-gray-400'}`}
                  >
                    <Flag code="BR" className="w-5 h-4 rounded-sm object-cover flex-shrink-0" /> PT
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentLang('EN')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm ${currentLang === 'EN' ? 'bg-[#013149] border-[#67a7d5] text-white' : 'border-white/10 text-gray-400'}`}
                  >
                    <Flag code="US" className="w-5 h-4 rounded-sm object-cover flex-shrink-0" /> EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentLang('ES')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm ${currentLang === 'ES' ? 'bg-[#013149] border-[#67a7d5] text-white' : 'border-white/10 text-gray-400'}`}
                  >
                    <Flag code="ES" className="w-5 h-4 rounded-sm object-cover flex-shrink-0" /> ES
                  </button>
                </div>
              </div>

              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#013149] to-[#000d13] text-white rounded-xl border border-white/10 text-center font-roboto font-normal tracking-[0.48px]"
              >
                {uiTranslations[currentLang].login}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
