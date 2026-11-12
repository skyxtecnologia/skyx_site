'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: {
    eyebrow: 'Portfólio de Impacto',
    titlePrefix: 'CASES',
    titleHighlight: 'SKYX',
    subtitle: 'Conheça nossos projetos de impacto e inovação tecnológica',
    emptyMsg: 'Novos cases serão publicados em breve.',
    viewCaseBadge: 'Ver Case Completo →',
    viewAllBtn: 'Ver Cases',
    featuredBadge: 'Destaque',
    prevAria: 'Case anterior',
    nextAria: 'Próximo case',
    goToSlideAria: 'Ir para o case',
  },
  EN: {
    eyebrow: 'Impact Portfolio',
    titlePrefix: 'SKYX',
    titleHighlight: 'CASES',
    subtitle: 'Discover our high-impact projects and technological innovation',
    emptyMsg: 'New cases will be published soon.',
    viewCaseBadge: 'View Full Case →',
    viewAllBtn: 'View Cases',
    featuredBadge: 'Featured',
    prevAria: 'Previous case',
    nextAria: 'Next case',
    goToSlideAria: 'Go to case',
  },
  ES: {
    eyebrow: 'Portafolio de Impacto',
    titlePrefix: 'CASOS',
    titleHighlight: 'SKYX',
    subtitle: 'Conoce nuestros proyectos de impacto e innovación tecnológica',
    emptyMsg: 'Próximamente se publicarán nuevos casos.',
    viewCaseBadge: 'Ver Caso Completo →',
    viewAllBtn: 'Ver Casos',
    featuredBadge: 'Destacado',
    prevAria: 'Caso anterior',
    nextAria: 'Siguiente caso',
    goToSlideAria: 'Ir al caso',
  },
} as const;

interface Project {
  id: number | string;
  title: string;
  description: string;
  image: string;
  link?: string | null;
  isFeatured?: boolean;
  year?: string | null;
  client?: string | null;
  tags?: string[];
}

