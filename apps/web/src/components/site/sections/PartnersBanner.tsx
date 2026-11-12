'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: {
    title: 'Nossos Parceiros',
  },
  EN: {
    title: 'Our Partners',
  },
  ES: {
    title: 'Nuestros Socios',
  },
} as const;

interface PartnerItem {
  id: string;
  name: string;
  image: string;
  isFeatured?: boolean;
}

// Cache em memória para renderização imediata sem flash
let memoryPartnersCache: PartnerItem[] | null = null;

export function PartnersBanner() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [dbPartners, setDbPartners] = useState<PartnerItem[]>(() => {
    if (memoryPartnersCache && memoryPartnersCache.length > 0) {
      return memoryPartnersCache;
    }
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('skyx_partners_cache');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            memoryPartnersCache = parsed;
            return parsed;
          }
        }
      } catch {
        // Fallback silencioso
      }
    }
    return [];
  });

  useEffect(() => {
    let isMounted = true;
    const fetchPartners = async () => {
      try {
        const res = await api.get('/api/partners');
        if (isMounted && Array.isArray(res.data) && res.data.length > 0) {
          const featured = res.data.filter((p: { isFeatured?: boolean }) => p.isFeatured);
          const others = res.data.filter((p: { isFeatured?: boolean }) => !p.isFeatured);
          const combined = [...featured, ...others];
          memoryPartnersCache = combined;
          try {
            sessionStorage.setItem('skyx_partners_cache', JSON.stringify(combined));
          } catch {
            // ignore
          }
          setDbPartners(combined);
        }
      } catch (err) {
        console.error('Erro ao buscar parceiros:', err);
      }
    };
    fetchPartners();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12 border-y border-slate-200/80 overflow-hidden relative min-h-[140px] flex flex-col justify-center">
      {/* Título estático: sempre presente e renderizado na estrutura da página */}
      <div className="max-w-7xl mx-auto px-6 mb-6 md:mb-8 text-center flex flex-col items-center">
        <h3 className="text-base sm:text-lg md:text-xl font-zen-dots uppercase tracking-wider text-[#014263]">
          {t.title}
        </h3>
      </div>

      {/* Grid de parceiros: altura estável e animação isolada unicamente nas logos */}
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 min-h-[46px]">
        {dbPartners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.28,
              delay: Math.min(index * 0.04, 0.16),
              ease: 'easeOut',
            }}
            className="flex items-center justify-center group"
            title={partner.name}
          >
            <Image
              src={partner.image}
              alt={partner.name}
              width={160}
              height={55}
              className="max-h-[36px] sm:max-h-[42px] md:max-h-[46px] w-auto max-w-[130px] sm:max-w-[160px] object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 filter grayscale group-hover:grayscale-0 cursor-pointer"
              unoptimized
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
