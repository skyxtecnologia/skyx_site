import { fromNodeHeaders } from 'better-auth/node';
import { type Request, Router } from 'express';
import { auth } from '../lib/auth.js';
import prisma from '../lib/prisma.js';

const router = Router();

// Estendemos a interface de Request para que o TypeScript reconheça o usuário da sessão
interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

router.get('/metrics', async (req: AuthRequest, res) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

    if (!session?.user) {
      return res.status(401).json({ error: 'Não autorizado: Sessão inválida.' });
    }

    // Puxando dados reais do Banco de Dados
    const casesCount = await prisma.case.count();
    const newsCount = await prisma.news.count();
    const unreadCount = await prisma.contactMessage.count({ where: { isRead: false } });

    res.json({
      welcomeMessage: `Bem-vindo(a) de volta, ${session.user.name}!`,
      metrics: [
        { id: 1, title: 'Cases de Sucesso', value: casesCount.toString() },
        { id: 2, title: 'Notícias Publicadas', value: newsCount.toString() },
        { id: 3, title: 'Mensagens Não Lidas', value: unreadCount.toString() },
      ],
    });
  } catch (error) {
    // Se getSession falhar, significa que o usuário não está autenticado.
    return res.status(401).json({ error: 'Não autorizado.' });
  }
});

export default router;
