'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const translations = {
  PT: {
    nav: ['Sobre nós', 'Cases', 'Blog', 'Contato', 'Streaming'],
    pillars: [
      '● DESENVOVIMENTO E INOVAÇÃO',
      '● EDUCAÇÃO E ACESSIBILIDADE',
      '● CRIATIVIDADE E SEGURANÇA',
    ],
    copyright: '© 2026 Sky X. Todos os direitos reservados',
    terms: 'Termos de serviço',
    privacy: 'Política de privacidade',
  },
  EN: {
    nav: ['About Us', 'Cases', 'Blog', 'Contact', 'Streaming'],
    pillars: [
      '● DEVELOPMENT AND INNOVATION',
      '● EDUCATION AND ACCESSIBILITY',
      '● CREATIVITY AND SECURITY',
    ],
    copyright: '© 2026 Sky X. All rights reserved',
    terms: 'Terms of service',
    privacy: 'Privacy policy',
  },
};

interface FooterProps {
  lang?: 'PT' | 'EN';
}

export function SiteFooter({ lang = 'PT' }: FooterProps) {
  const t = translations[lang];
  const navItems = t.nav;

  const sectionMap: Record<string, string> = {
    'Sobre nós': 'about',
    'About Us': 'about',
    Cases: 'cases',
    Blog: 'news',
    Contato: 'contato',
    Contact: 'contato',
    Streaming: 'showcase',
  };

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, itemName: string) => {
    e.preventDefault();
    const sectionId = sectionMap[itemName];
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const targetPosition = section.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1200; // 1.2s para uma animação luxuosa
        let start: number | null = null;

        const easeInOutQuart = (time: number, begin: number, change: number, duration: number) => {
          const normalizedTime = time / (duration / 2);
          if (normalizedTime < 1) return (change / 2) * normalizedTime ** 4 + begin;
          return (-change / 2) * ((normalizedTime - 2) ** 4 - 2) + begin;
        };

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          } else {
            window.scrollTo(0, targetPosition);
          }
        };

        requestAnimationFrame(animation);
      }
    }
  };

  const socialLinks = [
    { name: 'Instagram', icon: '/svg/instagram.svg', url: 'https://www.instagram.com' },
    { name: 'LinkedIn', icon: '/svg/linkedin.svg', url: 'https://www.linkedin.com' },
    { name: 'Github', icon: '/svg/github.svg', url: 'https://github.com' },
  ];

  return (
    <footer
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-6"
      style={{
        background: 'linear-gradient(180deg, #02202F 0%, #000D13 100%)',
        paddingTop: 60,
        paddingBottom: 60,
      }}
    >
      <motion.div
        className="flex flex-col items-center justify-start gap-16 md:gap-[116px] w-full max-w-[1200px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center justify-center gap-16 w-full">
          {/* Topo: Logo e Pilares */}
          <div className="flex flex-col items-center justify-center gap-[26px] w-full">
            <div className="relative w-[200px] h-[55px] md:w-[428px] md:h-[114px]">
              <Image
                src="/img/logo_footer.png"
                alt="SkyX Logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 w-full max-w-[855px] text-center">
              <div
                style={{
                  color: 'white',
                  fontSize: 'clamp(12px, 3vw, 16px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 400,
                }}
              >
                {t.pillars[0]}
              </div>
              <div
                style={{
                  color: 'white',
                  fontSize: 'clamp(12px, 3vw, 16px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 400,
                }}
              >
                {t.pillars[1]}
              </div>
              <div
                style={{
                  color: 'white',
                  fontSize: 'clamp(12px, 3vw, 16px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 400,
                }}
              >
                {t.pillars[2]}
              </div>
            </div>
          </div>

          {/* Menu de Navegação */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-[72px] w-full">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${sectionMap[item]}`}
                onClick={(e) => handleNavClick(e, item)}
                className="hover:text-[#67A7D5] transition-colors duration-300"
                style={{
                  color: 'white',
                  fontSize: 'clamp(16px, 4vw, 24px)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Ícones Sociais (Placeholders prontos para receber as SVGs) */}
          <div className="flex justify-center items-center gap-[32px]">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-[45px] h-[45px] hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden"
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

        {/* Copyright & Termos Legais */}
        <div className="flex flex-col items-center justify-center gap-[32px] w-full pt-4">
          <div
            style={{
              color: 'white',
              fontSize: 24,
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            {t.copyright}
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-[32px] text-center px-4">
            <a
              href="/"
              className="hover:text-gray-300 transition-colors"
              style={{
                color: 'white',
                fontSize: 15,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                textDecoration: 'underline',
              }}
            >
              {t.terms}
            </a>
            <a
              href="/"
              className="hover:text-gray-300 transition-colors"
              style={{
                color: 'white',
                fontSize: 15,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                textDecoration: 'underline',
              }}
            >
              {t.privacy}
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
