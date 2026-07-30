import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { requireAuth } from '../middleware/require-auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

// Schemas de Validação (Zod)
const partnerSchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório.'),
    image: z.string().url('A imagem deve ser uma URL válida.'),
    isFeatured: z.boolean().optional().default(false),
});

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

// Middleware de Autenticação Centralizado
router.use(requireAuth);

// CRIAR
router.post('/', validateBody(partnerSchema), async (req, res, next) => {
    try {
        // req.body agora é fortemente tipado via Zod
        const { name, image, isFeatured } = req.body as z.infer<typeof partnerSchema>;
        
        const newPartner = await prisma.partner.create({
            data: { name, image, isFeatured },
        });
        res.status(201).json(newPartner);
    } catch (error) {
        next(error);
    }
});

// ATUALIZAR
router.put('/:id', validateBody(partnerSchema), async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, image, isFeatured } = req.body as z.infer<typeof partnerSchema>;
        
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
        const { id } = req.params;
        await prisma.partner.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
});

export default router;