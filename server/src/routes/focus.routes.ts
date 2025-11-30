import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Record a focus session
router.post('/session', async (req, res) => {
    const { duration, userId } = req.body;

    try {
        const session = await prisma.focusSession.create({
            data: {
                duration,
                userId,
            },
        });

        res.json(session);
    } catch (error) {
        res.status(500).json({ message: 'Error recording session' });
    }
});

// Get forest stats (sessions)
router.get('/forest', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const sessions = await prisma.focusSession.findMany({
            where: { userId: String(userId) },
            orderBy: { timestamp: 'desc' },
        });

        const forest = sessions.map(session => {
            let treeType = 'sapling';
            if (session.duration >= 60) treeType = 'pine';
            else if (session.duration >= 45) treeType = 'oak';

            return {
                ...session,
                treeType,
            };
        });

        res.json(forest);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching forest' });
    }
});

export default router;
