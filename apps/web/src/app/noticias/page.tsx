'use client';

import { SiteFooter } from '@/components/layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { type Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface News {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  createdAt: string;
  tags?: string | null;
  isFeatured?: boolean;
}

const translations = {
  PT: {
    portalName: 'SKYX NEWS',
    tickerLabel: 'ÚLTIMAS NOTÍCIAS',
    categories: ['Todas', 'Segurança & Forense', 'Cápsula VR', 'Software & IA', 'Eventos'],
    heroBadge: 'DESTAQUE',
    heroAuthor: 'Equipe SkyX',
    briefsTitle: 'BRIEFS',
    topStoriesTitle: 'TOP STORIES',
    featuredTitle: 'FEATURED',
    loadingMsg: 'Carregando portal de notícias...',
    emptyMsg: 'Nenhuma matéria encontrada no momento.',
    backToSite: 'Voltar ao site',
    readMore: 'Ler matéria',
    sidebarCardTitle: 'Cápsula Imersiva SkyX',
    sidebarCardDesc:
      'Leve simulações de Realidade Virtual 360º e robótica para o seu evento ou treinamento.',
    sidebarCardBtn: 'Conhecer a Cápsula',
  },
  EN: {
    portalName: 'SKYX NEWS',
    tickerLabel: 'LATEST NEWS',
    categories: ['All', 'Security & Forensics', 'VR Capsule', 'Software & AI', 'Events'],
    heroBadge: 'FEATURED',
    heroAuthor: 'SkyX Team',
    briefsTitle: 'BRIEFS',
    topStoriesTitle: 'TOP STORIES',
    featuredTitle: 'FEATURED',
    loadingMsg: 'Loading news portal...',
    emptyMsg: 'No stories found at the moment.',
    backToSite: 'Back to site',
    readMore: 'Read story',
    sidebarCardTitle: 'SkyX Immersive Capsule',
    sidebarCardDesc:
      'Bring 360º Virtual Reality simulations and robotics to your company event or training.',
    sidebarCardBtn: 'Discover the Capsule',
  },
  ES: {
    portalName: 'SKYX NEWS',
    tickerLabel: 'ÚLTIMAS NOTICIAS',
    categories: ['Todas', 'Seguridad y Forense', 'Cápsula VR', 'Software e IA', 'Eventos'],
    heroBadge: 'DESTACADO',
    heroAuthor: 'Equipo SkyX',
    briefsTitle: 'BRIEFS',
    topStoriesTitle: 'TOP STORIES',
    featuredTitle: 'FEATURED',
    loadingMsg: 'Cargando portal de noticias...',
    emptyMsg: 'No se encontraron artículos en este momento.',
    backToSite: 'Volver al sitio',
    readMore: 'Leer artículo',
    sidebarCardTitle: 'Cápsula Inmersiva SkyX',
    sidebarCardDesc:
      'Lleva simulaciones de Realidad Virtual 360º y robótica a tu empresa o evento.',
    sidebarCardBtn: 'Conocer la Cápsula',
  },
} as const;

