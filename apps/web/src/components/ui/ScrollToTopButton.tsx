'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 300);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#010D13]/80 backdrop-blur-md border border-white/10 hover:bg-[#014263]/80 hover:shadow-[0_0_20px_rgba(1,66,99,0.5)] transition-all ${
        !isVisible ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
      }`}
      aria-label="Voltar ao topo"
    >
      {/* Círculo de Progresso */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <title>Anel de Progresso</title>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="4"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#67a7d5"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength: scaleProgress }}
        />
      </svg>
      {/* Ícone de Seta para cima */}
      <svg
        className="w-6 h-6 text-white relative z-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        <title>Voltar ao Topo</title>
      </svg>
    </motion.button>
  );
}
