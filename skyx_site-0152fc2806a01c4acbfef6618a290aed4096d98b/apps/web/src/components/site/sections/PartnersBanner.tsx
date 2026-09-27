'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: 'Nossos Parceiros',
  EN: 'Our Partners',
  ES: 'Nuestros Socios',
};

export function PartnersBanner() {
  const { lang } = useLanguage();
  const [dbPartners, setDbPartners] = useState<{ id: string; name: string; image: string }[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await api.get('/api/partners');
        if (res.data && res.data.length > 0) {
          const featured = res.data.filter((p: { isFeatured: boolean }) => p.isFeatured);
          setDbPartners(featured.length > 0 ? featured : res.data);
        }
      } catch (err) {
        console.error('Erro ao buscar parceiros:', err);
      }
    };
    fetchPartners();
  }, []);

  const displayPartners = dbPartners.map((p) => ({
    name: p.name,
    src: p.image,
    width: 200,
    height: 110,
  }));

  if (displayPartners.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h3 className="text-xl md:text-2xl font-roboto-condensed font-bold uppercase tracking-widest text-gray-400">
          {translations[lang]}
        </h3>
      </div>

      {/* Static Flex Layout with framer-motion for entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center items-center gap-12 md:gap-20 px-6 opacity-80 hover:opacity-100 transition-opacity"
      >
        {displayPartners.map((partner) => (
          <div
            key={partner.name}
            className="filter grayscale hover:filter-none transition-all duration-300"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              className="w-[120px] md:w-[150px] h-auto object-contain"
              unoptimized
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
