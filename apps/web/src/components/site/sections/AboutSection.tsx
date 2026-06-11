'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: {
    slides: [
      { id: 'intro', label: 'Introdução' },
      { id: 'history', label: 'Nossa História' },
      { id: 'values', label: 'Valores' },
      { id: 'partners', label: 'Parceiros' },
    ],
    title: 'Tecnologia que transforma',
    intro:
      'A Sky X Tecnologia desenvolve soluções digitais sob medida, unindo inovação, tecnologia e educação para criar projetos inteligentes, modernos e de alto impacto.',
    history:
      'Desde sua criação, a empresa vem evoluindo continuamente, ampliando sua atuação e explorando novas possibilidades dentro do universo tecnológico. Com foco em inovação e versatilidade, a Sky X se consolidou como uma parceira estratégica no desenvolvimento de soluções que acompanham as demandas do presente e antecipam as necessidades do futuro.',
    valuesTitle: 'Nossos valores',
    partnersTitle: 'Nossos parceiros',
    emptyPartners: 'Novos parceiros serão exibidos em breve.',
    values: [
      {
        title: 'Inovação',
        description:
          'Buscamos constantemente novas ideias e tecnologias para criar soluções que vão além do convencional.',
        gradient: 'linear-gradient(85deg, #014263 0%, #67A7D5 100%)',
      },
      {
        title: 'Parceria',
        description:
          'Trabalhamos lado a lado com nossos clientes, entendendo suas necessidades para entregar soluções sob medida.',
        gradient: 'linear-gradient(90deg, #307198 0%, #014263 100%)',
      },
      {
        title: 'Eficiência',
        description:
          'Desenvolvemos projetos inteligentes, com foco em performance, qualidade e resultados reais.',
        gradient: 'linear-gradient(85deg, #014263 0%, #67A7D5 100%)',
      },
      {
        title: 'Versatilidade',
        description:
          'Atuamos em diferentes áreas da tecnologia, adaptando soluções para diversos cenários e desafios.',
        gradient: 'linear-gradient(90deg, #307197 0%, #014263 100%)',
      },
    ],
  },
  EN: {
    slides: [
      { id: 'intro', label: 'Introduction' },
      { id: 'history', label: 'Our History' },
      { id: 'values', label: 'Values' },
      { id: 'partners', label: 'Partners' },
    ],
    title: 'Technology that transforms',
    intro:
      'Sky X Technology develops tailor-made digital solutions, uniting innovation, technology, and education to create smart, modern, and high-impact projects.',
    history:
      'Since its creation, the company has been continuously evolving, expanding its operations, and exploring new possibilities within the technological universe. With a focus on innovation and versatility, Sky X has consolidated itself as a strategic partner in developing solutions that meet present demands and anticipate future needs.',
    valuesTitle: 'Our values',
    partnersTitle: 'Our partners',
    emptyPartners: 'New partners will be displayed soon.',
    values: [
      {
        title: 'Innovation',
        description:
          'We constantly seek new ideas and technologies to create solutions that go beyond the conventional.',
        gradient: 'linear-gradient(85deg, #014263 0%, #67A7D5 100%)',
      },
      {
        title: 'Partnership',
        description:
          'We work side by side with our clients, understanding their needs to deliver tailored solutions.',
        gradient: 'linear-gradient(90deg, #307198 0%, #014263 100%)',
      },
      {
        title: 'Efficiency',
        description:
          'We develop intelligent projects, focusing on performance, quality, and real results.',
        gradient: 'linear-gradient(85deg, #014263 0%, #67A7D5 100%)',
      },
      {
        title: 'Versatility',
        description:
          'We operate in different areas of technology, adapting solutions for various scenarios and challenges.',
        gradient: 'linear-gradient(90deg, #307197 0%, #014263 100%)',
      },
    ],
  },
};

type ContentSlide = 'intro' | 'history' | 'values' | 'partners';

interface AboutSectionProps {
  lang?: 'PT' | 'EN';
}

