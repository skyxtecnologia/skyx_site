import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prisma = new PrismaClient();

export const auth = betterAuth({
  // Mantém Prisma, mas deixa o adapter e configurações alinhados com o esperado pelo Better Auth.
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  // Email + password (email/password nativo)
  emailAndPassword: {
    enabled: true,
  },

  // Origem confiável do frontend.
  trustedOrigins: [
    process.env.FRONTEND_URL ?? 'http://localhost:3000',
    // Garante que o Better Auth aceite a URL com ou sem barra no final
    process.env.FRONTEND_URL ? `${process.env.FRONTEND_URL}/` : 'http://localhost:3000/',
  ],

  // Configuração obrigatória para permitir cookies entre domínios diferentes (Vercel -> Render)
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true, // Permite envio seguro via HTTPS
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
