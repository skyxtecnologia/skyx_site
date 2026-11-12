'use client';

import { SpotlightCard } from '@/components/ui';
import { type Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: {
    eyebrow: 'SkyX Insights',
    title: 'ÚLTIMAS NOTÍCIAS',
    subtitle: 'Acompanhe as novidades, eventos e inovações tecnológicas da SkyX',
    emptyMsg: 'Novas notícias serão publicadas em breve.',
    loadingMsg: 'Carregando notícias...',
    viewAll: 'Ver todas as notícias',
    readMore: 'Ler notícia completa',
    featuredBadge: 'Destaque',
  },
  EN: {
    eyebrow: 'SkyX Insights',
    title: 'LATEST NEWS',
    subtitle: 'Follow the latest news, events, and technological innovations from SkyX',
    emptyMsg: 'New articles will be published soon.',
    loadingMsg: 'Loading news...',
    viewAll: 'View all news',
    readMore: 'Read full article',
    featuredBadge: 'Featured',
  },
  ES: {
    eyebrow: 'SkyX Insights',
    title: 'ÚLTIMAS NOTICIAS',
    subtitle: 'Sigue las novedades, eventos e innovaciones tecnológicas de SkyX',
    emptyMsg: 'Próximamente se publicarán nuevas noticias.',
    loadingMsg: 'Cargando noticias...',
    viewAll: 'Ver todas las noticias',
    readMore: 'Leer noticia completa',
    featuredBadge: 'Destacado',
  },
} as const;

interface NewsItem {
  id: string | number;
  title: string;
  description: string;
  image: string | null;
  link?: string | null;
  isFeatured?: boolean;
  createdAt?: string | null;
}

interface NewsSectionProps {
  lang?: 'PT' | 'EN' | 'ES';
}

