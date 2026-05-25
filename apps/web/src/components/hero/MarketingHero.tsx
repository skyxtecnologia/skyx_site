'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface MarketingHeroProps {
  backgroundImage?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function MarketingHero({
  backgroundImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=900&fit=crop',
  title,
  description,
  buttonText,
  buttonHref,
}: MarketingHeroProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src={backgroundImage} alt="Hero background" fill className="object-cover" priority />
        {/* Dark overlay gradient - stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-dark/95" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl px-6 sm:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>

        {/* Button */}
        {buttonText && buttonHref && (
          <motion.a
            href={buttonHref}
            className="inline-block px-10 py-3 bg-primary text-dark font-bold rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/40 hover:shadow-primary/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}
