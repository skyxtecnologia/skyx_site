'use client';

import { SpotlightCard } from '@/components/ui';
import { type Variants, animate, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const translations = {
  PT: {
    title: 'Tecnologia que transforma',
    intro:
      'A Sky X Tecnologia desenvolve soluções digitais sob medida, unindo inovação, tecnologia e educação para criar projetos inteligentes, modernos e de alto impacto.',
    history:
      'Desde sua criação, a empresa vem evoluindo continuamente, ampliando sua atuação e explorando novas possibilidades dentro do universo tecnológico. Com foco em inovação e versatilidade, a Sky X se consolidou como uma parceira estratégica no desenvolvimento de soluções que acompanham as demandas do presente e antecipam as necessidades do futuro.',
    valuesTitle: 'Nossos valores',
    impactTitle: 'Nosso Impacto',
    impactDesc: 'Números que comprovam nossa excelência em tecnologia e imersão.',
    stats: [
      {
        label: 'PESSOAS IMERSAS',
        sub: 'Em nossa tecnologia',
        value: 65,
        suffix: '+',
        unit: ' mil',
      },
      {
        label: 'ANOS DE INOVAÇÃO',
        sub: 'Construindo o futuro com solidez',
        value: 2,
        suffix: '+',
        unit: '',
      },
    ],
    values: [
      {
        title: 'Inovação',
        description:
          'Buscamos constantemente novas ideias e tecnologias para criar soluções que vão além do convencional.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
            <title>Inovação</title>
          </svg>
        ),
      },
      {
        title: 'Parceria',
        description:
          'Trabalhamos lado a lado com nossos clientes, entendendo suas necessidades para entregar soluções sob medida.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <title>Parceria</title>
          </svg>
        ),
      },
      {
        title: 'Eficiência',
        description:
          'Desenvolvemos projetos inteligentes, com foco em performance, qualidade e resultados reais.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
            <title>Eficiência</title>
          </svg>
        ),
      },
      {
        title: 'Versatilidade',
        description:
          'Atuamos em diferentes áreas da tecnologia, adaptando soluções para diversos cenários e desafios.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
            />
            <title>Versatilidade</title>
          </svg>
        ),
      },
    ],
  },
  EN: {
    title: 'Technology that transforms',
    intro:
      'Sky X Technology develops tailor-made digital solutions, uniting innovation, technology, and education to create smart, modern, and high-impact projects.',
    history:
      'Since its creation, the company has been continuously evolving, expanding its operations, and exploring new possibilities within the technological universe. With a focus on innovation and versatility, Sky X has consolidated itself as a strategic partner in developing solutions that meet present demands and anticipate future needs.',
    valuesTitle: 'Our values',
    impactTitle: 'Our Impact',
    impactDesc: 'Numbers that prove our excellence in technology and immersion.',
    stats: [
      {
        label: 'IMMERSED PEOPLE',
        sub: 'In our technology',
        value: 65,
        suffix: '+',
        unit: 'k',
      },
      {
        label: 'YEARS OF INNOVATION',
        sub: 'Building the future solidly',
        value: 2,
        suffix: '+',
        unit: '',
      },
    ],
    values: [
      {
        title: 'Innovation',
        description:
          'We constantly seek new ideas and technologies to create solutions that go beyond the conventional.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
            <title>Innovation</title>
          </svg>
        ),
      },
      {
        title: 'Partnership',
        description:
          'We work side by side with our clients, understanding their needs to deliver tailored solutions.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <title>Partnership</title>
          </svg>
        ),
      },
      {
        title: 'Efficiency',
        description:
          'We develop intelligent projects, focusing on performance, quality, and real results.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
            <title>Efficiency</title>
          </svg>
        ),
      },
      {
        title: 'Versatility',
        description:
          'We operate in different areas of technology, adapting solutions for various scenarios and challenges.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
            />
            <title>Versatility</title>
          </svg>
        ),
      },
    ],
  },
  ES: {
    title: 'Tecnología que transforma',
    intro:
      'Sky X Tecnología desarrolla soluciones digitales a medida, uniendo innovación, tecnología y educación para crear proyectos inteligentes, modernos y de alto impacto.',
    history:
      'Desde su creación, la empresa ha evolucionado continuamente, ampliando su actuación y explorando nuevas posibilidades dentro del universo tecnológico. Con enfoque en innovación y versatilidad, Sky X se ha consolidado como un socio estratégico en el desarrollo de soluciones que acompañan las demandas del presente y anticipan las necesidades del futuro.',
    valuesTitle: 'Nuestros valores',
    impactTitle: 'Nuestro Impacto',
    impactDesc: 'Números que prueban nuestra excelencia en tecnología e inmersión.',
    stats: [
      {
        label: 'PERSONAS INMERSAS',
        sub: 'En nuestra tecnología',
        value: 65,
        suffix: '+',
        unit: ' mil',
      },
      {
        label: 'AÑOS DE INNOVACIÓN',
        sub: 'Construyendo el futuro con solidez',
        value: 2,
        suffix: '+',
        unit: '',
      },
    ],
    values: [
      {
        title: 'Innovación',
        description:
          'Buscamos constantemente nuevas ideas y tecnologías para crear soluciones que van más allá de lo convencional.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
            <title>Innovación</title>
          </svg>
        ),
      },
      {
        title: 'Asociación',
        description:
          'Trabajamos codo a codo con nuestros clientes, entendiendo sus necesidades para entregar soluciones a medida.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <title>Asociación</title>
          </svg>
        ),
      },
      {
        title: 'Eficiencia',
        description:
          'Desarrollamos proyectos inteligentes, enfocándonos en el rendimiento, la calidad y los resultados reales.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
            <title>Eficiencia</title>
          </svg>
        ),
      },
      {
        title: 'Versatilidad',
        description:
          'Operamos en diferentes áreas de la tecnología, adaptando soluciones para diversos escenarios y desafíos.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
            />
            <title>Versatilidad</title>
          </svg>
        ),
      },
    ],
  },
};

