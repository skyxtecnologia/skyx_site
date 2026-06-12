import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prisma = new PrismaClient();

const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
const frontendUrlWithWww = frontendUrl.includes('://www.') ? frontendUrl : frontendUrl.replace('://', '://www.');
const frontendUrlWithoutWww = frontendUrl.replace('://www.', '://');

const isProduction = process.env.NODE_ENV === 'production' || frontendUrlWithoutWww.startsWith('https');

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
    frontendUrlWithoutWww,
    `${frontendUrlWithoutWww}/`,
    frontendUrlWithWww,
    `${frontendUrlWithWww}/`,
    'http://localhost:3000',
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
