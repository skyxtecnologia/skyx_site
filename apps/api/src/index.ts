import './config.js'; // IMPORTANTE: Carrega as variáveis de ambiente primeiro
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import express from 'express';
import { auth } from './lib/auth.js';
import dashboardRouter from './routes/dashboard.js';
import casesRouter from './routes/cases.js';
import newsRouter from './routes/news.js';
import partnersRouter from './routes/partners.js';
import contactRouter from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 3001;

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const frontendUrlWithWww = frontendUrl.includes('://www.') ? frontendUrl : frontendUrl.replace('://', '://www.');
const frontendUrlWithoutWww = frontendUrl.replace('://www.', '://');

// FIX: Middleware do Proxy Reverso (Vercel)
// Corrige o cabeçalho "Host" para que o Better Auth reconheça a origem através do Proxy
app.use('/api/auth', (req, res, next) => {
  try {
    const url = new URL(frontendUrlWithoutWww);
    req.headers.host = url.host;
    req.headers['x-forwarded-host'] = url.host;
  } catch (error) { }
  next();
});

// Debugger de Origem (Isso vai imprimir nos logs do Render a URL exata que está chegando)
app.use('/api/auth', (req, res, next) => {
  console.log(`[AUTH DEBUG] Recebendo requisição de: ${req.headers.origin}`);
  console.log(`[AUTH DEBUG] FRONTEND_URL configurada no Render: ${process.env.FRONTEND_URL}`);
  next();
});

// Middleware
// CORS dinâmico: evita mismatch de origem quando FRONTEND_URL não é exatamente a origem real usada no browser.
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = new Set([
        frontendUrlWithoutWww,
        frontendUrlWithWww,
        'http://localhost:3000',
      ]);

      if (!origin) return callback(null, true);
      if (allowed.has(origin)) return callback(null, true);

      return callback(null, true); // permitir mesmo assim para não bloquear cookies durante debug
    },
    credentials: true,
  })
);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Better Auth handler must run before express.json()
app.all('/api/auth/*', toNodeHandler(auth));

// Only parse JSON after auth routes to avoid breaking auth requests.
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/dashboard', dashboardRouter);
app.use('/api/cases', casesRouter);
app.use('/api/news', newsRouter);
app.use('/api/partners', partnersRouter);
app.use('/api/contact', contactRouter);

// Error handler
app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  const status =
    typeof err === 'object' && err && 'status' in err
      ? Number((err as { status?: number }).status) || 500
      : 500;
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(status).json({
    error: message,
  });
});

app.set('trust proxy', 1);

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT} (0.0.0.0)`);
});
