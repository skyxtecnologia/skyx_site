import { Router } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import prisma from '../lib/prisma.js';

const router = Router();

// LISTAR todos os cases (ROTA PÚBLICA - Para a Landing Page)
router.get('/', async (req, res, next) => {
    try {
        const cases = await prisma.case.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(cases);
    } catch (error) {
        next(error); // Repassa o erro para o handler global do Express (evita crash)
    }
});

// Middleware de Autenticação: Garante que apenas usuários logados acessem essas rotas
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

// CRIAR novo case
router.post('/', async (req, res, next) => {
    try {
        const { title, description, image, link, isFeatured, year, client, tags, technologies, gallery } = req.body;
        const newCase = await prisma.case.create({
            data: {
                title,
                description,
                image: image || null,
                link: link || null,
                isFeatured: isFeatured || false,
                year: year || null,
                client: client || null,
                tags: tags || null,
                technologies: technologies || null,
                gallery: gallery || null
            },
        });
        res.json(newCase);
    } catch (error) {
        next(error);
    }
});

// ATUALIZAR case (Usado para alterar o destaque)
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, image, link, isFeatured, year, client, tags, technologies, gallery } = req.body;
        const updatedCase = await prisma.case.update({
            where: { id },
            data: { title, description, image, link, isFeatured, year, client, tags, technologies, gallery },
        });
        res.json(updatedCase);
    } catch (error) {
        next(error);
    }
});

// DELETAR case
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.case.delete({
            where: { id },
        });
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
});

export default router;