'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface News {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  createdAt: string;
  tags?: string | null;
}

const translations = {
  PT: {
    title: 'NOTÍCIAS',
    description: 'Fique por dentro das últimas novidades, artigos e lançamentos da SkyX.',
    loadingMsg: 'Carregando notícias...',
    emptyMsg: 'Nenhuma notícia publicada no momento.',
    backToSite: 'Voltar ao site',
    latestNews: 'Mais recente',
    readMore: 'Ler artigo completo',
  },
  EN: {
    title: 'NEWS',
    description: 'Stay up to date with the latest news, articles, and releases from SkyX.',
    loadingMsg: 'Loading news...',
    emptyMsg: 'No news published at the moment.',
    backToSite: 'Back to site',
    latestNews: 'Latest news',
    readMore: 'Read full article',
  },
} as const;

export default function NoticiasPage() {
  const [lang, setLang] = useState<'PT' | 'EN'>('PT');
  const t = translations[lang];
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<News[]>('/api/news');
        setNewsList(response.data);
      } catch (err) {
        console.error('Erro ao buscar notícias:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(lang === 'PT' ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="bg-white min-h-screen text-dark">
      {/* Header Fixo */}
      <header className="bg-dark border-b border-[#014263]/30 px-6 lg:px-8 py-4 sticky top-0 z-50 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/img/logo_footer.png"
            alt="SkyX Logo"
            width={100}
            height={32}
            className="object-contain cursor-pointer"
            priority
          />
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => setLang(lang === 'PT' ? 'EN' : 'PT')}
            className="text-gray-300 hover:text-white font-roboto text-sm font-medium transition-colors uppercase"
          >
            {lang === 'PT' ? 'EN' : 'PT'}
          </button>

          <Link
            href="/"
            className="bg-[#014263] hover:bg-[#67A7D5] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md font-roboto"
          >
            {t.backToSite}
          </Link>
        </div>
      </header>

      <main className="py-16 sm:py-24 flex flex-col items-center w-full">
        <div className="w-full max-w-[1034px] px-4 md:px-6 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center gap-4 w-full mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="px-2 py-1 rounded-md inline-flex justify-center items-center"
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
            <p
              className="text-center break-words text-[#5B5B5B] max-w-2xl"
              style={{
                fontSize: 'clamp(14px, 4vw, 18px)',
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 300,
              }}
            >
              {t.description}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center w-full mt-16">
              <p className="text-[#013149] text-lg font-roboto animate-pulse">{t.loadingMsg}</p>
            </div>
          ) : newsList.length === 0 ? (
            <div className="flex justify-center items-center w-full mt-16">
              <p className="text-gray-500 text-lg font-roboto">{t.emptyMsg}</p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-12 sm:gap-16">
              {/* Notícia em Destaque (Mais recente) */}
              {newsList.length > 0 && (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full"
                >
                  <Link
                    href={`/noticias/${newsList[0].id}`}
                    className="group w-full flex flex-col md:flex-row items-center gap-6 md:gap-10 cursor-pointer transition-all duration-300"
                  >
                    <div
                      className="w-full md:w-1/2 rounded-2xl relative overflow-hidden shrink-0 shadow-sm"
                      style={{ aspectRatio: '16/9', background: '#041E2B' }}
                    >
                      <Image
                        src={
                          newsList[0].image ||
                          'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?w=1000&h=800&fit=crop'
                        }
                        alt={newsList[0].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                      {newsList[0].tags && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#013149] text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                            {newsList[0].tags.split(',')[0].trim()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center py-2 md:py-6 px-2">
                      <div className="flex flex-wrap gap-3 mb-4 items-center">
                        <span className="text-[#67A7D5] text-xs font-bold uppercase tracking-widest">
                          {t.latestNews}
                        </span>
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                          {formatDate(newsList[0].createdAt)}
                        </span>
                      </div>
                      <h3
                        className="w-full break-words text-[#014263] group-hover:text-[#67A7D5] transition-colors duration-300 line-clamp-3 mb-4"
                        style={{
                          fontSize: 'clamp(20px, 5vw, 32px)',
                          fontFamily: "'Zen Dots', sans-serif",
                          fontWeight: 400,
                          lineHeight: '1.3',
                        }}
                      >
                        {newsList[0].title}
                      </h3>
                      <p
                        className="w-full break-words line-clamp-4 text-[#5B5B5B] mb-6"
                        style={{
                          fontSize: 'clamp(14px, 3vw, 16px)',
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 300,
                          lineHeight: '1.6',
                        }}
                      >
                        {newsList[0].description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-[#014263] font-bold uppercase tracking-widest text-sm group-hover:text-[#67A7D5] transition-colors">
                        {t.readMore}{' '}
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Restante das Notícias em Grid */}
              {newsList.length > 1 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full justify-items-center mt-8 pt-12 border-t border-gray-100"
                  style={{ gap: '24px' }}
                >
                  {newsList.slice(1).map((news) => (
                    <motion.div
                      key={news.id}
                      variants={cardVariants}
                      className="w-full flex justify-center"
                    >
                      <Link
                        href={`/noticias/${news.id}`}
                        className="group w-full max-w-[340px] flex flex-col justify-start items-start cursor-pointer transition-all duration-300"
                      >
                        <div
                          className="w-full rounded-2xl relative overflow-hidden shrink-0 shadow-sm mb-4"
                          style={{ aspectRatio: '4/3', background: '#041E2B' }}
                        >
                          <Image
                            src={
                              news.image ||
                              'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?w=500&h=350&fit=crop'
                            }
                            alt={news.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                          />
                          {news.tags && (
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#013149] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                                {news.tags.split(',')[0].trim()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="w-full flex flex-col justify-start items-start px-2">
                          <div className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
                            {formatDate(news.createdAt)}
                          </div>
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
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
