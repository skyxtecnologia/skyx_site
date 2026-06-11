import { Router } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import prisma from '../lib/prisma.js';

const router = Router();

// LISTAR todas as notícias (ROTA PÚBLICA - Para a Landing Page)
router.get('/', async (req, res, next) => {
    try {
        const news = await prisma.news.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(news);
    } catch (error) {
        next(error);
    }
});

// Middleware de Autenticação: Protege as rotas abaixo
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

// CRIAR nova notícia
router.post('/', async (req, res, next) => {
    try {
        const { title, description, image, link, isFeatured, content, tags } = req.body;
        const newNews = await prisma.news.create({
            data: { title, description, image: image || null, link: link || null, isFeatured: isFeatured || false, content: content || null, tags: tags || null },
        });
        res.json(newNews);
    } catch (error) {
        next(error);
    }
});

// ATUALIZAR notícia
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, image, link, isFeatured, content, tags } = req.body;
        const updatedNews = await prisma.news.update({
            where: { id },
            data: { title, description, image, link, isFeatured, content, tags },
        });
        res.json(updatedNews);
    } catch (error) {
        next(error);
    }
});

// DELETAR notícia
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.news.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
});

export default router;