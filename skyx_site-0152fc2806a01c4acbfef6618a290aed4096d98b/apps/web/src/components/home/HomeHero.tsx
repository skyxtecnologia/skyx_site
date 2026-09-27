'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const MotionLink = motion.create(Link);

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
  ES: {
    nav: ['Sobre nosotros', 'Servicios', 'Casos', 'Blog', 'Contacto', 'Streaming'],
    login: 'INICIAR SESIÓN',
    lang: 'Idioma',
    title1: 'Una nueva forma de',
    title2: 'moldear el futuro',
    subtitle: 'Tecnología aplicada para generar claridad, compromiso y resultados reales.',
    cta: 'Explora el futuro',
    scroll: 'Desplázate hacia abajo',
  },
};

interface HomeHeroProps {
  lang?: 'PT' | 'EN' | 'ES';
  setLang?: (lang: 'PT' | 'EN' | 'ES') => void;
}

export function HomeHero({ lang = 'PT', setLang = () => {} }: HomeHeroProps) {
  const [videoError, setVideoError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const t = translations[lang];
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroTextOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <>
      {/* Language Selector removed - now exclusively in SiteHeader */}

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
              className="w-full h-full object-cover scale-[1.12]" // Escala aumentada para jogar a marca d'água para fora da tela
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
              className="object-cover scale-[1.12]"
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
            <MotionLink
              href="#sobre"
              className="inline-flex justify-center items-center px-8 py-4 bg-gradient-to-r from-[#013149] to-[#000d13] text-white rounded-xl border border-white/10 font-roboto font-medium text-xl md:text-2xl tracking-wide hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all cursor-pointer"
              style={{
                width: '232px',
                height: '66px',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.cta}
            </MotionLink>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <MotionLink
          href="#sobre"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
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
        </MotionLink>
      </section>
    </>
  );
}
