import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { requireAuth } from '../middleware/require-auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

// Schemas de Validação (Zod)
const caseSchema = z.object({
    title: z.string().min(1, 'O título é obrigatório.'),
    description: z.string().min(1, 'A descrição é obrigatória.'),
    summary: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
    isFeatured: z.boolean().optional().default(false),
    year: z.string().nullable().optional(),
    client: z.string().nullable().optional(),
    tags: z.string().nullable().optional(),
    technologies: z.string().nullable().optional(),
    gallery: z.string().nullable().optional()
});

// LISTAR todos os cases (ROTA PÚBLICA)
router.get('/', async (req, res, next) => {
    try {
        const cases = await prisma.case.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(cases);
    } catch (error) {
        next(error);
    }
});

// Middleware de Autenticação Centralizado
router.use(requireAuth);

// CRIAR
router.post('/', validateBody(caseSchema), async (req, res, next) => {
    try {
        const data = req.body as z.infer<typeof caseSchema>;
        
        const newCase = await prisma.case.create({
            data: {
                ...data,
                summary: data.summary || null,
                image: data.image || null,
                link: data.link || null,
                year: data.year || null,
                client: data.client || null,
                tags: data.tags || null,
                technologies: data.technologies || null,
                gallery: data.gallery || null
            },
        });
        res.status(201).json(newCase);
    } catch (error) {
        next(error);
    }
});

// ATUALIZAR
router.put('/:id', validateBody(caseSchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body as z.infer<typeof caseSchema>;
        
        const updatedCase = await prisma.case.update({
            where: { id },
            data: {
                ...data,
                summary: data.summary || null,
                image: data.image || null,
                link: data.link || null,
                year: data.year || null,
                client: data.client || null,
                tags: data.tags || null,
                technologies: data.technologies || null,
                gallery: data.gallery || null
            },
        });
        res.json(updatedCase);
    } catch (error) {
        next(error);
    }
});

// DELETAR
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