export default function NoticiasPage() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [featuredIdx, setFeaturedIdx] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<News[]>('/api/news');
        if (Array.isArray(response.data)) {
          setNewsList(response.data);
        }
      } catch (err) {
        console.error('Erro ao buscar notícias:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const locale = lang === 'PT' ? 'pt-BR' : lang === 'ES' ? 'es-ES' : 'en-US';

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Filtragem de notícias com base na categoria
  const filteredNews = useMemo(() => {
    if (selectedCategory === 'Todas' || selectedCategory === 'All') {
      return newsList;
    }
    const catLower = selectedCategory.toLowerCase();
    return newsList.filter((n) => {
      const tagLower = (n.tags || '').toLowerCase();
      const titleLower = n.title.toLowerCase();
      return (
        tagLower.includes(catLower) ||
        (catLower.includes('segurança') &&
          (titleLower.includes('polícia') || titleLower.includes('segurança'))) ||
        (catLower.includes('cápsula') &&
          (titleLower.includes('cápsula') || titleLower.includes('vr'))) ||
        (catLower.includes('software') &&
          (titleLower.includes('software') || titleLower.includes('inovação'))) ||
        (catLower.includes('eventos') &&
          (titleLower.includes('expo') || titleLower.includes('feira')))
      );
    });
  }, [newsList, selectedCategory]);

  // Estruturação dos dados conforme o layout do PHANATIK:
  // 1. Featured Hero
  const heroNews = filteredNews.length > 0 ? filteredNews[featuredIdx % filteredNews.length] : null;

  // 2. Briefs (Próximos 3 itens após o hero)
  const briefsNews = useMemo(() => {
    if (filteredNews.length <= 1) return filteredNews;
    return filteredNews.slice(1, 4);
  }, [filteredNews]);

  // 3. Top Stories (Itens principais para o grid de 2 colunas)
  const topStories = useMemo(() => {
    if (filteredNews.length <= 4) return filteredNews;
    return filteredNews.slice(4);
  }, [filteredNews]);

  // 4. Featured List (Itens em texto para a sidebar)
  const sidebarFeatured = useMemo(() => {
    return newsList.slice(0, 4);
  }, [newsList]);

  const handlePrevHero = () => {
    setFeaturedIdx((prev) => (prev > 0 ? prev - 1 : Math.max(0, filteredNews.length - 1)));
  };

  const handleNextHero = () => {
    setFeaturedIdx((prev) => (prev + 1) % Math.max(1, filteredNews.length));
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-900 flex flex-col justify-between">
      {/* Header Superior Estilo Magazine */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 lg:px-12 py-3.5 sticky top-0 z-50 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/logo-nav.png"
              alt="SkyX Logo"
              width={112}
              height={32}
              className="object-contain cursor-pointer brightness-0"
              priority
            />
          </Link>
          <span className="hidden sm:inline-block h-4 w-px bg-slate-300" />
          <span className="hidden sm:inline-block font-zen-dots text-xs tracking-widest text-[#014263]">
            {t.portalName}
          </span>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => setLang(lang === 'PT' ? 'EN' : lang === 'EN' ? 'ES' : 'PT')}
            className="text-slate-600 hover:text-[#014263] font-roboto text-xs font-semibold uppercase tracking-wider transition-colors px-2.5 py-1 rounded-md border border-slate-200"
          >
            {lang}
          </button>

          <Link
            href="/"
            className="bg-[#014263] hover:bg-[#67A7D5] text-white px-5 py-2 rounded-xl text-xs md:text-sm font-roboto font-medium transition-all duration-300 shadow-sm"
          >
            {t.backToSite}
          </Link>
        </div>
      </header>

      {/* Sub-Header Ticker & Categorias (Inspirado no PHANATIK) */}
      <div className="bg-white border-b border-slate-200/70 px-6 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-roboto font-bold uppercase tracking-wider text-[#014263] shrink-0 bg-[#F0F7FF] px-2.5 py-1 rounded-md border border-[#67A7D5]/25">
              {t.tickerLabel}:
            </span>
            <div className="flex items-center gap-2">
              {t.categories.map((category) => {
                const isActive =
                  selectedCategory === category ||
                  (category === 'Todas' && selectedCategory === 'All') ||
                  (category === 'All' && selectedCategory === 'Todas');

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setFeaturedIdx(0);
                    }}
                    className={`text-xs font-roboto px-3 py-1 rounded-full transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#014263] text-white font-medium shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-normal'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <span className="hidden md:inline-block text-xs font-roboto text-slate-400">
            {new Date().toLocaleDateString(locale, {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      <main className="flex-grow w-full py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-32">
              <p className="text-[#014263] text-lg font-roboto animate-pulse">{t.loadingMsg}</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-32 text-center">
              <p className="text-slate-500 text-lg font-roboto mb-4">{t.emptyMsg}</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('Todas')}
                className="text-xs font-roboto font-semibold uppercase tracking-wider text-[#014263] underline cursor-pointer"
              >
                Ver todas as matérias
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-10 md:gap-14">
              {/* 1. Hero Featured Story Banner (Grande Showcase Escuro Clicável com Imagem e Carousel do PHANATIK) */}
              {heroNews && (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full"
                >
                  <Link
                    href={`/noticias/${heroNews.id}`}
                    className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#010D13] min-h-[380px] md:min-h-[480px] border border-[#013149]/60 shadow-[0_20px_50px_rgba(1,49,73,0.18)] flex flex-col justify-end p-6 md:p-12 group cursor-pointer block"
                  >
                    {/* Imagem de Fundo com Escala no Hover e Enquadramento Otimizado */}
                    <Image
                      src={
                        heroNews.image ||
                        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?w=1600&h=900&fit=crop'
                      }
                      alt={heroNews.title}
                      fill
                      priority
                      className="object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-700 opacity-80"
                      unoptimized
                    />

                    {/* Gradiente Escuro Suave para Alta Legibilidade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010D13] via-[#010D13]/60 via-45% to-transparent pointer-events-none" />

                    {/* Conteúdo do Hero (Bottom-Left) */}
                    <div className="relative z-10 max-w-3xl flex flex-col items-start">
                      {/* Tag Kicker */}
                      <span className="text-[11px] md:text-xs font-roboto font-bold uppercase tracking-[0.2em] text-[#00D9FF] bg-[#013149]/80 backdrop-blur-md px-3 py-1 rounded-md border border-[#67A7D5]/40 mb-3.5 inline-block">
                        {heroNews.tags?.split(',')[0].trim() || t.heroBadge}
                      </span>

                      <h2
                        className="font-zen-dots text-white group-hover:text-[#67A7D5] transition-colors leading-[1.25] mb-3.5 text-balance drop-shadow-md"
                        style={{
                          fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)',
                        }}
                      >
                        {heroNews.title}
                      </h2>

                      <p className="text-gray-300 font-roboto font-light text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-5 max-w-2xl drop-shadow-sm">
                        {heroNews.description}
                      </p>

                      <div className="flex items-center gap-3 text-xs font-roboto text-gray-400">
                        <span className="text-white font-medium">{t.heroAuthor}</span>
                        <span>•</span>
                        <span>{formatDate(heroNews.createdAt)}</span>
                      </div>
                    </div>

                    {/* Controles de Carousel (Bottom-Right do Banner como no PHANATIK) */}
                    {filteredNews.length > 1 && (
                      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handlePrevHero();
                          }}
                          aria-label="Notícia anterior"
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <title>Notícia anterior</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleNextHero();
                          }}
                          aria-label="Próxima notícia"
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <title>Próxima notícia</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </Link>
                </motion.div>
              )}

              {/* 2. Faixa "BRIEFS" (3 Mini-Cards Horizontais como no PHANATIK) */}
              {briefsNews.length > 0 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#014263]">
                      {t.briefsTitle}
                    </span>
                    <span className="h-px bg-slate-200 flex-grow" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    {briefsNews.map((item) => (
                      <Link
                        key={`brief-${item.id}`}
                        href={`/noticias/${item.id}`}
                        className="flex items-center gap-4 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-[#67A7D5]/60 hover:shadow-md transition-all group"
                      >
                        <div className="relative w-16 h-16 md:w-20 md:h-16 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                          <Image
                            src={
                              item.image ||
                              'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?w=300&h=300&fit=crop'
                            }
                            alt={item.title}
                            fill
                            className="object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-500"
                            unoptimized
                          />
                        </div>

                        <div className="flex flex-col justify-center flex-grow min-w-0">
                          <h3 className="font-roboto font-bold text-xs md:text-sm text-slate-800 group-hover:text-[#014263] transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </h3>
                          <span className="text-[11px] font-roboto text-slate-400 mt-1">
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Grid Principal em Duas Colunas (TOP STORIES 8 Colunas | FEATURED + Teaser 4 Colunas) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Coluna Esquerda: TOP STORIES (2 Colunas de Cards Ricos) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#014263]">
                      {t.topStoriesTitle}
                    </span>
                    <span className="h-px bg-slate-200 flex-grow" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {(topStories.length > 0 ? topStories : newsList).slice(0, 6).map((item) => (
                      <Link
                        key={`story-${item.id}`}
                        href={`/noticias/${item.id}`}
                        className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-[#67A7D5]/70 transition-all duration-300"
                      >
                        <div className="relative aspect-[16/10] w-full bg-slate-200 overflow-hidden">
                          <Image
                            src={
                              item.image ||
                              'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?w=600&h=400&fit=crop'
                            }
                            alt={item.title}
                            fill
                            className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        </div>

                        <div className="p-5 flex flex-col justify-between flex-grow">
                          <div>
                            <span className="text-[11px] font-roboto font-semibold uppercase tracking-wider text-[#67A7D5] mb-1.5 block">
                              {item.tags?.split(',')[0].trim() || 'Inovação'} •{' '}
                              {formatDate(item.createdAt)}
                            </span>
                            <h4 className="font-roboto font-bold text-slate-900 group-hover:text-[#014263] transition-colors line-clamp-2 text-base md:text-[17px] leading-snug mb-2">
                              {item.title}
                            </h4>
                            <p className="font-roboto font-light text-xs md:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <span className="text-xs font-roboto font-semibold text-[#014263] group-hover:text-[#67A7D5] transition-colors mt-4 flex items-center gap-1.5">
                            {t.readMore} &rarr;
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Coluna Direita: FEATURED (Lista Textual com Linhas Divisórias + Card Promo Cápsula) */}
                <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-28 self-start w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#014263]">
                      {t.featuredTitle}
                    </span>
                    <span className="h-px bg-slate-200 flex-grow" />
                  </div>

                  {/* Lista de Notícias em Destaque (Texto Puro com Divisores Elegantes) */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col divide-y divide-slate-100">
                    {sidebarFeatured.map((item, idx) => (
                      <Link
                        key={`featured-list-${item.id}`}
                        href={`/noticias/${item.id}`}
                        className={`group block transition-colors ${idx === 0 ? 'pb-4' : idx === sidebarFeatured.length - 1 ? 'pt-4' : 'py-4'}`}
                      >
                        <h4 className="font-roboto font-semibold text-sm md:text-base text-slate-800 group-hover:text-[#014263] transition-colors line-clamp-2 leading-snug mb-1">
                          {item.title}
                        </h4>
                        <span className="text-[11px] font-roboto text-slate-400">
                          {item.tags?.split(',')[0].trim() || 'Destaque'} •{' '}
                          {formatDate(item.createdAt)}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Card Promo Cápsula SkyX (Dark Tech Callout) */}
                  <div className="rounded-2xl bg-[#010D13] border border-[#013149] p-6 shadow-xl text-white relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      style={{ backgroundImage: "url('/img/card_case_1.png')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010D13] via-[#010D13]/85 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-start gap-3">
                      <span className="text-[10px] font-roboto font-bold uppercase tracking-[0.2em] text-[#00D9FF] bg-[#013149] px-2.5 py-1 rounded-md border border-[#67A7D5]/40">
                        TECNOLOGIA IMERSIVA
                      </span>

                      <h4 className="font-zen-dots text-lg text-white leading-tight">
                        {t.sidebarCardTitle}
                      </h4>

                      <p className="text-xs text-gray-300 font-roboto font-light leading-relaxed">
                        {t.sidebarCardDesc}
                      </p>

                      <Link
                        href="/capsula"
                        className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-[#013149] to-[#000d13] text-white border border-[#67A7D5]/40 hover:border-[#67A7D5] hover:shadow-[0_0_15px_rgba(103,167,213,0.3)] transition-all text-xs font-roboto font-medium tracking-wide"
                      >
                        {t.sidebarCardBtn} &rarr;
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
