'use client';

import { type Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: {
    title: 'Ultimas noticias',
    emptyMsg: 'Novas notícias serão publicadas em breve.',
    loadingMsg: 'Carregando notícias...',
    viewAll: 'Ver todas as notícias',
  },
  EN: {
    title: 'Latest news',
    emptyMsg: 'New articles will be published soon.',
    loadingMsg: 'Loading news...',
    viewAll: 'View all news',
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
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-wrap justify-center w-full"
              style={{ gap: '24px' }}
            >
              {/* Exibe no máximo 6 notícias */}
              {finalNews.slice(0, 6).map((news) => {
                return (
                  <motion.a
                    key={news.id}
                    href={news.link || '#'}
                    target={news.link && news.link !== '#' ? '_blank' : '_self'}
                    rel="noreferrer"
                    variants={cardVariants}
                    className="group w-full max-w-[340px] flex flex-col justify-start items-start cursor-pointer transition-all duration-300"
                  >
                    {/* Imagem */}
                    <div
                      className="w-full rounded-2xl relative overflow-hidden shrink-0 shadow-sm mb-4"
                      style={{ aspectRatio: '4/3', background: '#041E2B' }}
                    >
                      <Image
                        src={
                          news.image ||
                          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=350&fit=crop'
                        }
                        alt={news.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                      {news.isFeatured && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#013149] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                            Destaque
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Textos */}
                    <div className="w-full flex flex-col justify-start items-start px-2">
                      <h3
                        className="w-full break-words text-[#014263] group-hover:text-[#67A7D5] transition-colors duration-300 line-clamp-2 mb-2"
                        style={{
                          fontSize: 'clamp(16px, 4vw, 20px)',
                          fontFamily: "'Zen Dots', sans-serif",
                          fontWeight: 400,
                          lineHeight: '1.3',
                        }}
                      >
                        {news.title}
                      </h3>
                      <p
                        className="w-full break-words line-clamp-3 text-[#5B5B5B]"
                        style={{
                          fontSize: 'clamp(13px, 3vw, 15px)',
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 300,
                          lineHeight: '1.6',
                        }}
                      >
                        {news.description}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Botão Ver Todas as Notícias */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex justify-center w-full"
            >
              <Link
                href="/noticias"
                className="group border border-[#014263] text-[#014263] px-6 py-2.5 rounded-lg text-sm font-roboto font-medium hover:bg-[#014263] hover:text-white transition-colors duration-300 shadow-sm"
              >
                {t.viewAll}
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
