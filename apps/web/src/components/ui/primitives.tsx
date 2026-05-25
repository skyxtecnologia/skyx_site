'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedContainer({ children, className = '' }: AnimatedContainerProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
}

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function GlowButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
}: GlowButtonProps) {
  const baseClass = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300';

  const variantClass =
    variant === 'primary'
      ? 'bg-primary text-dark hover:bg-primary-dark glow-effect'
      : 'border-2 border-primary text-primary hover:bg-primary/10';

  const Comp = href ? 'a' : 'button';

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Comp href={href} onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
        {children}
      </Comp>
    </motion.div>
  );
}
