'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  PT: {
    tag: 'Tecnologia VR 360º',
    title: 'Cápsula',
    titleGradient: 'Imersiva',
    desc: 'A tecnologia definitiva para quem deseja se destacar. Criamos um ambiente de Realidade Virtual onde seu público pode se desligar do mundo exterior e vivenciar conteúdos de forma profunda e memorável.',
    cards: [
      {
        title: 'Educação',
        desc: 'Treinamentos hiper-realistas e ambientes de simulação que aceleram o aprendizado.',
      },
      {
        title: 'Imersão Empresarial',
        desc: 'Apresentações B2B impactantes, tours virtuais de produtos e retenção comercial.',
      },
      {
        title: 'Eventos & Feiras',
        desc: 'Seja o destaque de qualquer evento, engajando o público e fortalecendo sua marca.',
      },
    ],
    cta: 'Leve a Cápsula para sua Empresa',
  },
  EN: {
    tag: '360º VR Technology',
    title: 'Immersive',
    titleGradient: 'Capsule',
    desc: 'The definitive technology for those who want to stand out. We create a Virtual Reality environment where your audience can disconnect from the outside world and experience content in a deep and memorable way.',
    cards: [
      {
        title: 'Education',
        desc: 'Hyper-realistic training and simulation environments that accelerate learning.',
      },
      {
        title: 'Business Immersion',
        desc: 'Impactful B2B presentations, virtual product tours, and commercial retention.',
      },
      {
        title: 'Events & Fairs',
        desc: 'Stand out at any event, engaging the audience and strengthening your brand.',
      },
    ],
    cta: 'Bring the Capsule to your Company',
  },
  ES: {
    tag: 'Tecnología VR 360º',
    title: 'Cápsula',
    titleGradient: 'Inmersiva',
    desc: 'La tecnología definitiva para quienes desean destacar. Creamos un entorno de Realidad Virtual donde tu público puede desconectarse del mundo exterior y experimentar contenidos de forma profunda y memorable.',
    cards: [
      {
        title: 'Educación',
        desc: 'Entrenamientos hiperrealistas y entornos de simulación que aceleran el aprendizaje.',
      },
      {
        title: 'Inmersión Empresarial',
        desc: 'Presentaciones B2B impactantes, recorridos virtuales de productos y retención comercial.',
      },
      {
        title: 'Eventos y Ferias',
        desc: 'Sé el centro de atención en cualquier evento, atrayendo al público y fortaleciendo tu marca.',
      },
    ],
    cta: 'Lleva la Cápsula a tu Empresa',
  },
};

export function CapsuleSection() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section
      className="relative w-full min-h-screen py-32 bg-[#050505] overflow-hidden flex items-center"
      id="capsula"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#014263]/10 rounded-full blur-[150px] -translate-y-1/2 mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#67a7d5]/5 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* items-stretch para garantir a mesma altura nos dois lados na versão lg */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 w-full">
        {/* Left Side: Images/Media */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center relative min-h-[400px] lg:min-h-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Capsule Image - Ocupa 100% da altura esticada */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(1,66,99,0.3)] border border-white/10 group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1000')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

            {/* Decoração Tech */}
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#67a7d5]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#67a7d5]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#67a7d5]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#67a7d5]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 py-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-full flex flex-col items-center lg:items-start">
            {/* Tag movida para o lado direito para melhor distribuição */}
            <span className="px-4 py-1.5 bg-[#014263]/60 backdrop-blur-md text-blue-300 text-xs font-bold uppercase tracking-widest rounded-full mb-6 inline-block font-roboto border border-[#67a7d5]/30">
              {t.tag}
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-zen-dots text-white mb-6 leading-tight">
              {t.title} <br className="hidden lg:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#014263] to-[#67a7d5]">
                {t.titleGradient}
              </span>
            </h2>
            <p className="text-gray-300 font-roboto text-lg leading-relaxed mb-4 font-light max-w-2xl mx-auto lg:mx-0">
              {t.desc}
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full flex-grow justify-center">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-[#014263]/20 hover:border-[#67a7d5]/50 transition-all duration-300 flex items-center gap-4 group text-left">
              <div className="w-14 h-14 rounded-full bg-[#014263]/30 flex items-center justify-center shrink-0 border border-[#67a7d5]/30 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-[#67a7d5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                  <title>Ícone de Educação</title>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1 font-zen-dots">
                  {t.cards[0].title}
                </h4>
                <p className="text-gray-400 font-roboto text-sm font-light">{t.cards[0].desc}</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-[#014263]/20 hover:border-[#67a7d5]/50 transition-all duration-300 flex items-center gap-4 group text-left">
              <div className="w-14 h-14 rounded-full bg-[#014263]/30 flex items-center justify-center shrink-0 border border-[#67a7d5]/30 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-[#67a7d5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                  <title>Ícone de Imersão Empresarial</title>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1 font-zen-dots">
                  {t.cards[1].title}
                </h4>
                <p className="text-gray-400 font-roboto text-sm font-light">{t.cards[1].desc}</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-[#014263]/20 hover:border-[#67a7d5]/50 transition-all duration-300 flex items-center gap-4 group text-left">
              <div className="w-14 h-14 rounded-full bg-[#014263]/30 flex items-center justify-center shrink-0 border border-[#67a7d5]/30 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-[#67a7d5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                  <title>Ícone de Eventos</title>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1 font-zen-dots">
                  {t.cards[2].title}
                </h4>
                <p className="text-gray-400 font-roboto text-sm font-light">{t.cards[2].desc}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="px-10 py-4 bg-gradient-to-r from-[#013149] to-[#000d13] text-white font-roboto font-medium tracking-[0.5px] rounded-xl hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all duration-300 mt-2 border border-white/10 text-lg w-full sm:w-auto"
          >
            {t.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
