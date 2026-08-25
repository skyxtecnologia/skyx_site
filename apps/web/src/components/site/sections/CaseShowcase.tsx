'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

interface Project {
  id: number | string;
  title: string;
  description: string;
  image: string;
  link?: string | null;
}

export function CaseShowcase({ lang = 'PT' }: { lang?: 'PT' | 'EN' | 'ES' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCasesFromDB = async () => {
      try {
        const res = await api.get('/api/cases');
        const casesData = res.data;
        if (casesData && casesData.length > 0) {
          const featured = casesData.filter((c: { isFeatured: boolean }) => c.isFeatured);
          const casesToShow = featured.length > 0 ? featured : casesData;

          setDbProjects(
            casesToShow.map(
              (c: {
                id: string;
                title: string;
                summary?: string;
                description: string;
                image?: string;
                link?: string;
              }) => ({
                id: c.id,
                title: c.title,
                description: c.summary || c.description,
                image:
                  c.image ||
                  'https://images.unsplash.com/photo-1633356122544-f134ef2944f0?w=800&q=80',
                link: c.link,
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

  const currentProject = projects.length > 0 ? projects[currentIndex] : null;

  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden" id="cases">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#014263]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-zen-dots text-white drop-shadow-md mb-4">
            CASES <span className="text-[#67a7d5]">SKYX</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="w-full h-[400px] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="w-full h-[400px] flex flex-col items-center justify-center bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md">
            <p className="text-gray-400 text-lg">Novos cases serão publicados em breve.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-12">
            <div className="relative w-full max-w-[800px] mx-auto h-[400px] md:h-[500px] flex items-center justify-center perspective-[1000px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 100 : -100,
                    rotateY: direction > 0 ? 15 : -15,
                  }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -100 : 100,
                    rotateY: direction > 0 ? -15 : 15,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 flex flex-col items-center gap-6 bg-black rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl"
                >
                  {/* Image Area - taking most of the card */}
                  <div className="w-full flex-grow relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(1,66,99,0.3)] group bg-[#020c1b]">
                    {currentProject?.image && (
                      <Image
                        src={currentProject.image}
                        alt={currentProject.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                        unoptimized
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Embedded Text overlay inside the card */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <h3 className="text-3xl md:text-5xl font-zen-dots text-white mb-2 leading-tight">
                        {currentProject?.title}
                      </h3>
                      <p className="text-gray-300 font-roboto font-light text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                        {currentProject?.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={prevProject}
                    className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#014263] hover:text-white transition-colors z-20 shadow-xl"
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    onClick={nextProject}
                    className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#014263] hover:text-white transition-colors z-20 shadow-xl"
                  >
                    &rarr;
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-center mt-8">
              <Link
                href="/cases"
                className="px-8 py-4 bg-gradient-to-r from-[#013149] to-[#000d13] text-white rounded-xl border border-white/10 font-roboto font-medium text-xl md:text-2xl tracking-wide hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all"
              >
                Explore o futuro
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
