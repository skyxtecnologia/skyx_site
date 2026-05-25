'use client';

import { type Variants, motion } from 'framer-motion';
import Image from 'next/image';

const translations = {
  PT: {
    title: 'O que fazemos',
    cards: [
      {
        title: 'Experiências Imersivas & Educação Tecnológica',
        description:
          'Experiências imersivas e interativas que unem tecnologia, aprendizado e inovação.',
        alt: 'Experiências imersivas',
      },
      {
        title: 'Engenharia de\nSoftware',
        description:
          'Criamos sistemas, sites e aplicativos sob medida, focados em performance e escalabilidade.',
        alt: 'Engenharia de software',
      },
      {
        title: 'Design & Experiência',
        description: 'Interfaces modernas e intuitivas, com foco em usabilidade e impacto visual.',
        alt: 'Design e experiência',
      },
      {
        title: 'Tecnologia para Segurança e Investigação',
        description: '',
        alt: 'Segurança e investigação',
      },
      {
        title: 'Inovação & Soluções Inteligentes',
        description:
          'Criação de soluções tecnológicas para negócios e cidades, envolvendo automação de processos, análise de dados e desenvolvimento de projetos voltados a ambientes inteligentes.',
        alt: 'Inovação e soluções',
      },
      {
        title: 'Modelagem e Simulação 3D',
        description:
          'Construção de ambientes virtuais, reconstrução de cenários e simulações técnicas para análise, apresentação e suporte a tomadas de decisão.',
        alt: 'Modelagem 3D',
      },
    ],
  },
  EN: {
    title: 'What we do',
    cards: [
      {
        title: 'Immersive Experiences & Tech Education',
        description:
          'Immersive and interactive experiences that unite technology, learning, and innovation.',
        alt: 'Immersive experiences',
      },
      {
        title: 'Software\nEngineering',
        description:
          'We build tailor-made systems, websites, and apps focused on performance and scalability.',
        alt: 'Software engineering',
      },
      {
        title: 'Design & Experience',
        description: 'Modern and intuitive interfaces with a focus on usability and visual impact.',
        alt: 'Design and experience',
      },
      {
        title: 'Technology for Security and Investigation',
        description: '',
        alt: 'Security and investigation',
      },
      {
        title: 'Innovation & Smart Solutions',
        description:
          'Creating technology solutions for businesses and cities, including process automation, data analysis, and projects aimed at intelligent environments.',
        alt: 'Innovation and solutions',
      },
      {
        title: '3D Modeling and Simulation',
        description:
          'Building virtual environments, scenario reconstruction, and technical simulations for analysis, presentation, and decision support.',
        alt: '3D modeling',
      },
    ],
  },
} as const;

interface CasesSectionProps {
  lang?: 'PT' | 'EN';
}

