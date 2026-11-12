'use client';

import { SiteFooter } from '@/components/layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface News {
  id: string;
  title: string;
  description: string;
  image: string | null;
  content?: string | null;
  tags?: string | null;
  createdAt: string;
  author?: string;
  category?: string;
}

const translations = {
  PT: {
    backToNews: 'Voltar para Notícias',
    loadingArticle: 'Carregando artigo...',
    notFoundTitle: 'Artigo não encontrado',
    notFoundDesc: 'A notícia que você procura pode ter sido movida ou excluída.',
    returnBtn: 'Retornar às notícias',
    publishedOn: 'Publicado em',
    defaultCategory: 'Tecnologia & Inovação',
    defaultAuthor: 'Equipe SkyX',
    defaultAuthorRole: 'Comunicação & Tecnologia',
    defaultAuthorBio:
      'A SkyX Tecnologia desenvolve soluções digitais sob medida, unindo inovação, inteligência operacional e simulação imersiva.',
    shareLabel: 'COMPARTILHAR',
    copyLink: 'Copiar link',
    copiedLink: 'Link copiado!',
    detailsTitle: 'DETALHES DO ARTIGO',
    dateLabel: 'DATA',
    categoryLabel: 'CATEGORIA',
    readingLabel: 'TEMPO DE LEITURA',
    portalLabel: 'FONTE',
    portalVal: 'SkyX Newsroom',
    authorTitle: 'PUBLICADO POR',
    relatedTitle: 'Outras Matérias Recentes',
    readArticle: 'Ler artigo',
    tagsLabel: 'PALAVRAS-CHAVE',
    ctaTitle: 'Soluções Tecnológicas Sob Medida',
    ctaDesc:
      'Desenvolvemos softwares, inteligência operacional e simulações imersivas para operações de alta criticidade.',
    ctaBtn: 'Falar com Especialistas',
    mediaLinkTitle: 'Registro Oficial na Mídia',
    openMediaBtn: 'Acessar Publicação',
  },
  EN: {
    backToNews: 'Back to News',
    loadingArticle: 'Loading article...',
    notFoundTitle: 'Article not found',
    notFoundDesc: 'The news article you are looking for may have been moved or deleted.',
    returnBtn: 'Return to news',
    publishedOn: 'Published on',
    defaultCategory: 'Technology & Innovation',
    defaultAuthor: 'SkyX Team',
    defaultAuthorRole: 'Communication & Tech',
    defaultAuthorBio:
      'SkyX Technology develops tailor-made digital solutions, uniting innovation, operational intelligence, and immersive simulation.',
    shareLabel: 'SHARE',
    copyLink: 'Copy link',
    copiedLink: 'Link copied!',
    detailsTitle: 'ARTICLE DETAILS',
    dateLabel: 'DATE',
    categoryLabel: 'CATEGORY',
    readingLabel: 'READING TIME',
    portalLabel: 'SOURCE',
    portalVal: 'SkyX Newsroom',
    authorTitle: 'PUBLISHED BY',
    relatedTitle: 'Other Recent Stories',
    readArticle: 'Read article',
    tagsLabel: 'TAGS',
    ctaTitle: 'Tailor-Made Tech Solutions',
    ctaDesc:
      'We develop high-performance software, operational AI, and immersive VR simulations for mission-critical operations.',
    ctaBtn: 'Talk to Specialists',
    mediaLinkTitle: 'Official Media Coverage',
    openMediaBtn: 'View Publication',
  },
  ES: {
    backToNews: 'Volver a Noticias',
    loadingArticle: 'Cargando artículo...',
    notFoundTitle: 'Artículo no encontrado',
    notFoundDesc: 'La noticia que buscas puede haber sido movida o eliminada.',
    returnBtn: 'Volver a noticias',
    publishedOn: 'Publicado el',
    defaultCategory: 'Tecnología e Innovación',
    defaultAuthor: 'Equipo SkyX',
    defaultAuthorRole: 'Comunicación y Tecnología',
    defaultAuthorBio:
      'SkyX Tecnología desarrolla soluciones digitales a medida, uniendo innovación, inteligencia operativa y simulación inmersiva.',
    shareLabel: 'COMPARTIR',
    copyLink: 'Copiar enlace',
    copiedLink: '¡Enlace copiado!',
    detailsTitle: 'DETALLES DEL ARTÍCULO',
    dateLabel: 'FECHA',
    categoryLabel: 'CATEGORÍA',
    readingLabel: 'TIEMPO DE LECTURA',
    portalLabel: 'FUENTE',
    portalVal: 'SkyX Newsroom',
    authorTitle: 'PUBLICADO POR',
    relatedTitle: 'Otras Noticias Recientes',
    readArticle: 'Leer artículo',
    tagsLabel: 'ETIQUETAS',
    ctaTitle: 'Soluciones Tecnológicas a Medida',
    ctaDesc:
      'Desarrollamos software de alto rendimiento, inteligencia operativa y simulaciones inmersivas.',
    ctaBtn: 'Hablar con Especialistas',
    mediaLinkTitle: 'Cobertura Oficial en Medios',
    openMediaBtn: 'Ver Publicación',
  },
} as const;

