'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

const translations = {
  PT: {
    solutions: [
      {
        title: 'Experiências Imersivas & Educação Tecnológica',
        description:
          'Experiências imersivas e interativas que unem tecnologia, aprendizado e inovação.',
        imageUrl: '/img/card_case_1.png',
        gradient: 'from-[#013149]/90 via-[#013149]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'ENGENHARIA DE SOFTWARE',
        description:
          'Criamos sistemas, sites e aplicativos sob medida, focados em performance e escalabilidade.',
        imageUrl: '/img/card_case_2.png',
        gradient: 'from-[#0a192f]/90 via-[#0a192f]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Design & Experiência',
        description: 'Interfaces modernas e intuitivas, com foco em usabilidade e impacto visual.',
        imageUrl: '/img/card_case_3.png',
        gradient: 'from-[#0f172a]/90 via-[#0f172a]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Tecnologia para Segurança e Investigação',
        description:
          'Apoio tecnológico avançado para resolução de crimes, análise de dados e extração de informações cruciais.',
        imageUrl: '/img/card_case_4.png',
        gradient: 'from-[#014263]/90 via-[#014263]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Inovação & Soluções Inteligentes',
        description:
          'Criação de soluções tecnológicas para negócios e cidades, envolvendo automação de processos e análise de dados.',
        imageUrl: '/img/card_case_5.png',
        gradient: 'from-[#0a192f]/90 via-[#0a192f]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Modelagem e Simulação 3D',
        description:
          'Construção de ambientes virtuais, reconstrução de cenários e simulações técnicas para análise.',
        imageUrl: '/img/card_case_6.png',
        gradient: 'from-[#0f172a]/90 via-[#0f172a]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
    ],
  },
  EN: {
    solutions: [
      {
        title: 'Immersive Experiences & Tech Education',
        description:
          'Immersive and interactive experiences that unite technology, learning, and innovation.',
        imageUrl: '/img/card_case_1.png',
        gradient: 'from-[#013149]/90 via-[#013149]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'SOFTWARE ENGINEERING',
        description:
          'We build custom systems, websites, and apps focused on performance and scalability.',
        imageUrl: '/img/card_case_2.png',
        gradient: 'from-[#0a192f]/90 via-[#0a192f]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Design & Experience',
        description: 'Modern and intuitive interfaces, focusing on usability and visual impact.',
        imageUrl: '/img/card_case_3.png',
        gradient: 'from-[#0f172a]/90 via-[#0f172a]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Technology for Security and Investigation',
        description:
          'Advanced tech support for solving crimes, data analysis, and crucial information extraction.',
        imageUrl: '/img/card_case_4.png',
        gradient: 'from-[#014263]/90 via-[#014263]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Innovation & Smart Solutions',
        description:
          'Creating technological solutions for businesses and cities, including process automation and data analysis.',
        imageUrl: '/img/card_case_5.png',
        gradient: 'from-[#0a192f]/90 via-[#0a192f]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: '3D Modeling and Simulation',
        description:
          'Construction of virtual environments, scenario reconstruction, and technical simulations for analysis.',
        imageUrl: '/img/card_case_6.png',
        gradient: 'from-[#0f172a]/90 via-[#0f172a]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
    ],
  },
  ES: {
    solutions: [
      {
        title: 'Experiencias Inmersivas y Educación Tecnológica',
        description:
          'Experiencias inmersivas e interactivas que unen tecnología, aprendizaje e innovación.',
        imageUrl: '/img/card_case_1.png',
        gradient: 'from-[#013149]/90 via-[#013149]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'INGENIERÍA DE SOFTWARE',
        description:
          'Creamos sistemas, sitios y aplicaciones a medida, enfocados en rendimiento y escalabilidad.',
        imageUrl: '/img/card_case_2.png',
        gradient: 'from-[#0a192f]/90 via-[#0a192f]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Diseño y Experiencia',
        description:
          'Interfaces modernas e intuitivas, con un enfoque en usabilidad e impacto visual.',
        imageUrl: '/img/card_case_3.png',
        gradient: 'from-[#0f172a]/90 via-[#0f172a]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Tecnología para Seguridad e Investigación',
        description:
          'Apoyo tecnológico avanzado para la resolución de delitos, análisis de datos y extracción de información crucial.',
        imageUrl: '/img/card_case_4.png',
        gradient: 'from-[#014263]/90 via-[#014263]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Innovación y Soluciones Inteligentes',
        description:
          'Creación de soluciones tecnológicas para empresas y ciudades, incluyendo automatización de procesos y análisis de datos.',
        imageUrl: '/img/card_case_5.png',
        gradient: 'from-[#0a192f]/90 via-[#0a192f]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Modelado y Simulación 3D',
        description:
          'Construcción de entornos virtuales, reconstrucción de escenarios y simulaciones técnicas para análisis.',
        imageUrl: '/img/card_case_6.png',
        gradient: 'from-[#0f172a]/90 via-[#0f172a]/35 via-45% to-transparent',
        colSpan: 'lg:col-span-1',
      },
    ],
  },
};

export function SolutionsSection() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const sectionTitle =
    lang === 'EN'
      ? 'Technological Solutions'
      : lang === 'ES'
        ? 'Soluciones Tecnológicas'
        : 'Soluções Tecnológicas';
  const sectionDescription =
    lang === 'EN'
      ? 'We unite software engineering, 3D modeling, and virtual immersion to create smart solutions that transform businesses, governments, and cities.'
      : lang === 'ES'
        ? 'Unimos ingeniería de software, modelado 3D e inmersión virtual para crear soluciones inteligentes que transforman empresas, gobiernos y ciudades.'
        : 'Unimos engenharia de software, modelagem 3D e imersão virtual para criar soluções inteligentes que transformam empresas, governos e cidades.';

  return (
    <section
      className="relative w-full py-[55px] md:py-[89px] lg:py-[110px] bg-white overflow-hidden"
      id="solucoes"
    >
      {/* Decorative gradient (Smooth GPU-composited radial gradients) */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #eff6ff 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f1f5f9 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Split Header */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-[34px] md:mb-[55px]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
        >
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2
              className="font-zen-dots text-[#014263] text-balance"
              style={{
                fontSize: 'clamp(1.618rem, 3.5vw, 2.618rem)',
                lineHeight: 1.22,
              }}
            >
              {sectionTitle}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm md:text-base text-[#475569] font-roboto font-normal leading-relaxed lg:border-l-2 lg:border-[#014263]/20 lg:pl-5">
              {sectionDescription}
            </p>
          </div>
        </motion.div>

        {/* Smoothly Curved Notched Solution Cards Grid (No borders, fluid concave curves, 0px seam) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px] md:gap-[28px]">
          {t.solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              className={`group relative h-[385px] md:h-[395px] ${solution.colSpan}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              {/* Inner Container for Image & Text */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-end">
                {/* Background Image — Bright & Clear */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-100 group-hover:scale-105 transition-transform duration-700 z-0"
                  style={{ backgroundImage: `url('${solution.imageUrl}')` }}
                />

                {/* Subtle Bottom-Only Gradient for Text Legibility */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${solution.gradient} z-0 transition-opacity duration-500`}
                />

                {/* Top-left Minimalist White Index */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="font-zen-dots text-xs text-white/95 tracking-widest drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    0{index + 1}
                  </span>
                </div>

                {/* Bottom-left Text Content (With safe right-margin to prevent notch collision) */}
                <div className="relative z-10 flex flex-col gap-2 pt-6 pl-6 pb-6 pr-14 md:pt-7 md:pl-7 md:pb-7 md:pr-16 transform group-hover:-translate-y-1 transition-transform duration-500">
                  <h3
                    className="font-roboto-condensed font-bold uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                    style={{
                      fontSize: 'clamp(1.125rem, 2vw, 1.45rem)',
                      lineHeight: 1.25,
                    }}
                  >
                    {solution.title}
                  </h3>
                  <p className="text-white/95 font-roboto font-light text-sm leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] max-w-[88%]">
                    {solution.description}
                  </p>
                </div>
              </div>

              {/* Bottom-right Liquid Curved Cutout (Compact & Refined, 0px seam, unclipped circular button) */}
              <div className="absolute -bottom-[2px] -right-[2px] z-20 bg-white pt-2.5 pl-2.5 pr-[2px] pb-[2px] rounded-tl-[22px]">
                {/* Top-right concave curve fillet */}
                <div
                  className="absolute -top-[18px] right-0 w-[20px] h-[20px] overflow-hidden pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-full h-full rounded-br-[18px] shadow-[0_0_0_16px_#ffffff]" />
                </div>

                {/* Bottom-left concave curve fillet */}
                <div
                  className="absolute bottom-0 -left-[18px] w-[20px] h-[20px] overflow-hidden pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-full h-full rounded-br-[18px] shadow-[0_0_0_16px_#ffffff]" />
                </div>

                <Link
                  href="#contato"
                  aria-label={solution.title}
                  className="w-[40px] h-[40px] rounded-full bg-[#014263] text-white group-hover:bg-[#00D9FF] group-hover:text-[#010D13] group-hover:scale-105 flex items-center justify-center shadow-md transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Acessar Solução</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H8M17 7V16"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
