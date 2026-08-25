'use client';

import { type Variants, animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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
        label: 'Pessoas Imersas',
        sub: 'Experimentaram nossa Cápsula de VR',
        value: 3000,
        suffix: '+',
      },
      { label: 'Anos de Inovação', sub: 'Construindo o futuro com solidez', value: 2, suffix: '' },
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
      { label: 'Immersed People', sub: 'Experienced our VR Capsule', value: 3000, suffix: '+' },
      { label: 'Years of Innovation', sub: 'Building the future solidly', value: 2, suffix: '' },
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
        label: 'Personas Inmersas',
        sub: 'Experimentaron nuestra Cápsula de VR',
        value: 3000,
        suffix: '+',
      },
      {
        label: 'Años de Innovación',
        sub: 'Construyendo el futuro con solidez',
        value: 2,
        suffix: '',
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

function AnimatedNumber({ value, suffix = '', darkMode = false }: { value: number; suffix?: string; darkMode?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: false, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (val) => setDisplayValue(Math.floor(val)),
      });
      return controls.stop;
    }
  }, [inView, value]);

  return (
    <h3 ref={ref} className={`text-5xl md:text-6xl font-zen-dots mb-2 drop-shadow-sm ${darkMode ? 'text-white' : 'text-[#014263]'}`}>
      {suffix === '+' ? `+${displayValue}` : displayValue}
    </h3>
  );
}

interface AboutSectionProps {
  lang?: 'PT' | 'EN' | 'ES';
}

export function AboutSection({ lang = 'PT' }: AboutSectionProps) {
  const t = translations[lang];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <section
      id="sobre"
      className="relative w-full min-h-screen bg-white py-24 md:py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#eef2fc] to-white rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Intro & History Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            variants={fadeInUp}
            className="flex flex-col gap-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 self-start">
              <span className="text-xs font-roboto font-medium tracking-widest text-[#014263] uppercase">
                Sobre a SkyX
              </span>
            </div>

            <h2 className="font-zen-dots text-3xl md:text-4xl lg:text-5xl text-[#014263] leading-tight">
              {t.title}
            </h2>

            <p className="text-lg md:text-xl text-gray-600 font-roboto font-light leading-relaxed">
              {t.intro}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            variants={fadeInUp}
            className="bg-[#010D13] p-8 rounded-[2rem] border border-[#013149] shadow-2xl relative"
          >
            {/* Subtle quotation or accent mark */}
            <div className="absolute -top-5 -left-5 w-10 h-10 bg-[#00d9ff] rounded-xl flex items-center justify-center rotate-12 shadow-lg">
              <svg className="w-5 h-5 text-[#010D13]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                <title>Quotation mark</title>
              </svg>
            </div>
            <p className="text-base md:text-lg text-gray-300 font-roboto font-light leading-relaxed">
              {t.history}
            </p>
          </motion.div>
        </div>

        {/* Impact Area (Integrated into About) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px' }}
          variants={fadeInUp}
          className="mb-24 bg-gradient-to-br from-[#010D13] to-[#013149] border border-[#67a7d5]/20 rounded-3xl p-8 md:p-12 shadow-[0_20px_40px_rgba(1,66,99,0.15)] relative overflow-hidden"
        >
          {/* Decorative light reflection on dark card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d9ff]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="text-center mb-10 relative z-10">
            <h3 className="font-zen-dots text-2xl md:text-3xl text-white mb-2">
              {t.impactTitle}
            </h3>
            <p className="text-gray-300 font-roboto font-light text-sm md:text-base">
              {t.impactDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10">
            {t.stats.map((stat, idx) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} darkMode={true} />
                <p className="text-lg md:text-xl text-[#67a7d5] font-roboto font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-400 font-roboto font-light">{stat.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values Area */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h3 className="font-zen-dots text-2xl md:text-3xl text-[#014263]">{t.valuesTitle}</h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.values.map((value, idx) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(1,66,99,0.2)' }}
                className="bg-[#010D13] p-6 md:p-8 rounded-3xl border border-[#013149] shadow-2xl flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#013149]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-14 h-14 rounded-2xl bg-[#013149] text-[#00d9ff] flex items-center justify-center mb-5 relative z-10">
                  {value.icon}
                </div>
                <h4 className="font-zen-dots text-lg text-white mb-3 relative z-10">{value.title}</h4>
                <p className="text-gray-400 font-roboto font-light text-sm leading-relaxed relative z-10">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
