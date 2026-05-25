'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const translations = {
  PT: {
    title: 'CASES SKYX',
    button: 'Explore o futuro',
    projects: [
      {
        id: 1,
        title: 'CORTEXVR',
        description:
          'Solução revolucionária em realidade virtual para treinamento corporativo, oferecendo experiências imersivas e eficientes.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134ef2944f0?w=600&h=500&fit=crop',
      },
      {
        id: 2,
        title: 'Tecnologia que transforma',
        description:
          'A Sky X Tecnologia desenvolve soluções digitais sob medida, unindo inovação, tecnologia e educação para criar projetos inteligentes.',
        image: 'https://placehold.co/496x256',
      },
      {
        id: 3,
        title: 'Ambientes Inteligentes',
        description:
          'Criação de soluções tecnológicas para negócios e cidades, envolvendo automação de processos e análise de dados.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=500&fit=crop',
      },
    ],
  },
  EN: {
    title: 'SKYX CASES',
    button: 'Explore the future',
    projects: [
      {
        id: 1,
        title: 'CORTEXVR',
        description:
          'A revolutionary virtual reality solution for corporate training, offering immersive and efficient experiences.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134ef2944f0?w=600&h=500&fit=crop',
      },
      {
        id: 2,
        title: 'Technology that transforms',
        description:
          'Sky X Technology develops tailor-made digital solutions, uniting innovation, technology, and education to create smart projects.',
        image: 'https://placehold.co/496x256',
      },
      {
        id: 3,
        title: 'Smart Environments',
        description:
          'Creating technology solutions for businesses and cities, involving process automation and data analysis.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=500&fit=crop',
      },
    ],
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

export function CaseShowcase({
  title,
  projects,
  caseTitle,
  description,
  image,
  lang = 'PT',
}: CaseShowcaseProps) {
  const t = translations[lang];

  // Caso você passe as propriedades individualmente, mesclaremos com a lista de mock.
  const defaultProjects: Project[] = [...t.projects];
  const displayProjects =
    projects ||
    (caseTitle && description && image
      ? [{ id: 1, title: caseTitle, description, image }, ...defaultProjects.slice(1)]
      : defaultProjects);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = avançar, -1 = voltar

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayProjects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + displayProjects.length) % displayProjects.length
    );
  };

  const currentProject = displayProjects[currentIndex];
  const prevProjectData =
    displayProjects[(currentIndex - 1 + displayProjects.length) % displayProjects.length];
  const nextProjectData = displayProjects[(currentIndex + 1) % displayProjects.length];

  return (
    <div
      id="showcase"
      style={{
        width: '100%',
        minHeight: '100vh',
        paddingTop: 60,
        paddingBottom: 60,
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
          gap: 60,
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

        {/* Carrossel */}
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
            minHeight: 500,
          }}
        >
          {/* Elementos Laterais (Anteriores e Próximos) */}
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

                  {/* Botão Explore */}
                  <a
                    href="/"
                    className="group"
                    style={{
                      alignSelf: 'stretch',
                      height: 66,
                      paddingLeft: 24,
                      paddingRight: 24,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderRadius: 12,
                      outline: '1px #014263 solid',
                      outlineOffset: '-1px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      display: 'inline-flex',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#014263';
                      const child = e.currentTarget.firstChild as HTMLElement;
                      if (child) child.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      const child = e.currentTarget.firstChild as HTMLElement;
                      if (child) child.style.color = '#014263';
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                        color: '#014263',
                        fontSize: 'clamp(18px, 4vw, 24px)',
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: '400',
                        lineHeight: '1.2',
                        letterSpacing: 0.72,
                        wordWrap: 'break-word',
                        transition: 'color 0.3s',
                      }}
                    >
                      {t.button}
                    </div>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles Mobile (Apenas setinhas de < e > no celular) */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
