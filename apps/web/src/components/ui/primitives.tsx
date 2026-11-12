'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { type MouseEvent, type ReactNode, useRef } from 'react';

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

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(103, 167, 213, 0.18)',
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const rectRef = useRef<DOMRect | null>(null);

  function handleMouseEnter(e: MouseEvent<HTMLDivElement>) {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    mouseX.set(e.clientX - rectRef.current.left);
    mouseY.set(e.clientY - rectRef.current.top);
  }

  function handleMouseLeave() {
    rectRef.current = null;
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
