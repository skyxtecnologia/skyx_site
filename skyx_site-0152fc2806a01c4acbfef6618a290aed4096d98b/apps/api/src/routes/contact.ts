import { Router } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import prisma from '../lib/prisma.js';

const router = Router();

// CRIAR nova mensagem (ROTA PÚBLICA - Para a Landing Page)
router.post('/', async (req, res, next) => {
    try {
        const { email, message } = req.body;
        if (!email || !message) {
            return res.status(400).json({ error: 'Email e mensagem são obrigatórios.' });
        }
        const newContact = await prisma.contactMessage.create({
            data: { email, message },
        });
        res.json(newContact);
    } catch (error) {
        next(error);
    }
});

// Middleware de Autenticação: Protege as rotas de listagem (Painel)
router.use(async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        if (!session?.user) {
            return res.status(401).json({ error: 'Não autorizado.' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Não autorizado.' });
    }
});

// LISTAR todas as mensagens
router.get('/', async (req, res, next) => {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(messages);
    } catch (error) {
        next(error);
    }
});

// MARCAR COMO LIDA/NÃO LIDA
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isRead } = req.body;
        const updatedMessage = await prisma.contactMessage.update({
            where: { id },
            data: { isRead },
        });
        res.json(updatedMessage);
    } catch (error) {
        next(error);
    }
});

// DELETAR mensagem
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.contactMessage.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (error) { next(error); }
});

export default router;