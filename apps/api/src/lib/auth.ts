import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prisma = new PrismaClient();

const isProduction = process.env.NODE_ENV === 'production' || process.env.FRONTEND_URL?.startsWith('https');

export const auth = betterAuth({
  // Mantém Prisma, mas deixa o adapter e configurações alinhados com o esperado pelo Better Auth.
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  // Email + password (email/password nativo)
  emailAndPassword: {
    enabled: true,
  },

  // Configurações de Host para ambientes de produção (Render)
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
  trustHost: true,

  // Origem confiável do frontend.
  trustedOrigins: [
    process.env.FRONTEND_URL ?? 'http://localhost:3000',
    // Garante que o Better Auth aceite a URL com ou sem barra no final
    process.env.FRONTEND_URL ? `${process.env.FRONTEND_URL}/` : 'http://localhost:3000/',
  ],

  // Configuração obrigatória para permitir cookies entre domínios diferentes (Vercel -> Render)
  advanced: {
    defaultCookieAttributes: {
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction, // true em produção, false no localhost
    },
  },

  // Opcional: campos adicionais no usuário.
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
      },
    },
  },
});
