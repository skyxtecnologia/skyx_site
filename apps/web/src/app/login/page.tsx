'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { authClient } from '../../lib/auth-client';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hook do Better Auth: Se já tem sessão salva no navegador, vai direto pro Dashboard
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (!isPending && session) {
      router.push('/dashboard');
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = loginSchema.parse({ email, password });
      console.log('Login attempt:', data);

      // Chamada real ao Better Auth
      const { error: signInError } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        setError(signInError.message || 'Credenciais inválidas ou erro ao fazer login');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('Erro ao fazer login');
      }
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo sutis para manter o design system */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#014263] opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#67A7D5] opacity-10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-dark-secondary p-8 md:p-10 rounded-2xl shadow-[0_10px_40px_rgba(1,66,99,0.15)] border border-[#014263]/30">
          <div className="flex justify-center mb-6">
            <Image
              src="/img/logo-nav.png"
              alt="SkyX Logo"
              width={160}
              height={50}
              className="object-contain"
              priority
            />
          </div>
          <p
            className="text-center mb-8 text-sm text-gray-400"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Faça login em sua conta
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded text-red-400">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-300"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:border-[#67A7D5] focus:ring-1 focus:ring-[#67A7D5] focus:outline-none transition-all text-white placeholder-gray-600"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-300"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:border-[#67A7D5] focus:ring-1 focus:ring-[#67A7D5] focus:outline-none transition-all text-white placeholder-gray-600"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 text-white font-medium rounded-lg transition-all disabled:opacity-70 hover:shadow-lg mt-4"
              style={{
                background: 'linear-gradient(85deg, #014263 0%, #67A7D5 100%)',
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