function AnimatedNumber({
  value,
  suffix = '',
  unit = '',
  darkMode = false,
}: {
  value: number;
  suffix?: string;
  unit?: string;
  darkMode?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (inView && ref.current) {
      const element = ref.current;
      const duration = value <= 5 ? 1.0 : 1.5;
      const controls = animate(0, value, {
        duration,
        ease: value <= 5 ? 'easeOut' : [0.16, 1, 0.3, 1],
        onUpdate: (val) => {
          const rounded = Math.round(val);
          element.textContent = suffix === '+' ? `+${rounded}${unit}` : `${rounded}${unit}`;
        },
      });
      return controls.stop;
    }
  }, [inView, value, suffix, unit]);

  return (
    <h3
      ref={ref}
      className={`text-3xl md:text-4xl font-zen-dots mb-1.5 drop-shadow-sm ${darkMode ? 'text-white' : 'text-[#014263]'}`}
    >
      {suffix === '+' ? `+0${unit}` : `0${unit}`}
    </h3>
  );
}

interface AboutSectionProps {
  lang?: 'PT' | 'EN' | 'ES';
}

export function AboutSection({ lang = 'PT' }: AboutSectionProps) {
  const t = translations[lang];
  const trajectoryCta =
    lang === 'EN'
      ? 'Explore our journey'
      : lang === 'ES'
        ? 'Conocer nuestra trayectoria'
        : 'Conhecer nossa trajetória';

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const stat0 = t.stats[0] ?? {
    label: 'PESSOAS IMERSAS',
    sub: 'Em nossa tecnologia',
    value: 65,
    suffix: '+',
    unit: ' mil',
  };
  const stat1 = t.stats[1] ?? {
    label: 'ANOS DE INOVAÇÃO',
    sub: 'Construindo o futuro com solidez',
    value: 2,
    suffix: '+',
    unit: '',
  };

  return (
    <section
      id="sobre"
      className="relative w-full bg-white py-[55px] md:py-[89px] lg:py-[110px] overflow-hidden flex flex-col justify-center"
    >
      {/* Decorative background elements (Smooth GPU-composited radial gradients) */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, #e6f0fa 0%, rgba(240, 244, 255, 0.4) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] translate-y-1/3 -translate-x-1/3 opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, #eef2fc 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Top Asymmetric Bento (Editorial Left + Framed Showcase with Overlapping Metric Cards Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[34px] lg:gap-[55px] mb-[68px] md:mb-[110px] items-center">
          {/* Left Column: Editorial Story */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="lg:col-span-6 flex flex-col gap-[21px]"
          >
            <h2
              className="font-zen-dots text-[#014263] text-balance"
              style={{
                fontSize: 'clamp(1.618rem, 3.5vw, 2.618rem)',
                lineHeight: 1.22,
              }}
            >
              {t.title}
            </h2>

            <p className="text-base md:text-lg text-[#334155] font-roboto font-normal leading-relaxed">
              {t.intro}
            </p>

            <div className="border-l-2 border-[#014263] pl-5 py-1">
              <p className="text-sm md:text-base text-[#475569] font-roboto font-light leading-relaxed">
                {t.history}
              </p>
            </div>

            {/* Botão no Estilo Oficial SkyX (sem ícone "correto") */}
            <div className="pt-2">
              <Link
                href="/empresa"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#013149] to-[#000d13] text-white border border-white/10 font-roboto font-normal text-sm md:text-base tracking-wide hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all duration-300"
              >
                {trajectoryCta}
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Framed Showcase + Overlapping Metric Cards */}
          <motion.div
            id="impacto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="lg:col-span-6 relative scroll-mt-28 py-4 md:py-8"
          >
            {/* Central Framed Visual Panel with Contextual SkyX VR Capsule */}
            <div className="rounded-2xl overflow-hidden bg-[#011420] min-h-[390px] md:min-h-[440px] relative shadow-[0_20px_50px_rgba(1,49,73,0.16)] border border-[#013149]/40 group">
              {/* Contextual SkyX VR Capsule Image — Bright, Crisp & Seamless */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/img/card_case_1.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010D13]/30 to-transparent pointer-events-none" />
            </div>

            {/* Floating Metric Card 1 (Top Right — Soft Ice Tint, Proportional Radius) */}
            <div className="bg-[#f0f7ff] rounded-xl p-5 shadow-[0_15px_40px_rgba(1,66,99,0.12)] border border-[#67a7d5]/25 md:w-[260px] relative md:absolute md:-top-2 md:-right-4 z-20 mt-4 md:mt-0">
              <AnimatedNumber
                value={stat0.value}
                suffix={stat0.suffix}
                unit={stat0.unit}
                darkMode={false}
              />
              <p className="text-base md:text-lg text-[#014263] font-roboto-condensed font-bold uppercase tracking-wide mt-1 mb-0.5">
                {stat0.label}
              </p>
              <p className="text-xs md:text-sm text-[#475569] font-roboto font-normal">
                {stat0.sub}
              </p>
            </div>

            {/* Floating Metric Card 2 (Bottom Left — Deep Glass Dark, Proportional Radius) */}
            <div className="bg-[#010D13]/95 backdrop-blur-xl rounded-xl p-5 shadow-[0_15px_40px_rgba(1,13,19,0.35)] border border-[#013149] md:w-[260px] relative md:absolute md:-bottom-2 md:left-6 z-20 mt-4 md:mt-0">
              <AnimatedNumber value={stat1.value} suffix="+" unit={stat1.unit} darkMode={true} />
              <p className="text-base md:text-lg text-[#67a7d5] font-roboto-condensed font-bold uppercase tracking-wide mt-1 mb-0.5">
                {stat1.label}
              </p>
              <p className="text-xs md:text-sm text-gray-300 font-roboto font-light">{stat1.sub}</p>
            </div>
          </motion.div>
        </div>

        {/* Values Area */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-[34px] md:mb-[55px] flex flex-col items-center"
          >
            <h3
              className="font-zen-dots text-[#014263]"
              style={{
                fontSize: 'clamp(1.618rem, 3.5vw, 2.618rem)',
                lineHeight: 1.22,
              }}
            >
              {t.valuesTitle}
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[21px]"
          >
            {t.values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <SpotlightCard className="bg-[#010D13] p-[22px] md:p-[26px] rounded-xl border border-[#013149] hover:border-[#67a7d5]/60 shadow-xl flex flex-col items-start text-left transition-all duration-300 h-full">
                  <div className="w-full flex items-center justify-start mb-5 relative z-20">
                    <div className="w-12 h-12 rounded-lg bg-[#013149] border border-[#67a7d5]/25 text-[#00d9ff] flex items-center justify-center">
                      {value.icon}
                    </div>
                  </div>
                  <h4 className="font-zen-dots text-lg text-white mb-3 relative z-20">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 font-roboto font-light text-sm leading-relaxed relative z-20">
                    {value.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
