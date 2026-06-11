'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface News {
  id: string;
  title: string;
  description: string;
  image: string | null;
  content?: string | null;
  tags?: string | null;
  createdAt: string;
}

export default function NoticiaDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [news, setNews] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get<News[]>('/api/news');
        const found = response.data.find((n: News) => n.id === id);
        if (found) setNews(found);
      } catch (err) {
        console.error('Erro ao buscar notícia:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  // MOCK: Conteúdo rico e extenso para visualizarmos o layout de um blog profissional.
  const defaultBody = ['O conteúdo completo desta notícia ainda não foi adicionado.'];

  // Separa o texto do banco por quebras de linha para criar parágrafos
  const paragraphs = news?.content
    ? news.content.split('\n').filter((p) => p.trim() !== '')
    : defaultBody;

  // Transforma o texto separado por vírgula num Array de Tags
  const displayTags = news?.tags ? news.tags.split(',').map((t) => t.trim()) : ['SkyX Insights'];

  return (
    <div className="bg-white min-h-screen text-dark">
      {/* Header Fixo Idêntico ao da Listagem */}
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

        <Link
          href="/noticias"
          className="text-gray-300 hover:text-white font-roboto text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>&larr;</span> Voltar para Notícias
        </Link>
      </header>

      <main className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-[#013149] text-lg font-roboto animate-pulse">
                Carregando artigo...
              </p>
            </div>
          ) : !news ? (
            <div className="flex flex-col justify-center items-center py-32 text-center">
              <h2 className="text-3xl font-bold text-[#013149] mb-4 font-zen-dots">
                Artigo não encontrado
              </h2>
              <p className="text-gray-500 mb-8 font-roboto">
                A notícia que você procura pode ter sido movida ou excluída.
              </p>
              <Link
                href="/noticias"
                className="bg-[#014263] text-white px-6 py-3 rounded-lg hover:bg-[#67A7D5] transition-colors font-roboto"
              >
                Retornar ao início
              </Link>
            </div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Cabeçalho do Artigo */}
              <header className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#014263] font-zen-dots mb-6 leading-tight">
                  {news.title}
                </h1>
                <div className="flex justify-center items-center gap-4 text-sm text-gray-500 font-roboto uppercase tracking-widest font-semibold">
                  <span>Publicado em {new Date(news.createdAt).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {displayTags.map((tag) => (
                      <span key={tag} className="text-[#67A7D5]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </header>

              {/* Imagem de Destaque */}
              <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden mb-12 shadow-[0_10px_40px_rgba(1,66,99,0.15)] border border-gray-100">
                <Image
                  src={
                    news.image ||
                    'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?w=1200&h=600&fit=crop'
                  }
                  alt={news.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Resumo da Notícia (Olho do texto) */}
              <p className="text-xl text-[#014263] font-roboto font-medium leading-relaxed mb-10 pb-10 border-b border-gray-200 italic">
                &quot;{news.description}&quot;
              </p>

              {/* Corpo Dinâmico da Notícia */}
              <div className="space-y-6">
                {paragraphs.map((paragraph, idx) => (
                  <p
                    // biome-ignore lint/suspicious/noArrayIndexKey: Array de strings simples
                    key={idx}
                    className="text-lg text-gray-700 font-roboto leading-loose text-justify md:text-left"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          )}
        </div>
      </main>
    </div>
  );
}
