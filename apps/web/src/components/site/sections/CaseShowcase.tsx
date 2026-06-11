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

const translations = {
  PT: {
    title: 'CASES SKYX',
    button: 'Ver todos os cases',
    emptyMsg: 'Novos cases de sucesso serão publicados em breve.',
    loadingMsg: 'Carregando projetos...',
  },
  EN: {
    title: 'SKYX CASES',
    button: 'View all cases',
    emptyMsg: 'New success cases will be published soon.',
    loadingMsg: 'Loading projects...',
  },
} as const;

interface CaseShowcaseProps {
  title?: string;
  projects?: Project[];
  // Compatibilidade com o page.tsx atual
  caseTitle?: string;
  description?: string;
  image?: string;
  lang?: 'PT' | 'EN';
}

export function CaseShowcase({ title, projects, lang = 'PT' }: CaseShowcaseProps) {
  const t = translations[lang];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = avançar, -1 = voltar

  // Busca dados dinâmicos do Banco de Dados
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCasesFromDB = async () => {
      try {
        const res = await api.get('/api/cases');
        const casesData = res.data;
        if (casesData && casesData.length > 0) {
          // Prioriza os que estão marcados como destaque, senão pega todos
          const featured = casesData.filter((c: { isFeatured: boolean }) => c.isFeatured);
          const casesToShow = featured.length > 0 ? featured : casesData;

          setDbProjects(
            casesToShow.map(
              (c: {
                id: string;
                title: string;
                description: string;
                image: string | null;
                link: string | null;
              }) => ({
                id: c.id,
                title: c.title,
                description: c.description,
                image:
                  c.image ||
                  'https://images.unsplash.com/photo-1633356122544-f134ef2944f0?w=600&h=500&fit=crop',
                link: c.link,
              })
            )
          );
        }
      } catch (err) {
        console.error('Erro ao buscar cases do banco de dados:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCasesFromDB();
  }, []);

  // Usa projetos da prop (se houver) ou os que vieram do banco
  const finalProjects = projects || dbProjects;
  const hasMultiple = finalProjects.length > 1;

  const nextProject = () => {
    setDirection(1);
    if (finalProjects.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % finalProjects.length);
    }
  };

  const prevProject = () => {
    setDirection(-1);
    if (finalProjects.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + finalProjects.length) % finalProjects.length);
    }
  };

  const currentProject = finalProjects.length > 0 ? finalProjects[currentIndex] : null;
  const prevProjectData =
    finalProjects.length > 0
      ? finalProjects[(currentIndex - 1 + finalProjects.length) % finalProjects.length]
      : null;
  const nextProjectData =
    finalProjects.length > 0 ? finalProjects[(currentIndex + 1) % finalProjects.length] : null;

  return (
    <div
      id="cases"
      style={{
        width: '100%',
        minHeight: '100vh',
        paddingTop: 40,
        paddingBottom: 40,
        background: 'white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1491px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 32,
        }}
      >
        {/* Título Principal */}
        <div
          style={{
            alignSelf: 'stretch',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              color: '#014263',
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontFamily: "'Zen Dots', sans-serif",
              fontWeight: '400',
              wordWrap: 'break-word',
            }}
          >
            {title || t.title}
          </div>
        </div>

        {/* Estado de Carregamento / Vazio */}
        {isLoading ? (
          <div className="flex justify-center items-center w-full min-h-[300px]">
            <p className="text-[#014263] text-xl font-roboto text-center animate-pulse">
              {t.loadingMsg}
            </p>
          </div>
        ) : finalProjects.length === 0 ? (
          <div className="flex justify-center items-center w-full min-h-[300px]">
            <p className="text-[#5B5B5B] text-lg font-roboto text-center font-light">
              {t.emptyMsg}
            </p>
          </div>
        ) : (
          <>
            {currentProject && prevProjectData && nextProjectData && (
              <div
                style={{
                  width: '100%',
                  maxWidth: 1491,
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 32,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignContent: 'center',
                  minHeight: 400,
                }}
              >
                {/* Elementos Laterais (Anteriores e Próximos) */}
                {hasMultiple && (
                  <div
                    className="hidden lg:flex"
                    style={{
                      width: '100%',
                      maxWidth: 1264,
                      position: 'absolute',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      top: 40,
                      zIndex: 0,
                    }}
                  >
                    {/* Esquerda */}
                    <button
                      type="button"
                      onClick={prevProject}
                      style={{
                        height: 176,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 10,
                        display: 'inline-flex',
                        cursor: 'pointer',
                        opacity: 0.6,
                        transition: 'opacity 0.3s',
                      }}
                      className="hover:opacity-100"
                    >
                      <div
                        style={{
                          width: 352,
                          flex: '1 1 0',
                          background: '#D9D9D9',
                          borderRadius: 16,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={prevProjectData.id}
                            initial={{ opacity: 0, x: direction === 1 ? 30 : -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction === 1 ? -30 : 30 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                          >
                            <Image
                              src={prevProjectData.image}
                              alt={prevProjectData.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </button>

                    {/* Direita */}
                    <button
                      type="button"
                      onClick={nextProject}
                      style={{
                        height: 176,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 10,
                        display: 'inline-flex',
                        cursor: 'pointer',
                        opacity: 0.6,
                        transition: 'opacity 0.3s',
                      }}
                      className="hover:opacity-100"
                    >
                      <div
                        style={{
                          width: 352,
                          flex: '1 1 0',
                          background: '#D9D9D9',
                          borderRadius: 16,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={nextProjectData.id}
                            initial={{ opacity: 0, x: direction === 1 ? 30 : -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction === 1 ? -30 : 30 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                          >
                            <Image
                              src={nextProjectData.image}
                              alt={nextProjectData.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </button>
                  </div>
                )}

                {/* Card Principal */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: 496,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: 10,
                    display: 'flex',
                    zIndex: 10,
                    padding: '0 16px',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProject.id}
                      initial={{ opacity: 0, x: direction === 1 ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        width: '100%',
                      }}
                    >
                      {/* Imagem */}
                      <div
                        style={{
                          width: '100%',
                          maxWidth: 496,
                          height: 256,
                          background: 'black',
                          borderRadius: 16,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src={currentProject.image}
                          alt={currentProject.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Conteúdo */}
                      <div
                        style={{
                          width: '100%',
                          maxWidth: 496,
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-start',
                          gap: 12,
                          display: 'flex',
                        }}
                      >
                        <div
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            gap: 12,
                            display: 'flex',
                            width: '100%',
                          }}
                        >
                          <div
                            style={{
                              width: '100%',
                              color: '#014263',
                              fontSize: 'clamp(22px, 5vw, 28px)',
                              fontFamily: "'Zen Dots', sans-serif",
                              fontWeight: '400',
                              wordWrap: 'break-word',
                            }}
                          >
                            {currentProject.title}
                          </div>
                          <div
                            style={{
                              width: '100%',
                              color: '#5B5B5B',
                              fontSize: 'clamp(16px, 4vw, 20px)',
                              fontFamily: "'Roboto', sans-serif",
                              fontWeight: '300',
                              lineHeight: '1.5',
                              wordWrap: 'break-word',
                            }}
                          >
                            {currentProject.description}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Controles Mobile (Apenas setinhas de < e > no celular) */}
                  {hasMultiple && (
                    <div className="lg:hidden flex justify-between w-full mt-6">
                      <button
                        type="button"
                        onClick={prevProject}
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-[#014263] text-[#014263]"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={nextProject}
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-[#014263] text-[#014263]"
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Botão Ver Todos os Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center w-full"
            >
              <Link
                href="/cases"
                className="group border border-[#014263] text-[#014263] px-6 py-2.5 rounded-lg text-sm font-roboto font-medium hover:bg-[#014263] hover:text-white transition-colors duration-300 shadow-sm"
              >
                {t.button}
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
