'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  PT: {
    tag: 'O QUE FAZEMOS',
    solutions: [
      {
        title: 'Experiências Imersivas & Educação Tecnológica',
        description:
          'Experiências imersivas e interativas que unem tecnologia, aprendizado e inovação.',
        imageUrl: '/img/card_case_1.png',
        gradient: 'from-[#013149]/95 via-[#013149]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'ENGENHARIA DE SOFTWARE',
        description:
          'Criamos sistemas, sites e aplicativos sob medida, focados em performance e escalabilidade.',
        imageUrl: '/img/card_case_2.png',
        gradient: 'from-[#0a192f]/95 via-[#0a192f]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Design & Experiência',
        description: 'Interfaces modernas e intuitivas, com foco em usabilidade e impacto visual.',
        imageUrl: '/img/card_case_3.png',
        gradient: 'from-[#0f172a]/95 via-[#0f172a]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Tecnologia para Segurança e Investigação',
        description:
          'Apoio tecnológico avançado para resolução de crimes, análise de dados e extração de informações cruciais.',
        imageUrl: '/img/card_case_4.png',
        gradient: 'from-[#014263]/95 via-[#014263]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Inovação & Soluções Inteligentes',
        description:
          'Criação de soluções tecnológicas para negócios e cidades, envolvendo automação de processos e análise de dados.',
        imageUrl: '/img/card_case_5.png',
        gradient: 'from-[#0a192f]/95 via-[#0a192f]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Modelagem e Simulação 3D',
        description:
          'Construção de ambientes virtuais, reconstrução de cenários e simulações técnicas para análise.',
        imageUrl: '/img/card_case_6.png',
        gradient: 'from-[#0f172a]/95 via-[#0f172a]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
    ],
  },
  EN: {
    tag: 'WHAT WE DO',
    solutions: [
      {
        title: 'Immersive Experiences & Tech Education',
        description:
          'Immersive and interactive experiences that unite technology, learning, and innovation.',
        imageUrl: '/img/card_case_1.png',
        gradient: 'from-[#013149]/95 via-[#013149]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'SOFTWARE ENGINEERING',
        description:
          'We build custom systems, websites, and apps focused on performance and scalability.',
        imageUrl: '/img/card_case_2.png',
        gradient: 'from-[#0a192f]/95 via-[#0a192f]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Design & Experience',
        description: 'Modern and intuitive interfaces, focusing on usability and visual impact.',
        imageUrl: '/img/card_case_3.png',
        gradient: 'from-[#0f172a]/95 via-[#0f172a]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Technology for Security and Investigation',
        description:
          'Advanced tech support for solving crimes, data analysis, and crucial information extraction.',
        imageUrl: '/img/card_case_4.png',
        gradient: 'from-[#014263]/95 via-[#014263]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Innovation & Smart Solutions',
        description:
          'Creating technological solutions for businesses and cities, including process automation and data analysis.',
        imageUrl: '/img/card_case_5.png',
        gradient: 'from-[#0a192f]/95 via-[#0a192f]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: '3D Modeling and Simulation',
        description:
          'Construction of virtual environments, scenario reconstruction, and technical simulations for analysis.',
        imageUrl: '/img/card_case_6.png',
        gradient: 'from-[#0f172a]/95 via-[#0f172a]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
    ],
  },
  ES: {
    tag: 'QUÉ HACEMOS',
    solutions: [
      {
        title: 'Experiencias Inmersivas y Educación Tecnológica',
        description:
          'Experiencias inmersivas e interactivas que unen tecnología, aprendizaje e innovación.',
        imageUrl: '/img/card_case_1.png',
        gradient: 'from-[#013149]/95 via-[#013149]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'INGENIERÍA DE SOFTWARE',
        description:
          'Creamos sistemas, sitios y aplicaciones a medida, enfocados en rendimiento y escalabilidad.',
        imageUrl: '/img/card_case_2.png',
        gradient: 'from-[#0a192f]/95 via-[#0a192f]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Diseño y Experiencia',
        description:
          'Interfaces modernas e intuitivas, con un enfoque en usabilidad e impacto visual.',
        imageUrl: '/img/card_case_3.png',
        gradient: 'from-[#0f172a]/95 via-[#0f172a]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Tecnología para Seguridad e Investigación',
        description:
          'Apoyo tecnológico avanzado para la resolución de delitos, análisis de datos y extracción de información crucial.',
        imageUrl: '/img/card_case_4.png',
        gradient: 'from-[#014263]/95 via-[#014263]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Innovación y Soluciones Inteligentes',
        description:
          'Creación de soluciones tecnológicas para empresas y ciudades, incluyendo automatización de procesos y análisis de datos.',
        imageUrl: '/img/card_case_5.png',
        gradient: 'from-[#0a192f]/95 via-[#0a192f]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
      {
        title: 'Modelado y Simulación 3D',
        description:
          'Construcción de entornos virtuales, reconstrucción de escenarios y simulaciones técnicas para análisis.',
        imageUrl: '/img/card_case_6.png',
        gradient: 'from-[#0f172a]/95 via-[#0f172a]/70 to-transparent',
        colSpan: 'lg:col-span-1',
      },
    ],
  },
};

export function SolutionsSection() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section className="relative w-full py-32 bg-white overflow-hidden" id="solucoes">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6">
            <h2 className="text-xl md:text-2xl font-roboto-condensed font-bold uppercase tracking-[0.2em] text-[#014263] drop-shadow-sm">
              {t.tag}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              className={`group relative bg-[#010D13] border border-[#013149] rounded-2xl overflow-hidden hover:border-[#67a7d5]/80 hover:shadow-[0_20px_50px_rgba(1,66,99,0.3)] transition-all duration-500 h-[380px] flex flex-col justify-end p-8 ${solution.colSpan}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700 z-0"
                style={{ backgroundImage: `url('${solution.imageUrl}')` }}
              />

              {/* Card Background Overlay (Gradient fading up, mostly for the text area) */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${solution.gradient} z-0 opacity-100 group-hover:opacity-90 transition-opacity duration-500`}
                style={{ backgroundSize: '100% 120%', backgroundPosition: 'bottom' }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-2xl font-roboto-condensed font-bold uppercase text-white leading-tight drop-shadow-lg">
                  {solution.title}
                </h3>
                <p className="text-gray-200 font-roboto font-light text-sm leading-relaxed drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                  {solution.description}
                </p>
              </div>

              {/* Interactive glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-[#67a7d5]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
