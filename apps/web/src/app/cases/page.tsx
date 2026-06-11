'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Case {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  year?: string | null;
  client?: string | null;
  tags?: string | null;
  technologies?: string | null;
  gallery?: string | null;
}

interface CaseExtended extends Omit<Case, 'year' | 'client' | 'tags' | 'technologies' | 'gallery'> {
  year: string;
  client: string;
  tags: string[];
  technologies: string[];
  gallery: string[];
}

const translations = {
  PT: {
    backToSite: 'Voltar ao site',
    loadingMsg: 'Carregando cases...',
    emptyMsg: 'Nenhum case publicado no momento.',
    client: 'Cliente:',
    year: 'Ano:',
    tech: 'Tecnologias:',
    explore: 'Explorar Projeto',
    gallery: 'Galeria',
  },
  EN: {
    backToSite: 'Back to site',
    loadingMsg: 'Loading cases...',
    emptyMsg: 'No cases published at the moment.',
    client: 'Client:',
    year: 'Year:',
    tech: 'Technologies:',
    explore: 'Explore Project',
    gallery: 'Gallery',
  },
} as const;

export default function CasesPage() {
  const [lang, setLang] = useState<'PT' | 'EN'>('PT');
  const t = translations[lang];
  const [casesList, setCasesList] = useState<CaseExtended[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGallery, setActiveGallery] = useState<{
    items: string[];
    currentIndex: number;
  } | null>(null);

  const nextGalleryItem = () => {
    if (!activeGallery) return;
    setActiveGallery({
      ...activeGallery,
      currentIndex: (activeGallery.currentIndex + 1) % activeGallery.items.length,
    });
  };

  const prevGalleryItem = () => {
    if (!activeGallery) return;
    setActiveGallery({
      ...activeGallery,
      currentIndex:
        (activeGallery.currentIndex - 1 + activeGallery.items.length) % activeGallery.items.length,
    });
  };

  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<Case[]>('/api/cases');

        // Função auxiliar para evitar split incorreto de base64 na galeria
        const parseGalleryStr = (str: string | null | undefined): string[] => {
          if (!str) return [];
          const parts: string[] = [];
          let current = '';
          for (let i = 0; i < str.length; i++) {
            if (str[i] === ',' && !current.trim().toLowerCase().endsWith('base64')) {
              parts.push(current.trim());
              current = '';
            } else {
              current += str[i];
            }
          }
          if (current.trim()) parts.push(current.trim());
          return parts.filter(Boolean);
        };

        // Transforma o texto do banco em Arrays limpos para a interface
        const extended = response.data.map((c) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          image: c.image,
          link: c.link,
          year: c.year || '2024',
          client: c.client || 'SkyX Tecnologia',
          tags: c.tags
            ? c.tags
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean)
            : ['Inovação'],
          technologies: c.technologies
            ? c.technologies
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean)
            : ['Tech'],
          gallery: c.gallery
            ? parseGalleryStr(c.gallery)
            : c.image
              ? [c.image]
              : [
                  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop',
                ],
        }));

        setCasesList(extended);
      } catch (err) {
        console.error('Erro ao buscar cases:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-dark min-h-screen flex items-center justify-center">
        <p className="text-[#67A7D5] text-xl font-roboto animate-pulse">{t.loadingMsg}</p>
      </div>
    );
  }

  if (casesList.length === 0) {
    return (
      <div className="bg-dark min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-gray-400 text-xl font-roboto">{t.emptyMsg}</p>
        <Link href="/" className="text-[#67A7D5] hover:text-white transition-colors">
          &larr; {t.backToSite}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-dark h-screen w-full overflow-hidden relative font-roboto">
      {/* Header Fixo Transparente */}
      <header className="fixed top-0 w-full px-6 lg:px-12 py-6 z-50 flex items-center justify-between pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <Image
            src="/img/logo_footer.png"
            alt="SkyX Logo"
            width={120}
            height={40}
            className="object-contain drop-shadow-md cursor-pointer hover:scale-105 transition-transform"
            priority
          />
        </Link>
        <div className="flex items-center gap-4 md:gap-6 pointer-events-auto">
          <button
            type="button"
            onClick={() => setLang(lang === 'PT' ? 'EN' : 'PT')}
            className="text-gray-300 hover:text-white font-roboto text-sm font-bold transition-colors uppercase drop-shadow-md"
          >
            {lang === 'PT' ? 'EN' : 'PT'}
          </button>
          <Link
            href="/"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300"
          >
            {t.backToSite}
          </Link>
        </div>
      </header>

      {/* Snap Container (Trava a rolagem a cada 100vh) */}
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar">
        {casesList.map((c) => (
          <section
            key={c.id}
            className="h-screen w-full snap-start relative flex flex-col justify-center"
          >
            {/* Background com Efeito Degradê Escuro Lateral */}
            <div className="absolute inset-0 z-0 bg-dark">
              <Image
                src={
                  c.image ||
                  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop'
                }
                alt={c.title}
                fill
                className="object-cover opacity-80"
                unoptimized
              />
              {/* Degradê cobrindo a esquerda para o texto ficar super legível */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#010D13] via-[#010D13]/80 to-transparent" />
              {/* Degradê embaixo e em cima */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010D13] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Conteúdo Principal (Alinhado à esquerda) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col pt-16 md:pt-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                {/* Tags Acima do Título */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {c.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#67A7D5]/20 border border-[#67A7D5]/30 text-[#67A7D5] text-xs font-bold uppercase tracking-widest rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Título Giga */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-zen-dots leading-tight drop-shadow-lg">
                  {c.title}
                </h2>

                {/* Info Rápida (Ano e Cliente) */}
                <div className="flex items-center gap-6 text-sm font-roboto text-gray-300 mb-8 font-medium">
                  <span className="text-white bg-white/10 border border-white/10 px-3 py-1 rounded">
                    {c.year}
                  </span>
                  <span className="flex items-center gap-2">
                    <strong className="text-gray-400 font-normal">{t.client}</strong> {c.client}
                  </span>
                </div>

                {/* Tecnologias */}
                <div className="flex items-center gap-3 flex-wrap mb-6">
                  <span className="text-gray-400 text-sm font-roboto mr-2">{t.tech}</span>
                  {c.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-white text-sm font-roboto font-bold tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Descrição */}
                <p className="text-base md:text-lg text-gray-300 font-roboto font-light leading-relaxed mb-8 max-w-xl drop-shadow-md line-clamp-4">
                  {c.description}
                </p>

                {/* Ação */}
                {c.link && c.link.trim() !== '' && c.link !== '#' && (
                  <div className="flex items-center gap-4">
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white text-dark px-8 py-3.5 rounded-lg font-bold font-roboto hover:bg-gray-200 hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <span className="text-lg">▶</span> {t.explore}
                    </a>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Mini Carrossel de Galeria (Canto Inferior Direito) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-10 right-6 lg:right-12 z-20 hidden md:flex flex-col gap-3 items-end"
            >
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pr-1">
                {t.gallery}
              </span>
              <div className="flex gap-4">
                {c.gallery.map((item: string, idx: number) => {
                  const isVideo =
                    item.startsWith('data:video/') || item.match(/\.(mp4|webm|ogg)$/i);
                  return (
                    // biome-ignore lint/suspicious/noArrayIndexKey: Lista de media estática
                    // biome-ignore lint/a11y/useKeyWithClickEvents: Pop-up da galeria
                    <div
                      key={`gallery-${c.id}-${idx}`}
                      onClick={() => setActiveGallery({ items: c.gallery, currentIndex: idx })}
                      className="relative w-40 h-24 rounded-lg overflow-hidden border-2 border-white/20 hover:border-[#67A7D5] transition-colors shadow-2xl group bg-black cursor-pointer"
                    >
                      {isVideo ? (
                        <video
                          src={item}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        >
                          <track kind="captions" />
                        </video>
                      ) : (
                        <Image
                          src={item}
                          alt={`Galeria ${idx}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>
        ))}
      </main>

      {/* Lightbox / Modal de Galeria */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center backdrop-blur-md"
          >
            {/* Fechar */}
            <button
              type="button"
              onClick={() => setActiveGallery(null)}
              className="absolute top-6 right-8 text-white/70 hover:text-white text-4xl transition-colors z-[110]"
            >
              &times;
            </button>

            {/* Controles de Navegação */}
            {activeGallery.items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevGalleryItem}
                  className="absolute left-6 md:left-12 text-white/50 hover:text-white text-5xl md:text-7xl transition-colors z-[110]"
                >
                  &#8249;
                </button>
                <button
                  type="button"
                  onClick={nextGalleryItem}
                  className="absolute right-6 md:right-12 text-white/50 hover:text-white text-5xl md:text-7xl transition-colors z-[110]"
                >
                  &#8250;
                </button>
              </>
            )}

            {/* Mídia em Destaque */}
            <div className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center px-12 md:px-24">
              {(() => {
                const currentItem = activeGallery.items[activeGallery.currentIndex];
                const isVideo =
                  currentItem.startsWith('data:video/') || currentItem.match(/\.(mp4|webm|ogg)$/i);
                return isVideo ? (
                  <video
                    src={currentItem}
                    controls
                    autoPlay
                    className="max-w-full max-h-full rounded-lg shadow-2xl"
                  >
                    <track kind="captions" />
                  </video>
                ) : (
                  <img
                    src={currentItem}
                    alt="Mídia da Galeria"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                );
              })()}
            </div>

            {/* Indicador de Imagem */}
            <div className="absolute bottom-10 text-white/50 text-sm font-roboto tracking-widest">
              {activeGallery.currentIndex + 1} / {activeGallery.items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS para esconder a barra de rolagem mantendo a função do scroll */}
      <style>
        {`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  );
}
