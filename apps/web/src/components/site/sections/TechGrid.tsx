'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TechCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface TechGridProps {
  cards: TechCard[];
  title?: string;
  description?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function TechGrid({ cards, title, description }: TechGridProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {(title || description) && (
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title && <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">{title}</h2>}
            {description && (
              <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg">{description}</p>
            )}
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ translateY: -6 }}
            >
              <div className="relative h-56 w-full bg-gray-200">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-dark mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
