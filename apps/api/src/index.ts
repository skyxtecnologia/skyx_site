import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { auth } from './lib/auth';
import dashboardRouter from './routes/dashboard';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Better Auth handler must run before express.json()
app.all('/api/auth/*', toNodeHandler(auth));

// Only parse JSON after auth routes to avoid breaking auth requests.
app.use(express.json());

app.use('/api/dashboard', dashboardRouter);

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
