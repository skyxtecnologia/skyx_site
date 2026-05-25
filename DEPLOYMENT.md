# Deploy

## Frontend

Deploy `apps/web` on Vercel.

Environment variables in Vercel:

- `NEXT_PUBLIC_API_URL` = public URL of the backend API

Build settings:

- Root directory: `apps/web`
- Build command: `npm run build`
- Output: default Next.js output

## Backend

The API runs on a Node host. Neon provides the PostgreSQL database; it does not host the Express app itself.

Recommended setup:

- Host the API on a Node platform such as Render, Railway, Fly, or a VPS.
- Use Neon for PostgreSQL.

Environment variables for `apps/api`:

- `DATABASE_URL` = Neon connection string
- `BETTER_AUTH_SECRET` = long random secret, at least 32 chars
- `BETTER_AUTH_URL` = public API URL, for example `https://api.seudominio.com`
- `FRONTEND_URL` = your Vercel app URL, for example `https://seu-app.vercel.app`
- `PORT` = runtime port from your host, usually set by the platform

## Steps

1. Create the Neon database and copy the connection string.
2. Set the API environment variables on the hosting platform.
3. Run Prisma migration commands against Neon.
4. Set the frontend `NEXT_PUBLIC_API_URL` to the API URL.
5. Deploy the frontend to Vercel.

## Local parity

If you want to mirror production locally:

```bash
docker compose up -d postgres
cd apps/api
npx prisma migrate dev --schema prisma/schema.prisma
```