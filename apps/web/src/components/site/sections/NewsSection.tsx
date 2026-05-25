'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const translations = {
  PT: {
    title: 'Ultimas noticias',
    newsTitle: 'Tecnologia que transforma',
    newsDescription:
      'A Sky X Tecnologia desenvolve soluções digitais sob medida, unindo inovação, tecnologia e educação para criar projetos inteligentes, modernos e de alto impacto.',
  },
  EN: {
    title: 'Latest news',
    newsTitle: 'Technology that transforms',
    newsDescription:
      'Sky X Technology develops tailor-made digital solutions, uniting innovation, technology, and education to create smart, modern, and high-impact projects.',
  },
} as const;

interface NewsSectionProps {
  lang?: 'PT' | 'EN';
}

export function NewsSection({ lang = 'PT' }: NewsSectionProps) {
  const t = translations[lang];

  // Array de notícias para popular o grid
  const newsData = Array.from({ length: 6 }).map((_, index) => ({
    id: index + 1,
    title: t.newsTitle,
    description: t.newsDescription,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=350&fit=crop',
  }));

  // Animação do contêiner para o efeito cascata
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Animação individual dos cards vindo de baixo
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      id="news"
      className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center py-24"
    >
      <div className="w-full max-w-[1034px] flex flex-col items-center justify-center gap-8 px-4 md:px-6">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="px-2 py-1 rounded-md inline-flex justify-center items-center gap-[10px]"
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

        {/* Grid de Notícias */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full justify-items-center"
          style={{ gap: '16px' }}
        >
          {newsData.map((news, index) => {
            return (
              <motion.div
                key={news.id}
                variants={cardVariants}
                className="group w-full max-w-[334px] rounded-xl flex flex-col justify-start items-start gap-[10px] cursor-pointer hover:shadow-lg transition-all duration-300 bg-[#E6E6E6] hover:bg-[#014263]"
                style={{
                  height: '345px',
                  padding: '16px',
                }}
              >
                {/* Imagem */}
                <div
                  className="w-full rounded-2xl relative overflow-hidden shrink-0"
                  style={{ height: '212px', background: '#041E2B' }}
                >
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                </div>

                {/* Textos */}
                <div className="w-full flex flex-col justify-end items-start gap-2 mt-auto">
                  <h3
                    className="w-full break-words text-[#014263] group-hover:text-white transition-colors duration-300"
                    style={{
                      fontSize: 'clamp(14px, 4vw, 18px)',
                      fontFamily: "'Zen Dots', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {news.title}
                  </h3>
                  <p
                    className="w-full break-words line-clamp-3 text-[#5B5B5B] group-hover:text-white transition-colors duration-300"
                    style={{
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: 300,
                      lineHeight: '20px',
                    }}
                  >
                    {news.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
