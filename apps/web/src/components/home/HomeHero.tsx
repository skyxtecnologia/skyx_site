'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const imgLogo1 = '/img/logo-nav.png';

const translations = {
  PT: {
    nav: ['Sobre nós', 'Serviços', 'Cases', 'Blog', 'Contato', 'Streaming'],
    login: 'LOGIN',
    lang: 'Idioma',
    title1: 'Uma nova forma de',
    title2: 'moldar o futuro',
    subtitle: 'Tecnologia aplicada para gerar clareza, engajamento e resultados reais.',
    cta: 'Explore o futuro',
    scroll: 'Role para baixo',
  },
  EN: {
    nav: ['About Us', 'Services', 'Cases', 'Blog', 'Contact', 'Streaming'],
    login: 'LOGIN',
    lang: 'Language',
    title1: 'A new way to',
    title2: 'shape the future',
    subtitle: 'Applied technology to generate clarity, engagement, and real results.',
    cta: 'Explore the future',
    scroll: 'Scroll down',
  },
};

interface HomeHeroProps {
  lang?: 'PT' | 'EN';
  setLang?: (lang: 'PT' | 'EN') => void;
}

export function HomeHero({ lang = 'PT', setLang = () => {} }: HomeHeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const t = translations[lang];
  const navItems = t.nav;

  const sectionMap: Record<string, string> = {
    'Sobre nós': 'about',
    'About Us': 'about',
    'Serviços': 'servicos',
    'Services': 'servicos',
    Cases: 'cases',
    Blog: 'news',
    Contato: 'contato',
    Contact: 'contato',
    Streaming: 'showcase',
  };

  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroTextOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isHeroVisible) {
      setIsMenuOpen(false);
    }
  }, [isHeroVisible]);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, itemName: string) => {
    e.preventDefault();
    const sectionId = sectionMap[itemName];
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const targetPosition = section.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1200; // 1.2s para uma animação luxuosa
        let start: number | null = null;

        // Curva de aceleração Ease-in-out Quart
        const easeInOutQuart = (time: number, begin: number, change: number, duration: number) => {
          const normalizedTime = time / (duration / 2);
          if (normalizedTime < 1) return (change / 2) * normalizedTime ** 4 + begin;
          return (-change / 2) * ((normalizedTime - 2) ** 4 - 2) + begin;
        };

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          } else {
            window.scrollTo(0, targetPosition); // Precisão no destino final
          }
        };

        requestAnimationFrame(animation);
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu - Hamburger in top right */}
      <motion.div
        className="fixed z-50 top-0 right-0"
        style={{
          paddingTop: '16px',
          paddingRight: '16px',
        }}
      >
        {/* Hamburger Button */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative w-12 h-12 flex items-center justify-center"
          style={{
            background: 'linear-gradient(90deg, #013149 0%, #000D13 100%)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative', width: '24px', height: '24px' }}
          >
            <motion.span
              animate={isMenuOpen ? { y: 8, rotate: 90 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '2px',
                background: 'white',
                top: '4px',
                left: '2px',
              }}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '2px',
                background: 'white',
                top: '11px',
                left: '2px',
              }}
            />
            <motion.span
              animate={isMenuOpen ? { y: -8, rotate: -90 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '2px',
                background: 'white',
                top: '18px',
                left: '2px',
              }}
            />
          </motion.div>
        </motion.button>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 mt-3 md:hidden"
              style={{
                background: 'rgba(1, 13, 19, 0.95)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                minWidth: '200px',
              }}
            >
              {/* Menu Items */}
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${sectionMap[item]}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={(e) => {
                    handleNavClick(e, item);
                    setIsMenuOpen(false);
                  }}
                  className="block py-3 px-4 transition-colors hover:bg-white/10 rounded-lg"
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: '400',
                    textDecoration: 'none',
                  }}
                >
                  {item}
                </motion.a>
              ))}

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  margin: '12px 0',
                }}
              />

              {/* Mobile Language Toggle */}
              <button
                type="button"
                onClick={() => setLang(lang === 'PT' ? 'EN' : 'PT')}
                className="w-full py-3 px-4 flex items-center justify-between text-white hover:bg-white/10 rounded-lg transition-colors mt-2"
                style={{ fontFamily: "'Roboto', sans-serif", fontSize: '16px' }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#67A7D5]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                  <span>{t.lang}</span>
                </div>
                <span className="font-bold text-[#67A7D5]">{lang}</span>
              </button>

              {/* Login Button in Menu */}
              <motion.a
                href="/login"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                className="block py-3 px-4 text-center transition-all hover:shadow-lg rounded-lg"
                style={{
                  background: 'linear-gradient(90deg, #013149 0%, #000D13 100%)',
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: '400',
                  textDecoration: 'none',
                  marginTop: '8px',
                }}
              >
                {t.login}
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {!isHeroVisible && (
        <motion.div
          className="hidden md:flex fixed z-50 top-0 right-0"
          style={{
            paddingTop: '16px',
            paddingRight: '16px',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-gradient-to-r from-[#013149] to-[#000D13] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
          >
            <span className="sr-only">Abrir menu</span>
            <span className="relative block h-5 w-5" aria-hidden="true">
              <span
                className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-white transition-transform duration-300"
                style={
                  isMenuOpen
                    ? { transform: 'translateY(8px) rotate(45deg)' }
                    : { transform: 'translateY(0) rotate(0deg)' }
                }
              />
              <span
                className="absolute left-0 top-[8px] h-[2px] w-5 rounded-full bg-white transition-opacity duration-300"
                style={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <span
                className="absolute left-0 top-[16px] h-[2px] w-5 rounded-full bg-white transition-transform duration-300"
                style={
                  isMenuOpen
                    ? { transform: 'translateY(-8px) rotate(-45deg)' }
                    : { transform: 'translateY(0) rotate(0deg)' }
                }
              />
            </span>
          </button>
        </motion.div>
      )}

      {!isHeroVisible && isMenuOpen && (
        <motion.div
          className="hidden md:flex fixed z-50 right-4 top-[72px]"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="rounded-[12px] border border-white/10 bg-[#010D13]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-md"
            style={{ minWidth: '200px' }}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${sectionMap[item]}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.25 }}
                  onClick={(e) => handleNavClick(e, item)}
                  className="rounded-lg px-4 py-3 text-white transition-colors hover:bg-white/10"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: '16px',
                    fontWeight: '400',
                    textDecoration: 'none',
                  }}
                >
                  {item}
                </motion.a>
              ))}

              <div
                style={{
                  height: '1px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  margin: '12px 0',
                }}
              />

              <button
                type="button"
                onClick={() => setLang(lang === 'PT' ? 'EN' : 'PT')}
                className="w-full py-3 px-4 flex items-center justify-between text-white hover:bg-white/10 rounded-lg transition-colors mt-2"
                style={{ fontFamily: "'Roboto', sans-serif", fontSize: '16px' }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#67A7D5]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                  <span>{t.lang}</span>
                </div>
                <span className="font-bold text-[#67A7D5]">{lang}</span>
              </button>

              <Link
                href="/login"
                className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-dark transition-transform hover:scale-[1.01]"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: '14px',
                  fontWeight: '400',
                  textDecoration: 'none',
                }}
              >
                {t.login}
              </Link>
            </nav>
          </div>
        </motion.div>
      )}

      {isHeroVisible && (
        <motion.div
          className="hidden md:flex fixed z-50 pointer-events-none top-0 left-0 right-0"
          style={{
            paddingTop: '60px',
            justifyContent: 'center',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="pointer-events-auto"
            style={{
              width: 'auto',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: '50px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 transition-opacity hover:opacity-80"
              style={{
                width: '139px',
                height: '30px',
                position: 'relative',
              }}
            >
              <Image src={imgLogo1} alt="SKYX Logo" fill className="object-contain" unoptimized />
            </Link>

            {/* Navigation Items - Desktop Only */}
            <div
              className="hidden md:flex"
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <div
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '26px',
                  display: 'flex',
                }}
              >
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${sectionMap[item]}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className="transition-all duration-200 hover:text-primary"
                    style={{
                      color: 'white',
                      fontSize: '20px',
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: '400',
                      wordWrap: 'break-word',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0px',
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Login Button */}
            <a
              href="/login"
              className="transition-all duration-200 hover:shadow-lg flex-shrink-0"
              style={{
                width: '90px',
                height: '30px',
                background: 'linear-gradient(90deg, #013149 0%, #000D13 100%)',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '16px',
                fontFamily: "'Roboto', sans-serif",
                fontWeight: '400',
                lineHeight: '24px',
                letterSpacing: '0.48px',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {t.login}
            </a>
          </div>
        </motion.div>
      )}

      {/* Language Selector - Fixed - Only in Hero */}
      {isHeroVisible && (
        <motion.button
          type="button"
          onClick={() => setLang(lang === 'PT' ? 'EN' : 'PT')}
          className="hidden md:inline-flex fixed z-40 cursor-pointer hover:brightness-110 transition-all"
          style={{
            top: '60px',
            right: '16px',
            height: '55px',
            paddingLeft: '14px',
            paddingRight: '14px',
            paddingTop: '8px',
            paddingBottom: '8px',
            background: 'linear-gradient(90deg, #013149 0%, #000D13 100%)',
            borderRadius: '12px',
            alignItems: 'center',
            gap: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Globe icon */}
          <div
            style={{
              width: '32px',
              height: '32px',
              background: 'white',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              className="w-5 h-5 text-[#013149]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>

          {/* Language indicator */}
          <div
            style={{
              width: '52px',
              height: '38px',
              paddingLeft: '6px',
              paddingRight: '6px',
              paddingTop: '2px',
              paddingBottom: '2px',
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.41)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '35px',
                position: 'absolute',
                background: 'white',
                borderRadius: '4px',
                top: '1.5px',
                left: '1px',
              }}
            />
            <span className="relative z-10 text-[#013149] font-bold font-roboto text-sm px-1">
              {lang}
            </span>
          </div>
        </motion.button>
      )}

      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{
          background:
            'linear-gradient(0deg, white 0%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0.1) 70%, rgba(0, 0, 0, 0) 100%), radial-gradient(ellipse 91.34% 346.83% at 78.59% 105.91%, black 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(ellipse 73.87% 149.36% at 20.05% 124.12%, rgba(17.99, 17.93, 21.58, 0.41) 0%, rgba(115.73, 194.65, 255, 0.41) 100%)',
          backgroundBlendMode: 'hard-light, hard-light, soft-light, normal',
        }}
      >
        {/* Background Video or Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {!videoError ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
            >
              <source src="/img/hero-bg.webm" type="video/webm" />
              <source src="/img/hero-bg.mp4" type="video/mp4" />
            </video>
          ) : null}

          {videoError && (
            <Image
              src="/img/hero-bg.png"
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Decorative blur elements */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '1254px',
            height: '554px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.58)',
            borderRadius: '9999px',
            filter: 'blur(124.65px)',
            mixBlendMode: 'soft-light',
          }}
        />

        <div
          className="absolute pointer-events-none"
          style={{
            width: '228px',
            height: '101px',
            top: '40%',
            left: '20%',
            background: 'rgba(255, 255, 255, 0.58)',
            borderRadius: '9999px',
            filter: 'blur(33.45px)',
            mixBlendMode: 'soft-light',
          }}
        />

        {/* Parallax Wrapper */}
        <motion.div
          style={{
            y: heroTextY,
            opacity: heroTextOpacity,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          className="relative z-10"
        >
          {/* Main Content - Centered */}
          <motion.div
            className="text-center flex flex-col items-center gap-6"
            style={{
              width: '1145px',
              maxWidth: '90%',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Title and Subtitle Container */}
            <div className="flex flex-col items-center gap-2 w-full">
              {/* Logo in Hero */}
              <motion.div
                className="flex md:hidden justify-center w-full mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className="relative w-[180px] h-[50px] md:w-[280px] md:h-[75px]">
                  <Image
                    src={imgLogo1}
                    alt="SkyX Logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="font-zen-dots text-center w-full"
                style={{
                  color: '#014263',
                  fontSize: 'clamp(36px, 8vw, 64px)',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  letterSpacing: '1.28px',
                  wordBreak: 'break-word',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                {t.title1} <br /> {t.title2}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="font-roboto text-center"
                style={{
                  color: '#5B5B5B',
                  fontSize: 'clamp(16px, 4vw, 24px)',
                  fontWeight: '400',
                  lineHeight: '1.4',
                  letterSpacing: '0.72px',
                  wordBreak: 'break-word',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              >
                {t.subtitle}
              </motion.p>
            </div>

            {/* CTA Button */}
            <motion.button
              type="button"
              onClick={(e) => handleNavClick(e, 'Sobre nós')}
              className="inline-flex font-roboto font-normal no-underline transition-all duration-200 hover:shadow-2xl"
              style={{
                width: '232px',
                height: '66px',
                paddingLeft: '24px',
                paddingRight: '24px',
                paddingTop: '10px',
                paddingBottom: '10px',
                background: 'linear-gradient(85deg, #014263 0%, #67A7D5 100%)',
                borderRadius: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: 'clamp(18px, 4vw, 24px)',
                lineHeight: '1.2',
                letterSpacing: '0.72px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(1, 66, 99, 0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.cta}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          onClick={(e) => handleNavClick(e, 'Sobre nós')}
          style={{ opacity: heroTextOpacity }}
        >
          <span className="text-white/60 text-sm font-roboto tracking-widest uppercase">
            {t.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
