'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Integrar com Better Auth
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-dark">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <header className="bg-dark-secondary border-b border-primary/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Dashboard SkyX</h1>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 text-gray-300 hover:text-primary transition"
            >
              Sair
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="bg-dark-secondary p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition"
                whileHover={{ y: -4 }}
              >
                <h3 className="text-lg font-semibold mb-2">Card {i}</h3>
                <p className="text-gray-400">Conteúdo do card</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark-secondary p-8 rounded-lg border border-primary/10"
          >
            <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard</h2>
            <p className="text-gray-400">
              Esta é sua área protegida. Apenas usuários autenticados podem acessar este espaço.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
