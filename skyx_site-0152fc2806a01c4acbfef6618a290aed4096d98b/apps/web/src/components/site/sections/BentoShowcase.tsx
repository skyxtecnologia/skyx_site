'use client';

import { motion } from 'framer-motion';

export function BentoShowcase() {
  return (
    <section className="relative w-full py-20 bg-[#050505] overflow-hidden" id="impacto">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#014263] opacity-10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#67a7d5] opacity-5 blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-zen-dots text-white mb-4">
            Nosso{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#014263] to-[#67a7d5]">
              Impacto
            </span>
          </h2>
          <p className="text-gray-400 font-roboto text-lg max-w-2xl mx-auto font-light">
            Números que comprovam nossa excelência em tecnologia e imersão.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Item 1 */}
          <motion.div
            className="group relative bg-white/5 border border-white/10 rounded-3xl p-10 overflow-hidden flex flex-col justify-center items-center text-center hover:border-[#014263]/50 transition-all duration-500 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#014263]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-7xl font-zen-dots text-[#67a7d5] mb-2">+3000</h3>
            <p className="text-xl text-gray-200 font-roboto font-medium">Pessoas Imersas</p>
            <p className="text-sm text-gray-400 mt-2 font-roboto font-light">
              Experimentaram nossa Cápsula de VR
            </p>
          </motion.div>

          {/* Item 2 */}
          <motion.div
            className="group relative bg-white/5 border border-white/10 rounded-3xl p-10 overflow-hidden flex flex-col justify-center items-center text-center hover:border-[#67a7d5]/40 transition-all duration-500 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#67a7d5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-7xl font-zen-dots text-[#67a7d5] mb-2">2</h3>
            <p className="text-xl text-gray-200 font-roboto font-medium">Anos de Inovação</p>
            <p className="text-sm text-gray-400 mt-2 font-roboto font-light">
              Construindo o futuro com solidez
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