export function NewsSection({ lang = 'PT' }: NewsSectionProps) {
  const t = translations[lang];

  const [dbNews, setDbNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsFromDB = async () => {
      try {
        const res = await api.get('/api/news');
        const newsData = res.data;
        if (Array.isArray(newsData) && newsData.length > 0) {
          const featured = newsData.filter((n: { isFeatured?: boolean }) => n.isFeatured);
          const others = newsData.filter((n: { isFeatured?: boolean }) => !n.isFeatured);
          setDbNews([...featured, ...others]);
        }
      } catch (err) {
        console.error('Erro ao buscar notícias do banco de dados:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsFromDB();
  }, []);

  const visibleNews = dbNews.slice(0, 6);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    if (Number.isNaN(parsed.getTime())) return null;
    const locale = lang === 'EN' ? 'en-US' : lang === 'ES' ? 'es-ES' : 'pt-BR';
    return parsed.toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  const getGridClass = (count: number) => {
    if (count === 1) return 'w-full max-w-4xl mx-auto';
    if (count === 2) {
      return 'grid grid-cols-1 md:grid-cols-2 gap-[21px] md:gap-[34px] max-w-4xl mx-auto w-full';
    }
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px] md:gap-[34px] w-full';
  };

  return (
    <section
      id="news"
      className="relative w-full bg-white overflow-hidden flex flex-col items-center py-[55px] md:py-[89px] lg:py-[110px] scroll-mt-20"
    >
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #eff6ff 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-[34px] md:gap-[45px] px-6 relative z-10">
        {/* Cabeçalho Centralizado (img 2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto"
        >
          <h2
            className="break-words font-zen-dots text-[#014263] mb-3 leading-[1.2]"
            style={{
              fontSize: 'clamp(1.618rem, 3.5vw, 2.5rem)',
            }}
          >
            {t.title}
          </h2>
          <p className="text-slate-600 font-roboto text-sm md:text-base font-light max-w-xl">
            {t.subtitle}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center w-full min-h-[220px]">
            <p className="text-gray-400 text-lg font-roboto animate-pulse">{t.loadingMsg}</p>
          </div>
        ) : visibleNews.length === 0 ? (
          <div className="flex justify-center items-center w-full min-h-[220px]">
            <p className="text-gray-500 text-lg font-roboto font-light">{t.emptyMsg}</p>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className={getGridClass(visibleNews.length)}
            >
              {visibleNews.length === 1
                ? (() => {
                    const news = visibleNews[0];
                    const href =
                      news.link && news.link.trim() !== '' && news.link !== '#'
                        ? news.link
                        : `/noticias/${news.id}`;
                    const isExternal = href.startsWith('http');
                    const formattedDate = formatDate(news.createdAt);

                    return (
                      <motion.div key={news.id} variants={cardVariants} className="w-full">
                        <SpotlightCard className="max-w-4xl mx-auto rounded-2xl bg-[#010D13] border border-[#013149] hover:bg-[#011c2b] hover:border-[#67a7d5]/80 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(1,66,99,0.3)] transition-all duration-500">
                          <Link
                            href={href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="group grid grid-cols-1 md:grid-cols-12 w-full cursor-pointer"
                          >
                            <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden bg-[#020c1b]">
                              <Image
                                src={
                                  news.image ||
                                  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop'
                                }
                                alt={news.title}
                                fill
                                className="object-cover object-[center_18%] sm:object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                                unoptimized
                              />
                              {news.isFeatured && (
                                <div className="absolute top-3.5 left-4">
                                  <span className="text-white/90 text-[10px] font-roboto font-medium uppercase tracking-[0.2em] drop-shadow-md">
                                    {t.featuredBadge}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="md:col-span-5 p-5 md:p-7 flex flex-col justify-between items-start">
                              <div className="w-full flex flex-col items-start">
                                {formattedDate && (
                                  <span className="text-[11px] font-roboto uppercase tracking-wider text-[#67a7d5] mb-2 font-medium">
                                    {formattedDate}
                                  </span>
                                )}
                                <h3 className="w-full break-words font-roboto font-semibold text-white text-base md:text-[18px] leading-[1.38] line-clamp-3 mb-2.5 group-hover:text-[#67a7d5] transition-colors duration-300">
                                  {news.title}
                                </h3>
                                <p className="w-full break-words font-roboto text-gray-300 text-xs md:text-[13.5px] leading-[1.58] line-clamp-4 group-hover:text-white/95 transition-colors duration-300">
                                  {news.description}
                                </p>
                              </div>

                              <div className="pt-4 mt-4 border-t border-white/10 w-full flex items-center justify-between gap-3">
                                <span className="text-xs font-roboto font-medium text-[#67a7d5] group-hover:text-white transition-colors duration-300">
                                  {t.readMore}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-[#013149] text-[#00d9ff] group-hover:bg-[#00d9ff] group-hover:text-[#010D13] flex items-center justify-center transition-all duration-300 shrink-0">
                                  <span className="text-sm font-bold leading-none group-hover:rotate-45 transition-transform duration-300">
                                    &#8599;
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </SpotlightCard>
                      </motion.div>
                    );
                  })()
                : visibleNews.map((news) => {
                    const href =
                      news.link && news.link.trim() !== '' && news.link !== '#'
                        ? news.link
                        : `/noticias/${news.id}`;
                    const isExternal = href.startsWith('http');
                    const formattedDate = formatDate(news.createdAt);

                    return (
                      <motion.div key={news.id} variants={cardVariants} className="w-full flex">
                        <SpotlightCard className="w-full flex rounded-2xl bg-[#010D13] border border-[#013149] hover:bg-[#011c2b] hover:border-[#67a7d5]/80 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(1,66,99,0.3)] transition-all duration-500">
                          <Link
                            href={href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="group w-full flex flex-col justify-between items-start cursor-pointer p-4 md:p-5"
                          >
                            <div className="w-full flex flex-col items-start">
                              {/* Imagem */}
                              <div className="w-full aspect-[16/10] rounded-xl relative overflow-hidden shrink-0 shadow-lg mb-4 border border-white/5 bg-[#020c1b]">
                                <Image
                                  src={
                                    news.image ||
                                    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=350&fit=crop'
                                  }
                                  alt={news.title}
                                  fill
                                  className="object-cover object-[center_18%] sm:object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                                  unoptimized
                                />
                                {news.isFeatured && (
                                  <div className="absolute top-3 left-3.5">
                                    <span className="text-white/90 text-[10px] font-roboto font-medium uppercase tracking-[0.2em] drop-shadow-md">
                                      {t.featuredBadge}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Textos com proporção áurea legível (img 1) */}
                              <div className="w-full flex flex-col justify-start items-start">
                                {formattedDate && (
                                  <span className="text-[11px] font-roboto uppercase tracking-wider text-[#67a7d5] mb-1.5 font-medium">
                                    {formattedDate}
                                  </span>
                                )}
                                <h3 className="w-full break-words font-roboto font-semibold text-white text-[15px] md:text-[16.5px] leading-[1.38] line-clamp-2 mb-2 group-hover:text-[#67a7d5] transition-colors duration-300">
                                  {news.title}
                                </h3>
                                <p className="w-full break-words font-roboto text-xs md:text-[13px] leading-[1.58] line-clamp-3 text-gray-300 group-hover:text-white/95 transition-colors duration-300">
                                  {news.description}
                                </p>
                              </div>
                            </div>

                            <div className="pt-3.5 mt-4 border-t border-white/10 w-full flex items-center justify-between gap-3">
                              <span className="text-xs font-roboto font-medium text-[#67a7d5] group-hover:text-white transition-colors duration-300">
                                {t.readMore}
                              </span>
                              <div className="w-8 h-8 rounded-full bg-[#013149] text-[#00d9ff] group-hover:bg-[#00d9ff] group-hover:text-[#010D13] flex items-center justify-center transition-all duration-300 shrink-0">
                                <span className="text-sm font-bold leading-none group-hover:rotate-45 transition-transform duration-300">
                                  &#8599;
                                </span>
                              </div>
                            </div>
                          </Link>
                        </SpotlightCard>
                      </motion.div>
                    );
                  })}
            </motion.div>

            {/* Botão Ver Todas as Notícias Centralizado Abaixo das Notícias em Destaque (img 2) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center w-full pt-2"
            >
              <Link
                href="/noticias"
                className="px-8 py-3.5 rounded-[10px] bg-gradient-to-r from-[#013149] to-[#000d13] text-white font-roboto font-normal text-sm md:text-base border border-white/10 hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all whitespace-nowrap"
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
