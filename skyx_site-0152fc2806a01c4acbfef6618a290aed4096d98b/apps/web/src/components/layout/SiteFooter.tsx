'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const translations = {
  ES: {
    nav: ['Sobre nosotros', 'Servicios', 'Casos', 'Blog', 'Contacto', 'Streaming'],
    pillars: [
      '● DESARROLLO E INNOVACIÓN',
      '● EDUCACIÓN Y ACCESIBILIDAD',
      '● CREATIVIDAD Y SEGURIDAD',
    ],
    copyright: '© 2026 Sky X. Todos los derechos reservados',
    terms: 'Términos de servicio',
    privacy: 'Política de privacidad',
    company: 'Empresa',
    capsule: 'Cápsula Inmersiva',
    solutions: 'Soluciones',
    cases: 'Casos',
    impact: 'Impacto',
    contact: 'Contacto',
    contactTitle: 'Contacto',
    navTitle: 'Navegación',
    desc: 'Plataforma de innovación tecnológica y soluciones avanzadas.',
  },
  PT: {
    nav: ['Sobre nós', 'Serviços', 'Cases', 'Blog', 'Contato', 'Streaming'],
    pillars: [
      '● DESENVOVIMENTO E INOVAÇÃO',
      '● EDUCAÇÃO E ACESSIBILIDADE',
      '● CRIATIVIDADE E SEGURANÇA',
    ],
    copyright: '© 2026 Sky X. Todos os direitos reservados',
    terms: 'Termos de serviço',
    privacy: 'Política de privacidade',
    company: 'Empresa',
    capsule: 'Cápsula Imersiva',
    solutions: 'Soluções',
    cases: 'Cases',
    impact: 'Impacto',
    contact: 'Contato',
    contactTitle: 'Contato',
    navTitle: 'Navegação',
    desc: 'Plataforma de inovação tecnológica e soluções avançadas.',
  },
  EN: {
    nav: ['About Us', 'Services', 'Cases', 'Blog', 'Contact', 'Streaming'],
    pillars: [
      '● DEVELOPMENT AND INNOVATION',
      '● EDUCATION AND ACCESSIBILITY',
      '● CREATIVITY AND SECURITY',
    ],
    copyright: '© 2026 Sky X. All rights reserved',
    terms: 'Terms of service',
    privacy: 'Privacy policy',
    company: 'Company',
    capsule: 'Immersive Capsule',
    solutions: 'Solutions',
    cases: 'Cases',
    impact: 'Impact',
    contact: 'Contact',
    contactTitle: 'Contact',
    navTitle: 'Navigation',
    desc: 'Technology innovation platform and advanced solutions.',
  },
};

export function SiteFooter() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const socialLinks = [
    { name: 'Instagram', icon: '/svg/instagram.svg', url: 'https://www.instagram.com' },
    { name: 'LinkedIn', icon: '/svg/linkedin.svg', url: 'https://www.linkedin.com' },
    { name: 'Github', icon: '/svg/github.svg', url: 'https://github.com' },
  ];

  const navLinks = [
    { name: t.company, href: '/#sobre' },
    { name: t.capsule, href: '/#capsula' },
    { name: t.solutions, href: '/#solucoes' },
    { name: t.cases, href: '/cases' },
    { name: t.impact, href: '/#impacto' },
    { name: t.contact, href: '/#contato' },
  ];

  return (
    <footer
      className="relative w-full flex flex-col items-center justify-center overflow-hidden border-t border-white/10 pt-20 pb-10"
      style={{
        background: 'linear-gradient(180deg, #02202F 0%, #000D13 100%)',
      }}
    >
      <motion.div
        className="flex flex-col items-center justify-start gap-12 w-full max-w-7xl px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full place-items-center md:place-items-start">
          {/* Coluna 1: Logo e Pilares */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="relative w-[180px] h-[50px]">
              <Image
                src="/img/logo_footer.png"
                alt="SkyX Logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">{t.desc}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden opacity-60 hover:opacity-100"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-semibold text-lg mb-2 font-roboto">{t.navTitle}</h4>
            <nav className="flex flex-col gap-3 font-roboto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Coluna 3: Contato Rápido */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-semibold text-lg mb-2">{t.contactTitle}</h4>
            <p className="text-gray-400 text-sm">contato@skyxtecnologia.com.br</p>
            <p className="text-gray-400 text-sm">Brasil</p>
          </div>
        </div>

        {/* Copyright & Termos Legais */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full pt-8 border-t border-white/5">
          <p className="text-gray-500 text-sm text-center md:text-left">{t.copyright}</p>
          <div className="flex gap-6">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-300 transition-colors text-sm underline"
            >
              {t.terms}
            </a>
            <a
              href="/"
              className="text-gray-500 hover:text-gray-300 transition-colors text-sm underline"
            >
              {t.privacy}
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
