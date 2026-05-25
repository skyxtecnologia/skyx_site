import { Router } from 'express';
import prisma from '../lib/prisma';
import { requireAuth } from '../middleware/require-auth';

const router = Router();

router.use(requireAuth);

router.get('/metrics', async (_req, res, next) => {
  try {
    const [usersCount, contentCount, publishedCount, latestMetrics] = await Promise.all([
      prisma.user.count(),
      prisma.content.count(),
      prisma.content.count({ where: { published: true } }),
      prisma.metric.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
    ]);

    res.json({
      usersCount,
      contentCount,
      publishedCount,
      latestMetrics,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users', async (_req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ users });
  } catch (error) {
    next(error);
  }
});

router.get('/content', async (_req, res, next) => {
  try {
    const content = await prisma.content.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ content });
  } catch (error) {
    next(error);
  }
});

export default router;