export function AboutSection({ lang = 'PT' }: AboutSectionProps) {
  const [currentSlide, setCurrentSlide] = useState<ContentSlide>('intro');
  const t = translations[lang];
  const [dbPartners, setDbPartners] = useState<{ id: string; name: string; image: string }[]>([]);

  const introRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (slideId: ContentSlide) => {
    const refs = {
      intro: introRef,
      history: historyRef,
      values: valuesRef,
      partners: partnersRef,
    };
    const targetRef = refs[slideId];
    if (targetRef.current) {
      const targetPosition =
        targetRef.current.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight / 2 +
        targetRef.current.clientHeight / 2;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 800; // Pouco mais rápido por ser uma transição interna (0.8s)
      let start: number | null = null;

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
          window.scrollTo(0, targetPosition);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      // Amplia a zona de detecção para o centro da tela (40% de área) para evitar pulos em rolagem rápida
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const slide = entry.target.getAttribute('data-slide') as ContentSlide;
          if (slide) setCurrentSlide(slide);
        }
      }
    }, options);

    if (introRef.current) observer.observe(introRef.current);
    if (historyRef.current) observer.observe(historyRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);
    if (partnersRef.current) observer.observe(partnersRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await api.get('/api/partners');
        if (res.data && res.data.length > 0) {
          const featured = res.data.filter((p: { isFeatured: boolean }) => p.isFeatured);
          setDbPartners(featured.length > 0 ? featured : res.data);
        }
      } catch (err) {
        console.error('Erro ao buscar parceiros:', err);
      }
    };
    fetchPartners();
  }, []);

  const displayPartners = dbPartners.map((p) => ({
    name: p.name,
    src: p.image,
    width: 200,
    height: 110,
  }));

  const fadeVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' as import('framer-motion').Easing },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2, ease: 'easeIn' as import('framer-motion').Easing },
    },
  };

  return (
    <div id="about" className="relative w-full bg-white">
      {/* Container pegajoso: Fica fixo na tela enquanto descemos pelas seções invisíveis */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none bg-white z-10">
        {/* Indicadores de progresso laterais (Bolinhas) */}
        <div className="absolute right-6 md:right-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20 pointer-events-auto">
          {t.slides.map((slide) => (
            <button
              type="button"
              key={slide.id}
              onClick={() => scrollToSlide(slide.id as ContentSlide)}
              className="group relative flex items-center justify-end w-6 h-6 cursor-pointer"
              aria-label={`Ir para ${slide.label}`}
            >
              <span
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === slide.id
                    ? 'bg-[#014263] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
              <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-roboto text-[#014263] whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm border border-gray-100 pointer-events-none">
                {slide.label}
              </span>
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 w-full h-full relative flex items-center justify-center pointer-events-auto">
          <AnimatePresence>
            {/* Intro e History combinados na mesma tela */}
            {(currentSlide === 'intro' || currentSlide === 'history') && (
              <motion.div
                key="intro-history"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full flex flex-col items-center gap-6 md:gap-8 text-center"
              >
                <h1
                  className="font-zen-dots text-3xl md:text-5xl lg:text-6xl px-2"
                  style={{ color: '#014263' }}
                >
                  {t.title}
                </h1>

                <div className="space-y-4 flex flex-col items-center">
                  <p
                    className="text-lg md:text-xl lg:text-2xl max-w-3xl"
                    style={{
                      color: '#5B5B5B',
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: '300',
                      lineHeight: '1.6',
                    }}
                  >
                    {t.intro}
                  </p>

                  <AnimatePresence>
                    {currentSlide === 'history' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: 20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{
                          duration: 0.3,
                          ease: 'easeOut' as import('framer-motion').Easing,
                        }}
                        className="overflow-hidden max-w-3xl"
                      >
                        <p
                          className="text-lg md:text-xl lg:text-2xl pt-2"
                          style={{
                            color: '#5B5B5B',
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: '300',
                            lineHeight: '1.6',
                          }}
                        >
                          {t.history}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Slide 3: Values */}
            {currentSlide === 'values' && (
              <motion.div
                key="values"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full flex flex-col items-center gap-12"
              >
                <h2
                  className="font-zen-dots text-3xl md:text-5xl lg:text-6xl text-center px-2"
                  style={{ color: '#014263' }}
                >
                  {t.valuesTitle}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl">
                  {t.values.map((value, idx) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: idx * 0.1,
                        duration: 0.4,
                        ease: 'easeOut' as import('framer-motion').Easing,
                      }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="p-6 md:p-8 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden group shadow-lg"
                      style={{
                        background: value.gradient,
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      }}
                    >
                      {/* Camada de brilho ao passar o mouse */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <h3
                        className="font-zen-dots text-xl md:text-2xl mb-3 md:mb-4 relative z-10"
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      >
                        {value.title}
                      </h3>
                      <p
                        className="text-sm md:text-base leading-relaxed text-center relative z-10"
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: '400',
                        }}
                      >
                        {value.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Slide 4: Partners */}
            {currentSlide === 'partners' && (
              <motion.div
                key="partners"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full flex flex-col items-center gap-8"
              >
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl text-center px-2"
                  style={{
                    color: '#5B5B5B',
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: '400',
                  }}
                >
                  {t.partnersTitle}
                </h3>

                <div className="flex flex-wrap justify-center gap-8 items-center">
                  {displayPartners.length === 0 ? (
                    <p className="text-[#5B5B5B] text-lg font-roboto font-light mt-4">
                      {t.emptyPartners}
                    </p>
                  ) : (
                    displayPartners.map((partner) => (
                      <motion.div
                        key={partner.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05, duration: 0.25 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={partner.src}
                          alt={partner.name}
                          width={partner.width}
                          height={partner.height}
                          className="w-[120px] md:w-auto h-auto object-contain"
                          unoptimized
                        />
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Triggers invisíveis: Marcam as seções no scroll e criam a altura real da seção */}
      <div className="relative w-full -mt-[100vh] pointer-events-none z-0">
        <div className="w-full h-[50vh]" />
        <div ref={introRef} data-slide="intro" className="w-full h-[60vh]" />
        <div ref={historyRef} data-slide="history" className="w-full h-[60vh]" />
        <div ref={valuesRef} data-slide="values" className="w-full h-[60vh]" />
        <div ref={partnersRef} data-slide="partners" className="w-full h-[80vh]" />
      </div>
    </div>
  );
}
