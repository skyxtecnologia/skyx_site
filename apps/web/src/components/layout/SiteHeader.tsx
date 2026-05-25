'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 w-full bg-dark/95 backdrop-blur-md border-b border-primary/10 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          SkyX
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8">
          <button type="button" className="text-white hover:text-primary transition">
            Produtos
          </button>
          <button type="button" className="text-white hover:text-primary transition">
            Cases
          </button>
          <button type="button" className="text-white hover:text-primary transition">
            Sobre
          </button>
          <button type="button" className="text-white hover:text-primary transition">
            Contato
          </button>
        </nav>

        <div className="hidden md:flex gap-4">
          <Link
            href="/login"
            className="px-6 py-2 text-primary border border-primary rounded hover:bg-primary/10 transition"
          >
            Login
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 bg-primary text-dark rounded font-semibold hover:bg-primary-dark transition"
          >
            Começar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-primary transition"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-dark border-t border-primary/10 px-6 py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col gap-4">
            <button type="button" className="text-white hover:text-primary transition text-left">
              Produtos
            </button>
            <button type="button" className="text-white hover:text-primary transition text-left">
              Cases
            </button>
            <button type="button" className="text-white hover:text-primary transition text-left">
              Sobre
            </button>
            <button type="button" className="text-white hover:text-primary transition text-left">
              Contato
            </button>
            <Link
              href="/login"
              className="px-4 py-2 text-primary border border-primary rounded text-center"
            >
              Login
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
