import { Router } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import prisma from '../lib/prisma.js';

const router = Router();

// LISTAR todos os parceiros (ROTA PÚBLICA - Para a Landing Page)
router.get('/', async (req, res, next) => {
    try {
        const partners = await prisma.partner.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(partners);
    } catch (error) {
        next(error);
    }
});

// Middleware de Autenticação
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

// CRIAR
router.post('/', async (req, res, next) => {
    try {
        const { name, image, isFeatured } = req.body;
        const newPartner = await prisma.partner.create({
            data: { name, image, isFeatured: isFeatured || false },
        });
        res.json(newPartner);
    } catch (error) {
        next(error);
    }
});

// ATUALIZAR
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, image, isFeatured } = req.body;
        const updatedPartner = await prisma.partner.update({
            where: { id },
            data: { name, image, isFeatured },
        });
        res.json(updatedPartner);
    } catch (error) {
        next(error);
    }
});

// DELETAR
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.partner.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (error) { next(error); }
});
export default router;