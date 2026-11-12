'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

const MotionLink = motion.create(Link);

const imgLogo1 = '/img/logo-nav.png';

const translations = {
  PT: {
    title1: 'Uma nova forma de',
    title2: 'moldar o futuro',
    subtitle: 'Tecnologia aplicada para gerar clareza, engajamento e resultados reais.',
    cta: 'Explore o futuro',
    scroll: 'Role para baixo',
    miniCards: [
      {
        title: 'Engenharia de Software',
        subtitle: 'Sistemas e soluções sob medida',
        href: '#solucoes',
        icon: 'software',
      },
      {
        title: 'Sobre a Cápsula',
        subtitle: 'Experiência imersiva em VR 360º',
        href: '#capsula',
        icon: 'capsule',
      },
      {
        title: 'Segurança & Forças Policiais',
        subtitle: 'Perícia 3D e inteligência tática',
        href: '#solucoes',
        icon: 'security',
      },
      {
        title: 'Cases Reais de Impacto',
        subtitle: 'Resultados reais comprovados',
        href: '#cases',
        icon: 'cases',
      },
    ],
  },
  EN: {
    title1: 'A new way to',
    title2: 'shape the future',
    subtitle: 'Applied technology to generate clarity, engagement, and real results.',
    cta: 'Explore the future',
    scroll: 'Scroll down',
    miniCards: [
      {
        title: 'Software Engineering',
        subtitle: 'Custom systems and solutions',
        href: '#solucoes',
        icon: 'software',
      },
      {
        title: 'About the Capsule',
        subtitle: '360º VR immersive experience',
        href: '#capsula',
        icon: 'capsule',
      },
      {
        title: 'Security & Police Forces',
        subtitle: '3D forensics and tactical intel',
        href: '#solucoes',
        icon: 'security',
      },
      {
        title: 'Real Impact Cases',
        subtitle: 'Proven real-world results',
        href: '#cases',
        icon: 'cases',
      },
    ],
  },
  ES: {
    title1: 'Una nueva forma de',
    title2: 'moldear el futuro',
    subtitle: 'Tecnología aplicada para generar claridad, compromiso y resultados reales.',
    cta: 'Explora el futuro',
    scroll: 'Desplázate hacia abajo',
    miniCards: [
      {
        title: 'Ingeniería de Software',
        subtitle: 'Sistemas y soluciones a medida',
        href: '#solucoes',
        icon: 'software',
      },
      {
        title: 'Sobre la Cápsula',
        subtitle: 'Experiencia inmersiva VR 360º',
        href: '#capsula',
        icon: 'capsule',
      },
      {
        title: 'Seguridad y Fuerzas Policiales',
        subtitle: 'Peritaje 3D e inteligencia táctica',
        href: '#solucoes',
        icon: 'security',
      },
      {
        title: 'Casos Reales de Impacto',
        subtitle: 'Resultados reales comprobados',
        href: '#cases',
        icon: 'cases',
      },
    ],
  },
} as const;

interface HomeHeroProps {
  lang?: 'PT' | 'EN' | 'ES';
  setLang?: (lang: 'PT' | 'EN' | 'ES') => void;
}

function MiniCardIcon({ type }: { type: 'software' | 'capsule' | 'security' | 'cases' }) {
  if (type === 'software') {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
        <title>Software</title>
      </svg>
    );
  }
  if (type === 'capsule') {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
        />
        <title>Cápsula</title>
      </svg>
    );
  }
  if (type === 'security') {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
        <title>Segurança</title>
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
      <title>Cases</title>
    </svg>
  );
}

export function HomeHero({ lang = 'PT' }: HomeHeroProps) {
  const [videoError, setVideoError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const t = translations[lang];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-white"
    >
      {/* Background Video or Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-[1.05] translate-y-1"
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
            className="object-cover scale-[1.05] translate-y-1"
            priority
          />
        )}

        {/* Bottom White Gradient to completely cover Veo watermark and seamlessly blend into #sobre */}
        <div
          className="absolute bottom-0 left-0 right-0 h-44 sm:h-56 md:h-72 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 0.85) 48%, rgba(255, 255, 255, 0.4) 72%, transparent 100%)',
          }}
        />
      </div>

      {/* Decorative gradient elements (Smooth GPU-composited radial glow, zero filter blur overhead) */}
      <div
        className="absolute pointer-events-none opacity-40"
        style={{
          width: '1254px',
          height: '554px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 42%, transparent 70%)',
        }}
      />

      <div
        className="absolute pointer-events-none opacity-30"
        style={{
          width: '320px',
          height: '160px',
          top: '40%',
          left: '20%',
          background:
            'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
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
          willChange: 'transform, opacity',
        }}
        className="relative z-10 -mt-10 md:-mt-14"
      >
        {/* Main Content - Centered */}
        <motion.div
          className="text-center flex flex-col items-center gap-8"
          style={{
            width: '1145px',
            maxWidth: '90%',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Title and Subtitle Container */}
          <div className="flex flex-col items-center gap-[18px] w-full">
            {/* Logo in Hero (Mobile) */}
            <motion.div
              className="flex md:hidden justify-center w-full mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative w-[160px] h-[44px]">
                <Image src={imgLogo1} alt="SkyX Logo" fill className="object-contain" unoptimized />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-zen-dots text-center text-balance w-full"
              style={{
                color: '#014263',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: '400',
                lineHeight: 1.18,
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            >
              {t.title1} <br /> {t.title2}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-roboto text-center text-balance max-w-2xl drop-shadow-sm"
              style={{
                color: '#334155',
                fontSize: 'clamp(1rem, 2vw, 1.3125rem)',
                fontWeight: '400',
                lineHeight: 1.5,
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              {t.subtitle}
            </motion.p>
          </div>

          {/* CTA Button — Estilo SkyX Original */}
          <MotionLink
            href="#sobre"
            className="rounded-xl px-8 py-4 bg-gradient-to-r from-[#013149] to-[#000d13] text-white border border-white/10 hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all inline-flex items-center justify-center cursor-pointer font-roboto font-normal text-lg md:text-xl tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.cta}
          </MotionLink>
        </motion.div>
      </motion.div>

      {/* Bottom Mini Cards (Ex. Img 5 — Ícone circular translúcido à esquerda + Título e Subtítulo) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.8 }}
        style={{ opacity: heroTextOpacity }}
        className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 absolute bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 max-w-6xl w-[92%] z-10"
      >
        {t.miniCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-[#010D13]/65 hover:bg-[#013149]/85 backdrop-blur-md border border-white/15 hover:border-[#67a7d5]/50 shadow-[0_10px_30px_rgba(1,13,19,0.25)] transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-white/20 border border-white/20 flex items-center justify-center text-white shrink-0 transition-all duration-300 group-hover:scale-105">
              <MiniCardIcon type={card.icon} />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="font-roboto font-medium text-sm text-white leading-tight truncate group-hover:text-[#67a7d5] transition-colors">
                {card.title}
              </span>
              <span className="font-roboto font-light text-xs text-white/75 leading-snug mt-0.5 line-clamp-1">
                {card.subtitle}
              </span>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Scroll Indicator (Mobile) */}
      <MotionLink
        href="#sobre"
        className="md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity: heroTextOpacity }}
      >
        <span className="text-[#014263] text-xs font-roboto font-medium tracking-widest uppercase">
          {t.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-[#014263]/40 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-[#014263] rounded-full" />
        </motion.div>
      </MotionLink>
    </section>
  );
}
