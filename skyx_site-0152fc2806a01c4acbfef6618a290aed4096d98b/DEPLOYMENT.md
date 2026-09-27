# 🚀 Guia Completo de Deploy - SkyX

Este guia detalha o processo de colocar a arquitetura completa da SkyX em produção, dividida em três partes principais: **Banco de Dados**, **Backend (API)** e **Frontend (Web)**.

## 1. Banco de Dados (Neon.tech - Serverless Postgres)
O Neon hospedará o nosso banco de dados PostgreSQL.

1. Crie uma conta e faça login no Neon.tech.
2. Clique em **New Project** (Novo Projeto).
3. Dê um nome ao projeto (ex: `skyx-db`), escolha a região mais próxima (ex: `sa-east-1` ou `us-east-2`) e a versão do Postgres (16+).
4. Assim que criado, na aba principal (Dashboard), você verá a **Connection String**.
5. Copie a URL gerada (algo como `postgresql://neondb_owner:xxxxx@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`). Salve isso, será o nosso `DATABASE_URL`.

## 2. Backend / API (Render, Railway ou VPS)
Como o backend é uma API robusta em Node.js com Express, recomendamos serviços como **Render** ou **Railway**. Aqui usaremos o Render como base.

### Passo a passo no Render:
1. Crie uma conta no Render e conecte o seu GitHub.
2. Clique em **New** > **Web Service**.
3. Selecione o repositório do projeto (`skyx_site`).
4. Configure os detalhes técnicos do serviço:
   - **Name:** `skyx-api`
   - **Language:** `Node`
   - **Root Directory:** `apps/api` *(Isso é vital, pois informa que é um monorepo)*
5. Configure os comandos de execução:
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy && npm run build` 
     *(Isso instala os pacotes, gera o client do Prisma, aplica as tabelas no Neon e compila o código TypeScript)*
   - **Start Command:** `npm run start` *(ou `node dist/index.js`)*
6. Vá na seção **Environment Variables** (Variáveis de Ambiente) e adicione rigorosamente:
   - `DATABASE_URL` = [A URL gerada no Passo 1 da Neon]
   - `PORT` = `3001` *(ou apenas deixe a porta padrão do serviço)*
   - `BETTER_AUTH_SECRET` = [Gere uma chave super secreta de 32+ caracteres]
   - `BETTER_AUTH_URL` = [A URL pública que o Render vai gerar para esta API. Ex: `https://skyx-api.onrender.com`]
   - `FRONTEND_URL` = [A URL futura do frontend, ex: `https://skyx-app.vercel.app`]
7. Clique em **Create Web Service** e aguarde o final do deploy. Copie a URL fornecida e tenha ela em mãos.

## 3. Frontend / Painel (Vercel)
O frontend em Next.js será hospedado na Vercel e consumirá os dados da API criada no Passo 2.

1. Faça login na Vercel.
2. Clique em **Add New Project**.
3. Importe o seu repositório `skyx_site` do GitHub.
4. A Vercel detectará o monorepo. Na seção **Root Directory**, clique em *Edit* e escolha `apps/web`. A Vercel vai assumir as configs do Next.js automaticamente.
5. Expanda a seção **Environment Variables** e adicione:
   - `NEXT_PUBLIC_API_URL` = `https://skyx-api.onrender.com` *(A URL da API gerada no Passo 2. Não coloque barras no final).*
6. Clique em **Deploy**.
7. Aguarde finalizar. A Vercel entregará a URL definitiva do site (Ex: `https://skyx-website.vercel.app`).
8. **⚠️ Importante:** Se você não sabia o domínio final no Passo 2, volte nas variáveis de ambiente do Render e atualize a variável `FRONTEND_URL` com este domínio exato.

## 4. Pós-Deploy (Seed de Produção)
Agora que tudo está rodando na nuvem, você precisa colocar dados iniciais no banco (como seu usuário Admin) para fazer login.

A forma mais simples e segura de rodar o seu script de Seed no banco de produção é a partir do seu próprio computador:

1. No VS Code, abra o arquivo `.env` dentro de `apps/api`.
2. Troque temporariamente o valor do `DATABASE_URL` local pela URL oficial da **Neon**.
3. No seu terminal integrado, acesse a pasta da API e rode:
   ```bash
   npm run type-check   # Ou vá direto para o seed
   npx prisma db seed
   ```
4. O terminal confirmará a criação do Administrador (`Admin garantido no banco`).
5. **Desfaça a troca:** Volte a string do Postgres local (`postgresql://postgres:postgres@localhost...`) no `.env` para poder continuar codando localmente sem afetar a produção!

---

## 🔥 Resumo da Arquitetura de Produção
* **Vercel** hospeda os arquivos estáticos e páginas Next.js (`apps/web`).
* O site faz chamadas HTTP seguras usando o **Axios** (via URL apontada no `NEXT_PUBLIC_API_URL`).
* **Render** recebe essas chamadas (`apps/api`), gerencia a autenticação pelo Better Auth e a lógica de negócios.
* A API consulta o **Neon** via Prisma Client (usando a connection string do `DATABASE_URL`).

Pronto! A aplicação SkyX está plenamente no ar, escalável e segura.