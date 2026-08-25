'use client';

import { type Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: {
    title: 'ÚLTIMAS NOTÍCIAS',
    emptyMsg: 'Novas notícias serão publicadas em breve.',
    loadingMsg: 'Carregando notícias...',
    viewAll: 'Ver todas as notícias',
  },
  EN: {
    title: 'LATEST NEWS',
    emptyMsg: 'New articles will be published soon.',
    loadingMsg: 'Loading news...',
    viewAll: 'View all news',
  },
  ES: {
    title: 'ÚLTIMAS NOTICIAS',
    emptyMsg: 'Próximamente se publicarán nuevas noticias.',
    loadingMsg: 'Cargando noticias...',
    viewAll: 'Ver todas las noticias',
  },
} as const;

interface NewsSectionProps {
  lang?: 'PT' | 'EN' | 'ES';
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
      className="relative w-full min-h-[80vh] bg-white overflow-hidden flex flex-col items-center py-24"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-12 px-6 relative z-10">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2
            className="text-center break-words font-zen-dots text-[#014263] mb-4"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
            }}
          >
            {t.title}
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center w-full min-h-[200px]">
            <p className="text-gray-400 text-lg font-roboto animate-pulse">{t.loadingMsg}</p>
          </div>
        ) : finalNews.length === 0 ? (
          <div className="flex justify-center items-center w-full min-h-[200px]">
            <p className="text-gray-500 text-lg font-roboto font-light">{t.emptyMsg}</p>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
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
                    className="group w-full flex flex-col justify-start items-start cursor-pointer transition-all duration-500 bg-[#010D13] border border-[#013149] rounded-3xl p-6 hover:bg-[#011c2b] hover:border-[#67a7d5]/80 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(1,66,99,0.3)]"
                  >
                    {/* Imagem */}
                    <div
                      className="w-full rounded-2xl relative overflow-hidden shrink-0 shadow-lg mb-6 border border-white/5"
                      style={{ aspectRatio: '4/3', background: '#020c1b' }}
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
                          <span className="px-3 py-1 bg-[#014263]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                            Destaque
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Textos */}
                    <div className="w-full flex flex-col justify-start items-start">
                      <h3
                        className="w-full break-words text-white transition-colors duration-300 line-clamp-2 mb-3 group-hover:text-[#67a7d5]"
                        style={{
                          fontSize: 'clamp(18px, 4vw, 22px)',
                          fontFamily: "'Zen Dots', sans-serif",
                        }}
                      >
                        {news.title}
                      </h3>
                      <p
                        className="w-full break-words line-clamp-3 text-gray-300 group-hover:text-white transition-colors duration-300"
                        style={{
                          fontSize: 'clamp(14px, 3vw, 15px)',
                          fontFamily: "'Roboto', sans-serif",
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
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex justify-center w-full"
            >
              <Link
                href="/noticias"
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#013149] to-[#000d13] text-white rounded-xl font-roboto font-normal tracking-[0.48px] hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all border border-white/10 text-lg"
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
