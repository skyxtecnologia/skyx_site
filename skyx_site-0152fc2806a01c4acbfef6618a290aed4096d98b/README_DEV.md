# SkyX - Website & Dashboard

Monorepo com frontend Next.js e backend Express com autenticação Better Auth.

## 📁 Estrutura

```
apps/
├── web/          # Frontend Next.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # Home
│   │   │   ├── login/           # Login page
│   │   │   └── dashboard/       # Dashboard protegido
│   │   ├── components/          # Componentes reutilizáveis
│   │   ├── lib/                 # Utilities e helpers
│   │   └── middleware.ts        # Proteção de rotas
│   └── package.json
└── api/          # Backend Express
    ├── src/
    │   └── index.ts            # Server principal
    └── package.json

```

## 🚀 Como Rodar

### Frontend
```bash
npm -w web run dev    # Inicia em http://localhost:3000
```

### Backend
```bash
npm -w api run dev    # Inicia em http://localhost:3001
```

## 🔐 Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Animações**: Framer Motion 11
- **Validação**: Zod 3
- **Autenticação**: Better Auth 1.6
- **Backend**: Express 4, TypeScript
- **Formatação**: Biome 1.6

## 📝 TODO

- [ ] Integração completa Better Auth
- [ ] Autenticação com email/senha
- [ ] OAuth (Google, GitHub)
- [ ] Dashboard com conteúdo dinâmico
- [ ] Database setup
- [ ] Deploy
