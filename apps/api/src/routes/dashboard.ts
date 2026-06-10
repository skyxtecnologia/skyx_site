import { fromNodeHeaders } from 'better-auth/node';
import { type Request, Router } from 'express';
import { auth } from '../lib/auth.js';

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

    // Se a sessão for válida, retornamos dados mockados para o dashboard
    res.json({
      welcomeMessage: `Bem-vindo(a) de volta, ${session.user.name}!`,
      metrics: [
        { id: 1, title: 'Projetos Ativos', value: '12' },
        { id: 2, title: 'Tarefas Pendentes', value: '5' },
        { id: 3, title: 'Satisfação do Cliente', value: '98%' },
      ],
    });
  } catch (error) {
    // Se getSession falhar, significa que o usuário não está autenticado.
    return res.status(401).json({ error: 'Não autorizado.' });
  }
});

export default router;
