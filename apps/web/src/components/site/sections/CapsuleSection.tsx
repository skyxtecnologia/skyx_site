'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const translations = {
  PT: {
    tag: 'Tecnologia VR 360º',
    title: 'Cápsula',
    titleGradient: 'Imersiva',
    desc: 'A tecnologia definitiva para quem deseja se destacar. Criamos um ambiente de Realidade Virtual onde seu público pode se desligar do mundo exterior e vivenciar conteúdos de forma profunda e memorável.',
    hudTelemetry: '360º VR • ÁUDIO ESPACIAL • ROBÓTICA',
    exploreApp: 'Explorar aplicação',
    cards: [
      {
        id: 'educacao',
        title: 'Educação',
        desc: 'Treinamentos hiper-realistas e ambientes de simulação que aceleram o aprendizado e a retenção de conhecimento.',
        metric: 'Simulação Hiper-Realista',
        metricSub: 'Retenção cognitiva até 4x superior em treinamentos práticos',
        image:
          'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'imersao',
        title: 'Imersão Empresarial',
        desc: 'Apresentações B2B impactantes, tours virtuais de plantas industriais e demonstração interativa de produtos.',
        metric: 'PESSOAS IMERSAS',
        metricSub: '+65 mil pessoas em nossa tecnologia',
        image:
          'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'eventos',
        title: 'Eventos & Feiras',
        desc: 'Seja o destaque de qualquer evento, engajando o público com experiências sensoriais e fortalecendo sua marca.',
        metric: 'Engajamento Máximo em Feiras',
        metricSub: 'Atração contínua de visitantes e experiência de marca memorável',
        image:
          'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    cta: 'Leve a Cápsula para sua Empresa',
    secondaryCta: 'Falar com Especialista',
  },
  EN: {
    tag: '360º VR Technology',
    title: 'Immersive',
    titleGradient: 'Capsule',
    desc: 'The definitive technology for those who want to stand out. We create a Virtual Reality environment where your audience can disconnect from the outside world and experience content in a deep and memorable way.',
    hudTelemetry: '360º VR • SPATIAL AUDIO • ROBOTICS',
    exploreApp: 'Explore application',
    cards: [
      {
        id: 'education',
        title: 'Education',
        desc: 'Hyper-realistic training and simulation environments that accelerate learning and knowledge retention.',
        metric: 'Hyper-Realistic Simulation',
        metricSub: 'Up to 4x higher cognitive retention in hands-on training',
        image:
          'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'business',
        title: 'Business Immersion',
        desc: 'Impactful B2B presentations, virtual industrial plant tours, and interactive product demonstrations.',
        metric: 'PEOPLE IMMERSED',
        metricSub: '+65 thousand people in our technology',
        image:
          'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'events',
        title: 'Events & Fairs',
        desc: 'Stand out at any event, engaging the audience with sensory experiences and strengthening your brand.',
        metric: 'Maximum Event Engagement',
        metricSub: 'Continuous visitor attraction and memorable brand experience',
        image:
          'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    cta: 'Bring the Capsule to your Company',
    secondaryCta: 'Talk to an Expert',
  },
  ES: {
    tag: 'Tecnología VR 360º',
    title: 'Cápsula',
    titleGradient: 'Inmersiva',
    desc: 'La tecnología definitiva para quienes desean destacar. Creamos un entorno de Realidad Virtual donde tu público puede desconectarse del mundo exterior y experimentar contenidos de forma profunda y memorable.',
    hudTelemetry: '360º VR • AUDIO ESPACIAL • ROBÓTICA',
    exploreApp: 'Explorar aplicación',
    cards: [
      {
        id: 'educacion',
        title: 'Educación',
        desc: 'Entrenamientos hiperrealistas y entornos de simulación que aceleran el aprendizaje y la retención.',
        metric: 'Simulación Hiperrealista',
        metricSub: 'Retención cognitiva hasta 4 veces superior en entrenamientos prácticos',
        image:
          'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'inmersion',
        title: 'Inmersión Empresarial',
        desc: 'Presentaciones B2B impactantes, recorridos virtuales de plantas industriales y demostración de productos.',
        metric: 'PERSONAS INMERSAS',
        metricSub: '+65 mil personas en nuestra tecnología',
        image:
          'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'eventos',
        title: 'Eventos y Ferias',
        desc: 'Sé el centro de atención en cualquier evento, atrayendo al público y fortaleciendo tu marca.',
        metric: 'Máximo Impacto en Ferias',
        metricSub: 'Atracción continua de visitantes y experiencia de marca memorable',
        image:
          'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    cta: 'Lleva la Cápsula a tu Empresa',
    secondaryCta: 'Hablar con un Experto',
  },
} as const;

export function CapsuleSection() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, isInView]);

  const currentCard = t.cards[activeTab];

  const renderCardIcon = (idx: number) => {
    if (idx === 0) {
      return (
        <svg
          className="w-5 h-5 text-[#00d9ff]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
          <title>Ícone de Educação</title>
        </svg>
      );
    }
    if (idx === 1) {
      return (
        <svg
          className="w-5 h-5 text-[#00d9ff]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
          <title>Ícone de Imersão Empresarial</title>
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-[#00d9ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
        <title>Ícone de Eventos</title>
      </svg>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[55px] md:py-[89px] lg:py-[110px] scroll-mt-20 bg-[#050505] overflow-hidden flex items-center"
      id="capsula"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background decorations (Smooth GPU-composited radial gradients) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(1, 66, 99, 0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(103, 167, 213, 0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-stretch gap-[34px] lg:gap-[55px] w-full">
        {/* Left Side: Dynamic HUD Glass Showcase */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center relative min-h-[420px] md:min-h-[480px] lg:min-h-0"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(1,66,99,0.35)] border border-[#67a7d5]/30 bg-[#010D13] group">
            {/* Pre-rendered slides for instant GPU crossfade (zero decode stutter) */}
            {t.cards.map((card, idx) => (
              <div
                key={card.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  activeTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010D13]/90 via-[#010D13]/25 via-45% to-transparent" />
              </div>
            ))}

            {/* Top Minimalist White Text Overlay */}
            <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between gap-3">
              <span className="text-[11px] md:text-xs font-roboto font-medium uppercase tracking-[0.22em] text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                {t.hudTelemetry}
              </span>
            </div>

            {/* Bottom Floating Glass HUD Card (Hardware-accelerated, zero backdrop-blur bottleneck) */}
            <div className="absolute bottom-5 left-5 right-5 z-20">
              <div className="rounded-xl bg-[#010D13]/95 border border-[#67a7d5]/40 p-5 shadow-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-roboto font-bold uppercase tracking-widest text-[#00d9ff]">
                        {currentCard.title}
                      </span>
                      <span className="text-white/30">•</span>
                      <span className="text-xs font-roboto font-medium text-[#67a7d5]">
                        {currentCard.metric}
                      </span>
                    </div>
                    <p className="text-white font-roboto text-sm md:text-base font-medium leading-snug">
                      {currentCard.metricSub}
                    </p>
                  </div>

                  <Link
                    href="/capsula#aplicacoes"
                    aria-label={`${t.exploreApp} - ${currentCard.title}`}
                    className="w-11 h-11 rounded-full bg-[#014263]/90 border border-[#67a7d5]/50 text-[#00d9ff] hover:bg-[#00d9ff] hover:text-[#010D13] hover:rotate-45 transition-all duration-300 flex items-center justify-center shrink-0 shadow-lg cursor-pointer"
                  >
                    <span className="text-lg font-bold leading-none">&#8599;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Feature Tabs with Stable Height */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-[21px] md:gap-[28px] py-2"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="w-full flex flex-col items-center lg:items-start">
            <h2
              className="font-zen-dots text-white mb-4 leading-[1.2]"
              style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)' }}
            >
              {t.title}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#014263] via-[#3b82a6] to-[#67a7d5]">
                {t.titleGradient}
              </span>
            </h2>
            <p className="text-gray-300 font-roboto text-base md:text-lg leading-[1.618] font-light max-w-2xl mx-auto lg:mx-0">
              {t.desc}
            </p>
          </div>

          {/* Interactive Feature Tabs (Stable Height, Zero Layout Shift) */}
          <div className="flex flex-col gap-3.5 w-full flex-grow justify-center">
            {t.cards.map((card, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveTab(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveTab(idx);
                    }
                  }}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  className={`relative overflow-hidden rounded-xl p-5 transition-all duration-300 cursor-pointer text-left border ${
                    isActive
                      ? 'bg-[#014263]/30 border-[#67a7d5]/60 shadow-[0_10px_30px_rgba(1,66,99,0.25)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isActive
                          ? 'bg-[#014263]/60 border-[#00d9ff]/50 scale-105'
                          : 'bg-[#014263]/25 border-[#67a7d5]/25'
                      }`}
                    >
                      {renderCardIcon(idx)}
                    </div>
                    <div className="flex flex-col">
                      <h4
                        className={`font-semibold font-roboto text-base md:text-lg mb-1 transition-colors ${
                          isActive ? 'text-white' : 'text-gray-300'
                        }`}
                      >
                        {card.title}
                      </h4>
                      <p
                        className={`font-roboto text-xs md:text-sm leading-[1.55] font-light transition-colors ${
                          isActive ? 'text-gray-200' : 'text-gray-400'
                        }`}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  {/* Animated Bottom Progress Bar on Active Tab (Hardware-accelerated CSS scaleX, zero re-render reflows) */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
                      <div
                        key={`progress-${activeTab}`}
                        style={{
                          transformOrigin: '0% 50%',
                          animation: 'capsuleProgress 6s linear forwards',
                          animationPlayState: isPaused ? 'paused' : 'running',
                        }}
                        className="h-full w-full bg-gradient-to-r from-[#014263] via-[#67a7d5] to-[#00d9ff] will-change-transform"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Botões ocupando 100% da largura da linha (img 3) */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3.5 w-full pt-2">
            <Link
              href="/capsula"
              className="flex-1 flex items-center justify-center px-5 py-3.5 bg-gradient-to-r from-[#013149] to-[#000d13] text-white font-roboto font-medium tracking-[0.4px] rounded-[10px] hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all duration-300 border border-white/10 text-sm md:text-base whitespace-nowrap text-center"
            >
              {t.cta}
            </Link>

            <Link
              href="#contato"
              className="flex-1 flex items-center justify-center px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white font-roboto font-medium tracking-[0.4px] rounded-[10px] border border-white/15 hover:border-[#67a7d5]/50 transition-all duration-300 text-sm md:text-base whitespace-nowrap text-center"
            >
              {t.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