export function CaseShowcase({ lang = 'PT' }: { lang?: 'PT' | 'EN' | 'ES' }) {
  const t = translations[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCasesFromDB = async () => {
      try {
        const res = await api.get('/api/cases');
        const casesData = res.data;
        if (Array.isArray(casesData) && casesData.length > 0) {
          const featured = casesData.filter((c: { isFeatured?: boolean }) => c.isFeatured);
          const others = casesData.filter((c: { isFeatured?: boolean }) => !c.isFeatured);
          const casesToShow = [...featured, ...others];

          setDbProjects(
            casesToShow.map(
              (c: {
                id: string;
                title: string;
                summary?: string;
                description: string;
                image?: string;
                link?: string;
                isFeatured?: boolean;
                year?: string | null;
                client?: string | null;
                tags?: string | null;
              }) => ({
                id: c.id,
                title: c.title,
                description: c.summary || c.description,
                image:
                  c.image ||
                  'https://images.unsplash.com/photo-1633356122544-f134ef2944f0?w=800&q=80',
                link: c.link,
                isFeatured: c.isFeatured,
                year: c.year || null,
                client: c.client || null,
                tags: c.tags
                  ? c.tags
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                  : [],
              })
            )
          );
        }
      } catch (err) {
        console.error('Erro ao buscar cases:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCasesFromDB();
  }, []);

  const projects = dbProjects;
  const hasMultiple = projects.length > 1;

  const nextProject = () => {
    if (projects.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    if (projects.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const currentProject = projects.length > 0 ? projects[currentIndex] : null;
  const formattedCounter = `${String(currentIndex + 1).padStart(2, '0')} / ${String(
    projects.length
  ).padStart(2, '0')}`;

  return (
    <section
      className="relative w-full py-[55px] md:py-[89px] lg:py-[110px] scroll-mt-24 bg-white overflow-hidden"
      id="cases"
    >
      {/* Decorative Radial Glow (White theme, identical to NewsSection) */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #eff6ff 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #f1f5f9 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          className="text-center mb-[34px] md:mb-[55px] max-w-3xl flex flex-col items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
        >
          <h2
            className="font-zen-dots text-[#014263] mb-3 leading-[1.2]"
            style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)' }}
          >
            {t.titlePrefix} <span className="text-[#007EA7]">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-600 font-roboto text-base md:text-lg font-light">{t.subtitle}</p>
        </motion.div>

        {isLoading ? (
          <div className="w-full h-[420px] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#014263] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="w-full max-w-4xl h-[360px] flex flex-col items-center justify-center bg-slate-50 rounded-3xl border border-slate-200 px-6 text-center">
            <p className="text-slate-500 text-lg font-roboto">{t.emptyMsg}</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-[21px] md:gap-[34px]">
            <div className="relative w-full max-w-[880px] mx-auto h-[420px] md:h-[510px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                {currentProject && (
                  <motion.div
                    key={currentProject.id}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      x: direction > 0 ? 48 : -48,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: direction > 0 ? -48 : 48,
                    }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="absolute inset-0 flex flex-col bg-[#010D13] rounded-2xl p-4 md:p-6 border border-[#013149] hover:border-[#67a7d5]/80 shadow-[0_20px_50px_rgba(1,49,73,0.18)] transition-all duration-300"
                  >
                    <Link
                      href={`/cases?case=${currentProject.id}`}
                      className="w-full h-full flex-grow relative rounded-xl overflow-hidden shadow-[0_0_30px_rgba(1,66,99,0.3)] group bg-[#020c1b] cursor-pointer block"
                    >
                      <Image
                        src={currentProject.image}
                        alt={currentProject.title}
                        fill
                        sizes="(max-width: 880px) 100vw, 880px"
                        className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105 opacity-100"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#010D13]/90 via-[#010D13]/30 via-45% to-transparent" />

                      {/* Top Bar: Minimalist White Text Tags on Image */}
                      <div className="absolute top-5 left-6 right-6 flex items-center justify-between gap-3 z-10">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-roboto font-medium uppercase tracking-[0.18em] text-white/90 drop-shadow-md">
                          <span>{formattedCounter}</span>
                          {currentProject.year && (
                            <>
                              <span className="text-white/40">•</span>
                              <span>{currentProject.year}</span>
                            </>
                          )}
                          {currentProject.tags?.slice(0, 2).map((tag) => (
                            <span key={tag} className="hidden sm:inline-flex items-center gap-3">
                              <span className="text-white/40">•</span>
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>

                        <span className="text-xs font-roboto font-medium uppercase tracking-[0.16em] text-[#00d9ff] group-hover:text-white transition-colors duration-300 shrink-0 drop-shadow-md font-semibold">
                          {t.viewCaseBadge}
                        </span>
                      </div>

                      {/* Embedded Text overlay + Circular Action Button ↗ inside the card */}
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8 z-10">
                        <div className="flex flex-col max-w-2xl">
                          {currentProject.client && (
                            <span className="text-xs md:text-sm font-roboto uppercase tracking-widest text-[#67a7d5] font-semibold mb-1.5">
                              {currentProject.client}
                            </span>
                          )}
                          <h3
                            className="font-zen-dots text-white mb-2.5 leading-[1.25] group-hover:text-[#67a7d5] transition-colors duration-300"
                            style={{ fontSize: 'clamp(1.375rem, 3vw, 2.25rem)' }}
                          >
                            {currentProject.title}
                          </h3>
                          <p className="text-gray-200 font-roboto font-light text-sm md:text-base leading-[1.618] line-clamp-2 md:line-clamp-3">
                            {currentProject.description}
                          </p>
                        </div>

                        <div className="w-12 h-12 rounded-full bg-[#014263]/90 border border-[#67a7d5]/50 text-[#00d9ff] group-hover:bg-[#00d9ff] group-hover:text-[#010D13] group-hover:rotate-45 transition-all duration-300 flex items-center justify-center shrink-0 shadow-lg">
                          <span className="text-xl font-bold leading-none">&#8599;</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Controls (High Contrast for White Background) */}
              {hasMultiple && (
                <>
                  <button
                    type="button"
                    aria-label={t.prevAria}
                    onClick={prevProject}
                    className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/95 hover:bg-[#014263] text-[#014263] hover:text-white border border-slate-200/90 hover:border-[#67a7d5] rounded-full flex items-center justify-center transition-all z-20 shadow-lg hover:scale-105 cursor-pointer"
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    aria-label={t.nextAria}
                    onClick={nextProject}
                    className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/95 hover:bg-[#014263] text-[#014263] hover:text-white border border-slate-200/90 hover:border-[#67a7d5] rounded-full flex items-center justify-center transition-all z-20 shadow-lg hover:scale-105 cursor-pointer"
                  >
                    &rarr;
                  </button>
                </>
              )}
            </div>

            {/* Pagination Dots (Calibrated for White Background) */}
            {hasMultiple && (
              <div className="flex items-center justify-center gap-2.5 pt-1">
                {projects.map((proj, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      aria-label={`${t.goToSlideAria} ${idx + 1}`}
                      onClick={() => goToProject(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-8 bg-[#014263] shadow-md'
                          : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  );
                })}
              </div>
            )}

            <div className="flex justify-center pt-2">
              <Link
                href="/cases"
                className="px-8 py-3.5 bg-[#014263] hover:bg-[#67A7D5] text-white rounded-xl font-roboto font-medium text-base md:text-lg tracking-wide shadow-sm hover:shadow-md transition-all whitespace-nowrap cursor-pointer"
              >
                {t.viewAllBtn}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