export function CasesSection({ lang = 'PT' }: CasesSectionProps) {
  const t = translations[lang];

  // Animação para o container controlar o atraso em cascata dos filhos
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Animação individual de cada card vindo de baixo
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section
      id="cases"
      className="relative w-full min-h-screen flex flex-col items-center bg-white py-24 px-6 md:px-12 overflow-hidden"
    >
      <div className="w-full max-w-[1050px] mx-auto flex flex-col items-center gap-6">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="px-4 py-2 rounded-md inline-flex justify-center items-center"
        >
          <h2
            className="text-center uppercase break-words"
            style={{
              color: '#013149',
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontFamily: "'Roboto Condensed', sans-serif",
              fontWeight: 400,
            }}
          >
            {t.title}
          </h2>
        </motion.div>

        {/* Grid de Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full justify-items-center"
        >
          {/* Card 1: Imersivas */}
          <motion.div
            variants={cardVariants}
            className="group relative w-full max-w-[335px] h-[372px] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <Image
              src="/img/card_case_1.png"
              alt={t.cards[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div
              className="absolute inset-0 p-6 flex flex-col justify-between items-start"
              style={{
                background:
                  'linear-gradient(360deg, rgba(255, 255, 255, 0) 6%, rgba(255, 255, 255, 0.7) 88%)',
              }}
            >
              <h3
                className="uppercase break-words w-full"
                style={{
                  color: '#014263',
                  fontSize: 'clamp(18px, 4vw, 22px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 400,
                  lineHeight: '1.2',
                }}
              >
                {t.cards[0].title}
              </h3>
              <p
                className="break-words w-full"
                style={{
                  color: '#014263',
                  fontSize: 'clamp(10px, 3vw, 12px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 300,
                  lineHeight: '1.5',
                }}
              >
                {t.cards[0].description}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Software */}
          <motion.div
            variants={cardVariants}
            className="group relative w-full max-w-[335px] h-[372px] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <Image
              src="/img/card_case_2.png"
              alt={t.cards[1].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div
              className="absolute inset-0 p-6 flex flex-col justify-between items-center"
              style={{
                background:
                  'linear-gradient(358deg, rgba(1, 66, 99, 0.7) 6%, rgba(1, 66, 99, 0) 42%, rgba(1, 66, 99, 0) 70%, rgba(1, 66, 99, 0.7) 94%)',
              }}
            >
              <h3
                className="uppercase text-right break-words w-full"
                style={{
                  color: 'white',
                  fontSize: 'clamp(18px, 4vw, 24px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 300,
                  lineHeight: '1.2',
                  whiteSpace: 'pre-line',
                }}
              >
                {t.cards[1].title}
              </h3>
              <p
                className="text-left break-words w-full"
                style={{
                  color: 'white',
                  fontSize: 'clamp(10px, 3vw, 12px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 400,
                }}
              >
                {t.cards[1].description}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Design */}
          <motion.div
            variants={cardVariants}
            className="group relative w-full max-w-[335px] h-[372px] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <Image
              src="/img/card_case_3.png"
              alt={t.cards[2].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div
              className="absolute inset-0 p-6 flex flex-col justify-end items-end gap-2"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 72%)',
              }}
            >
              <h3
                className="uppercase text-right break-words w-full"
                style={{
                  color: '#014263',
                  fontSize: 'clamp(16px, 4vw, 20px)',
                  fontFamily: "'Roboto Condensed', sans-serif",
                  fontWeight: 400,
                }}
              >
                {t.cards[2].title}
              </h3>
              <p
                className="text-right break-words w-full"
                style={{
                  color: '#014263',
                  fontSize: 'clamp(10px, 3vw, 12px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 400,
                  lineHeight: '1.5',
                }}
              >
                {t.cards[2].description}
              </p>
            </div>
          </motion.div>

          {/* Card 4: Segurança */}
          <motion.div
            variants={cardVariants}
            className="group relative w-full max-w-[335px] h-[372px] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <Image
              src="/img/card_case_4.png"
              alt={t.cards[3].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div
              className="absolute inset-0 p-6 flex flex-col justify-end items-start gap-2"
              style={{
                background:
                  'linear-gradient(360deg, rgba(1, 66, 99, 0.9) 15%, rgba(255, 255, 255, 0) 63%)',
              }}
            >
              <h3
                className="uppercase break-words w-full drop-shadow-md"
                style={{
                  color: 'white',
                  fontSize: 'clamp(16px, 4vw, 20px)',
                  fontFamily: "'Roboto Condensed', sans-serif",
                  fontWeight: 400,
                }}
              >
                {t.cards[3].title}
              </h3>
            </div>
          </motion.div>

          {/* Card 5: Inovação */}
          <motion.div
            variants={cardVariants}
            className="group relative w-full max-w-[335px] h-[372px] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <Image
              src="/img/card_case_5.png"
              alt={t.cards[4].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div
              className="absolute inset-0 p-6 flex flex-col justify-end items-start gap-3"
              style={{ background: 'linear-gradient(2deg, #307198 9%, rgba(16, 130, 186, 0) 41%)' }}
            >
              <h3
                className="uppercase break-words w-full drop-shadow-md"
                style={{
                  color: 'white',
                  fontSize: 'clamp(18px, 4vw, 22px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 400,
                }}
              >
                {t.cards[4].title}
              </h3>
              <p
                className="break-words w-full"
                style={{
                  color: 'white',
                  fontSize: 'clamp(10px, 3vw, 12px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 300,
                }}
              >
                {t.cards[4].description}
              </p>
            </div>
          </motion.div>

          {/* Card 6: 3D */}
          <motion.div
            variants={cardVariants}
            className="group relative w-full max-w-[335px] h-[372px] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <Image
              src="/img/card_case_6.png"
              alt={t.cards[5].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div
              className="absolute inset-0 p-6 flex flex-col justify-between items-center"
              style={{ background: 'linear-gradient(360deg, #014263 0%, rgba(1, 66, 99, 0) 32%)' }}
            >
              <h3
                className="uppercase text-center break-words w-full drop-shadow-md"
                style={{
                  color: 'white',
                  fontSize: 'clamp(16px, 4vw, 20px)',
                  fontFamily: "'Roboto Condensed', sans-serif",
                  fontWeight: 200,
                }}
              >
                {t.cards[5].title}
              </h3>
              <p
                className="text-center break-words w-full drop-shadow-sm"
                style={{
                  color: 'white',
                  fontSize: 'clamp(10px, 3vw, 12px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 300,
                }}
              >
                {t.cards[5].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
