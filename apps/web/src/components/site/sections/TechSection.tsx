'use client';

import { motion } from 'framer-motion';

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Framer Motion', icon: '✨' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Zod', icon: '✔️' },
  { name: 'Better Auth', icon: '🔐' },
  { name: 'Express', icon: '🚀' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export function TechSection() {
  return (
    <section className="py-20 px-4 bg-dark-secondary/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Stack Tecnológico</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Utilizamos as tecnologias mais modernas e eficientes para oferecer soluções de
            excelência
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="p-6 bg-dark rounded-lg border border-primary/10 hover:border-primary/30 transition"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="text-4xl mb-3">{tech.icon}</div>
              <h3 className="font-semibold text-white">{tech.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
