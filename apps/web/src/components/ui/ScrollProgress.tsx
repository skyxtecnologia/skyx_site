'use client';

import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleY: scrollYProgress,
        transformOrigin: 'top',
        background: 'linear-gradient(to bottom, #014263, #4B83FF)',
      }}
      className="fixed top-0 right-0 w-2 h-full z-[100] rounded-l-full opacity-80"
    />
  );
}
