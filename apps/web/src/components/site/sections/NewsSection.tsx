'use client';

import { type Variants, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: {
    title: 'Ultimas noticias',
    emptyMsg: 'Novas notícias serão publicadas em breve.',
    loadingMsg: 'Carregando notícias...',
  },
  EN: {
    title: 'Latest news',
    emptyMsg: 'New articles will be published soon.',
    loadingMsg: 'Loading news...',
  },
} as const;

interface NewsSectionProps {
  lang?: 'PT' | 'EN';
}

export function NewsSection({ lang = 'PT' }: NewsSectionProps) {
  const t = translations[lang];

  // Busca dados dinâmicos do Banco de Dados
  const [dbNews, setDbNews] = useState<
    {
      id: string | number;
      title: string;
      description: string;
      image: string | null;
      link?: string | null;
      isFeatured?: boolean;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsFromDB = async () => {
      try {
        const res = await api.get('/api/news');
        const newsData = res.data;
        if (newsData && newsData.length > 0) {
          // Prioriza os que estão marcados como destaque, ou puxa todos
          const featured = newsData.filter((n: { isFeatured: boolean }) => n.isFeatured);
          const newsToShow = featured.length > 0 ? featured : newsData;
          setDbNews(newsToShow);
        }
      } catch (err) {
        console.error('Erro ao buscar notícias do banco de dados:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsFromDB();
  }, []);

  const finalNews = dbNews;

  // Animação do contêiner para o efeito cascata
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Animação individual dos cards vindo de baixo
  const cardVariants: Variants = {
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

        {isLoading ? (
          <div className="flex justify-center items-center w-full min-h-[200px]">
            <p className="text-[#013149] text-lg font-roboto animate-pulse">{t.loadingMsg}</p>
          </div>
        ) : finalNews.length === 0 ? (
          <div className="flex justify-center items-center w-full min-h-[200px]">
            <p className="text-[#5B5B5B] text-lg font-roboto font-light">{t.emptyMsg}</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full justify-items-center"
          style={{ gap: '16px' }}
        >
          {/* Exibe no máximo 6 notícias */}
          {finalNews.slice(0, 6).map((news, index) => {
            return (
              <motion.a
                key={news.id}
                href={news.link || '#'}
                target={news.link && news.link !== '#' ? '_blank' : '_self'}
                rel="noreferrer"
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
                    src={
                      news.image ||
                      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=350&fit=crop'
                    }
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
              </motion.a>
            );
          })}
        </motion.div>
        )}
      </div>
    </section>
  );
}