export default function NoticiaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Barra de progresso de leitura suave no topo
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<News>(`/api/news/${id}`);
        if (response.data) {
          setNews(response.data);
        }
      } catch {
        // Fallback para listagem geral caso o endpoint individual não responda
        try {
          const fallbackResponse = await api.get<News[]>('/api/news');
          const found = fallbackResponse.data.find((n: News) => n.id === id);
          if (found) setNews(found);
        } catch (err) {
          console.error('Erro ao buscar notícia individual:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await api.get<News[]>('/api/news');
        if (Array.isArray(res.data)) {
          setRelatedNews(res.data.filter((n) => n.id !== id).slice(0, 3));
        }
      } catch (err) {
        console.error('Erro ao buscar notícias relacionadas:', err);
      }
    };

    fetchNewsData();
    fetchRelated();
  }, [id]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const locale = lang === 'PT' ? 'pt-BR' : lang === 'ES' ? 'es-ES' : 'en-US';

  const formattedDate = news?.createdAt
    ? new Date(news.createdAt).toLocaleDateString(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const shortDate = news?.createdAt
    ? new Date(news.createdAt).toLocaleDateString(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  // Processamento limpo e orgânico do conteúdo real
  const rawParagraphs = useMemo(() => {
    if (!news?.content) return [news?.description || ''];
    return news.content
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }, [news]);

  const displayTags = useMemo(() => {
    if (!news?.tags) return [t.defaultCategory];
    const tags = news.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    return tags.length > 0 ? tags : [t.defaultCategory];
  }, [news, t.defaultCategory]);

  const primaryCategory = displayTags[0] || t.defaultCategory;

  // Formatação editorial do título para evitar que títulos em caixa alta fiquem comprimidos/gritantes
  const formatEditorialTitle = (rawTitle?: string | null): string => {
    if (!rawTitle) return '';
    const trimmed = rawTitle.trim();
    const isAllUpper = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
    if (!isAllUpper) return trimmed;

    const acronyms = new Set([
      'SKY',
      'SKYX',
      'XP',
      'IA',
      'AI',
      'VR',
      'AR',
      'TI',
      'CEO',
      'RJ',
      'SP',
      'BR',
      'CTO',
      'COO',
    ]);
    const lowercaseWords = new Set([
      'e',
      'de',
      'da',
      'do',
      'das',
      'dos',
      'a',
      'o',
      'as',
      'os',
      'em',
      'na',
      'no',
      'nas',
      'nos',
      'por',
      'para',
      'com',
      'à',
      'às',
      'ao',
      'aos',
      'ou',
      'um',
      'uma',
      'del',
      'la',
      'y',
      'en',
      'of',
      'the',
      'and',
      'in',
      'to',
      'for',
      'with',
    ]);

    return trimmed
      .split(/\s+/)
      .map((word, idx) => {
        const match = word.match(/^([^a-zA-Z0-9À-ÿ]*)(.*?)([^a-zA-Z0-9À-ÿ]*)$/);
        if (!match) return word;
        const [, prefix, core, suffix] = match;
        if (!core) return word;

        if (acronyms.has(core.toUpperCase())) {
          return prefix + core.toUpperCase() + suffix;
        }
        const lower = core.toLowerCase();
        if (idx > 0 && lowercaseWords.has(lower)) {
          return prefix + lower + suffix;
        }
        return prefix + lower.charAt(0).toUpperCase() + lower.slice(1) + suffix;
      })
      .join(' ');
  };

  // Cálculo real do tempo de leitura baseado nas palavras do artigo
  const readingTime = useMemo(() => {
    const fullText = `${news?.title || ''} ${news?.description || ''} ${news?.content || ''}`;
    const words = fullText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 190));
    if (lang === 'PT') return `${minutes} min de leitura`;
    if (lang === 'ES') return `${minutes} min de lectura`;
    return `${minutes} min read`;
  }, [news, lang]);

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-900 flex flex-col justify-between selection:bg-[#67A7D5]/20 selection:text-[#014263]">
      {/* Barra de Progresso de Leitura Editorial */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#014263] via-[#007EA7] to-[#00D9FF] origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header Editorial Minimalista */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-12 py-3.5 sticky top-0 z-50 flex items-center justify-between shadow-xs">
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

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={() => setLang(lang === 'PT' ? 'EN' : lang === 'EN' ? 'ES' : 'PT')}
            className="text-slate-600 hover:text-[#014263] font-roboto text-xs font-semibold uppercase tracking-wider transition-colors px-2.5 py-1 rounded-md border border-slate-200 cursor-pointer"
          >
            {lang}
          </button>

          <Link
            href="/noticias"
            className="text-[#014263] hover:text-[#67A7D5] font-roboto text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            <span>{t.backToNews}</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow w-full">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-36">
            <div className="w-10 h-10 border-3 border-slate-200 border-t-[#014263] rounded-full animate-spin mb-4" />
            <p className="text-[#014263] text-sm font-roboto font-medium tracking-wide">
              {t.loadingArticle}
            </p>
          </div>
        ) : !news ? (
          <div className="flex flex-col justify-center items-center py-32 px-6 text-center max-w-lg mx-auto">
            <h2 className="text-3xl font-bold text-[#014263] mb-4 font-zen-dots">
              {t.notFoundTitle}
            </h2>
            <p className="text-slate-600 mb-8 font-roboto leading-relaxed">{t.notFoundDesc}</p>
            <Link
              href="/noticias"
              className="bg-[#014263] text-white px-7 py-3 rounded-xl hover:bg-[#67A7D5] transition-colors font-roboto font-medium shadow-md"
            >
              {t.returnBtn}
            </Link>
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* 1. Header do Artigo (Amplo, Ocupando Todo o Espaço e Editorialmente Equilibrado) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 sm:pb-10 text-center flex flex-col items-center">
              {/* Category Pill & Date */}
              <div className="flex items-center gap-2.5 flex-wrap justify-center mb-5">
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#014263] bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200/80">
                  {primaryCategory}
                </span>
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-xs font-roboto font-medium text-slate-500 uppercase tracking-wider">
                  {formattedDate}
                </span>
              </div>

              {/* Título Principal Ocupando Todo o Espaço da Linha com Presença Editorial */}
              <h1 className="w-full max-w-6xl mx-auto font-roboto font-bold text-[#012538] leading-[1.2] mb-5 tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px]">
                {formatEditorialTitle(news.title)}
              </h1>

              {/* Subtítulo / Dek Amplo e Proporcional */}
              {news.description && (
                <p className="w-full max-w-5xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 font-roboto font-light leading-relaxed mb-6">
                  {news.description}
                </p>
              )}

              {/* Meta Byline */}
              <div className="flex items-center gap-3 text-xs font-roboto text-slate-400 pt-5 border-t border-slate-200/60 w-full max-w-lg justify-center">
                <span className="text-slate-700 font-medium">{t.defaultAuthor}</span>
                <span>•</span>
                <span>{readingTime}</span>
              </div>
            </div>

            {/* 2. Hero Cover Image (Com Presença de Capa Ampla max-w-7xl e Enquadramento Generoso com Foco Correto) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
              <div className="relative w-full aspect-[16/9] md:aspect-[21/10] min-h-[320px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[560px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(1,49,73,0.1)] border border-slate-200/90 bg-[#011420]">
                <Image
                  src={
                    news.image ||
                    'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?w=1600&h=800&fit=crop'
                  }
                  alt={news.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover object-[center_20%] sm:object-[center_25%]"
                  unoptimized
                />
              </div>
            </div>

            {/* 3. Canvas Editorial de Leitura (Dock Compartilhar Esquerda | Coluna Central Ampla com Máximo Destaque | Sidebar Direita Slim) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-10 xl:gap-14">
                {/* Coluna Esquerda: Dock de Compartilhamento Compacto & Fixo (Desktop) */}
                <aside className="hidden lg:flex flex-col items-center gap-3 w-12 shrink-0 sticky top-28 self-start">
                  <div className="w-full rounded-2xl bg-white border border-slate-200/80 p-1.5 py-3 shadow-xs flex flex-col items-center gap-2.5">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 select-none py-0.5">
                      {t.shareLabel.slice(0, 3)}
                    </span>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com/skyxtecnologia"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram da SkyX"
                      className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#F0F7FF] text-slate-500 hover:text-[#014263] border border-slate-200/70 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <title>Instagram</title>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn da SkyX"
                      className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#F0F7FF] text-slate-500 hover:text-[#014263] border border-slate-200/70 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <title>LinkedIn</title>
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </a>

                    {/* Copiar Link */}
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      aria-label={copied ? t.copiedLink : t.copyLink}
                      className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#F0F7FF] text-slate-500 hover:text-[#014263] border border-slate-200/70 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer relative"
                    >
                      {copied ? (
                        <svg
                          className="w-4 h-4 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>Link copiado</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>Copiar link</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      <span className="sr-only">{copied ? t.copiedLink : t.copyLink}</span>
                    </button>

                    <div className="w-5 h-px bg-slate-200 my-0.5" />

                    {/* Voltar */}
                    <Link
                      href="/noticias"
                      aria-label={t.backToNews}
                      className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-[#F0F7FF] text-slate-500 hover:text-[#014263] border border-slate-200/70 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    >
                      <span className="text-base font-bold leading-none">&larr;</span>
                      <span className="sr-only">{t.backToNews}</span>
                    </Link>
                  </div>
                </aside>

                {/* Coluna Central: Corpo da Matéria Amplo com Máximo Destaque */}
                <div className="flex-1 min-w-0 w-full flex flex-col gap-6 text-left">
                  {/* Lead Paragraph: Primeiro parágrafo com tipografia convidativa */}
                  {rawParagraphs.length > 0 && (
                    <p className="text-base sm:text-[17.5px] text-slate-800 font-roboto font-normal leading-[1.72] tracking-tight">
                      {rawParagraphs[0]}
                    </p>
                  )}

                  {/* Pull Quote Editorial Elegante com Citação */}
                  {news.description && (
                    <blockquote className="my-1.5 border-l-4 border-[#014263] pl-5 sm:pl-7 py-3 bg-gradient-to-r from-[#F0F7FF] via-[#F0F7FF]/70 to-transparent rounded-r-2xl border border-l-0 border-[#67A7D5]/25">
                      <p className="text-base sm:text-lg text-[#013149] font-roboto font-medium italic leading-[1.7]">
                        &ldquo;{news.description}&rdquo;
                      </p>
                      <cite className="block mt-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#67A7D5] not-italic">
                        SkyX Tecnologia • {primaryCategory}
                      </cite>
                    </blockquote>
                  )}

                  {/* Parágrafos subsequentes com tipografia calibrada para leitura contínua */}
                  <div className="flex flex-col gap-5 text-[15px] sm:text-[16px] text-slate-700 font-roboto font-light leading-[1.78]">
                    {rawParagraphs.slice(1).map((paragraph, idx) => {
                      // Detecção inteligente de link externo ou vídeo
                      const isUrl = /^https?:\/\/[^\s]+$/.test(paragraph);
                      const isInstagramLink = paragraph.includes('instagram.com') || isUrl;

                      if (isInstagramLink) {
                        return (
                          <div
                            key={`media-${idx}-${paragraph.slice(0, 10)}`}
                            className="my-3 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center shrink-0 border border-pink-500/20">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <title>Instagram Link</title>
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-roboto font-bold text-sm text-slate-800">
                                  {t.mediaLinkTitle}
                                </span>
                                <span className="text-xs text-slate-500 font-roboto truncate max-w-xs sm:max-w-sm">
                                  {paragraph}
                                </span>
                              </div>
                            </div>

                            <a
                              href={paragraph}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#014263] hover:bg-[#67A7D5] text-white text-xs font-roboto font-semibold transition-all shadow-xs shrink-0 cursor-pointer"
                            >
                              <span>{t.openMediaBtn}</span>
                              <span>&rarr;</span>
                            </a>
                          </div>
                        );
                      }

                      return (
                        <p key={`para-${idx}-${paragraph.slice(0, 10)}`} className="text-balance">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Barra de Ações Mobile & Tags */}
                  <div className="pt-6 border-t border-slate-200/80 mt-4 flex flex-col gap-5">
                    {/* Tags List */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mr-2">
                        {t.tagsLabel}:
                      </span>
                      {displayTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-roboto font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200/80 hover:bg-slate-200 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Compartilhar Mobile */}
                    <div className="flex lg:hidden items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                        {t.shareLabel}:
                      </span>
                      <div className="flex items-center gap-3">
                        <a
                          href="https://instagram.com/skyxtecnologia"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Instagram"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <title>Instagram</title>
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <title>LinkedIn</title>
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                          aria-label="Copiar link"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <title>Copiar link</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna Direita: Sidebar Lateral Slim (w-[260px] xl:w-[280px]) */}
                <aside className="w-full lg:w-[260px] xl:w-[280px] shrink-0 sticky top-28 self-start flex flex-col gap-5">
                  {/* Card DETAILS */}
                  <div className="rounded-xl bg-[#F8FAFC] border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
                      {t.detailsTitle}
                    </span>

                    <div className="flex flex-col gap-2.5 text-xs font-roboto divide-y divide-slate-100">
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-slate-400 font-medium">{t.dateLabel}</span>
                        <span className="text-slate-800 font-semibold">{shortDate}</span>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <span className="text-slate-400 font-medium">{t.categoryLabel}</span>
                        <span className="text-[#014263] font-semibold max-w-[130px] text-right truncate">
                          {primaryCategory}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <span className="text-slate-400 font-medium">{t.readingLabel}</span>
                        <span className="text-slate-800 font-semibold">{readingTime}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-slate-400 font-medium">{t.portalLabel}</span>
                        <span className="text-[#007EA7] font-semibold">{t.portalVal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card AUTHOR */}
                  <div className="rounded-xl bg-[#F8FAFC] border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
                      {t.authorTitle}
                    </span>

                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#013149] text-[#00D9FF] flex items-center justify-center font-zen-dots text-[10px] font-bold border border-[#67A7D5]/40 shrink-0 shadow-xs">
                        SX
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-roboto font-bold text-slate-800">
                          {t.defaultAuthor}
                        </span>
                        <span className="text-[10px] font-roboto text-[#007EA7] font-semibold">
                          {t.defaultAuthorRole}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 font-roboto font-light leading-relaxed">
                      {t.defaultAuthorBio}
                    </p>
                  </div>

                  {/* Card Callout SkyX Solutions */}
                  <div className="rounded-xl bg-[#010D13] border border-[#013149] p-5 shadow-md text-white relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      style={{ backgroundImage: "url('/img/card_case_1.png')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010D13] via-[#010D13]/85 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-start gap-2">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#00D9FF] bg-[#013149]/90 px-2 py-0.5 rounded-md border border-[#67A7D5]/40">
                        SKYX TECH
                      </span>

                      <h4 className="font-zen-dots text-sm text-white leading-snug">
                        {t.ctaTitle}
                      </h4>

                      <p className="text-[11px] text-gray-300 font-roboto font-light leading-relaxed">
                        {t.ctaDesc}
                      </p>

                      <Link
                        href="/#contato"
                        className="mt-1.5 inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#013149] to-[#011d2e] text-white border border-[#67A7D5]/40 hover:border-[#67A7D5] hover:shadow-[0_0_15px_rgba(103,167,213,0.3)] transition-all text-xs font-roboto font-semibold tracking-wide"
                      >
                        {t.ctaBtn} &rarr;
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            {/* 4. Notícias Relacionadas / Sugestões de Leitura */}
            {relatedNews.length > 0 && (
              <section className="bg-white border-t border-slate-200/80 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl sm:text-2xl font-zen-dots text-[#014263]">
                      {t.relatedTitle}
                    </h3>
                    <Link
                      href="/noticias"
                      className="text-xs font-roboto font-semibold text-[#014263] hover:text-[#67A7D5] transition-colors flex items-center gap-1"
                    >
                      <span>{t.backToNews}</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {relatedNews.map((item) => (
                      <Link
                        key={item.id}
                        href={`/noticias/${item.id}`}
                        className="group flex flex-col bg-[#FAFBFD] rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-[#67A7D5]/60 transition-all duration-300"
                      >
                        <div className="relative aspect-[16/10] w-full bg-slate-200 overflow-hidden">
                          <Image
                            src={
                              item.image ||
                              'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?w=600&h=400&fit=crop'
                            }
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                            className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        </div>
                        <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                          <div>
                            <span className="text-[11px] font-roboto font-semibold uppercase tracking-wider text-[#67A7D5] mb-2 block">
                              {new Date(item.createdAt).toLocaleDateString(locale, {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                            <h4 className="font-roboto font-bold text-slate-800 group-hover:text-[#014263] transition-colors line-clamp-2 text-base leading-snug">
                              {formatEditorialTitle(item.title)}
                            </h4>
                          </div>
                          <span className="text-xs font-roboto font-semibold text-[#014263] group-hover:text-[#67A7D5] transition-colors mt-5 flex items-center gap-1.5">
                            {t.readArticle} &rarr;
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </motion.article>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
