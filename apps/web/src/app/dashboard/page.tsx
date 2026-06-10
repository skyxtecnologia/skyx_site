'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { authClient } from '../../lib/auth-client';

// Tipagem para os dados que virão da API
interface Metric {
  id: number;
  title: string;
  value: string;
}

interface DashboardData {
  welcomeMessage: string;
  metrics: Metric[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook do Better Auth para pegar os dados do usuário em tempo real
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get<DashboardData>('/api/dashboard/metrics');
        setData(response.data);
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
        setError('Não foi possível carregar os dados. Sessão expirada ou inválida.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-dark">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <header className="bg-dark-secondary border-b border-[#014263]/30 px-6 py-4 shadow-lg shadow-black/20">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#67A7D5]">Dashboard SkyX</h1>

            <div className="flex items-center gap-6">
              {session && (
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-white">{session.user.name}</p>
                  <p className="text-xs text-gray-400">{session.user.email}</p>
                </div>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-[#67A7D5] transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {loading && <p className="text-center text-gray-400">Carregando dados do dashboard...</p>}
          {error && <p className="text-center text-red-400">{error}</p>}

          {data && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid md:grid-cols-3 gap-6 mb-12"
              >
                {data.metrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    className="bg-dark-secondary p-6 rounded-2xl border border-[#014263]/30 shadow-[0_8px_30px_rgba(1,66,99,0.1)] hover:border-[#67A7D5]/50 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-300">{metric.title}</h3>
                    <p className="text-3xl font-bold text-[#67A7D5]">{metric.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-dark-secondary p-8 rounded-2xl border border-[#014263]/30 shadow-[0_8px_30px_rgba(1,66,99,0.1)]"
              >
                <h2 className="text-2xl font-bold mb-4 text-white">{data.welcomeMessage}</h2>
                <p className="text-gray-400">
                  Esta é sua área protegida. Apenas usuários autenticados podem acessar este espaço.
                </p>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}
