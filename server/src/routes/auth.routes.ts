import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Login/Signup (Upsert user)
router.post('/login', async (req, res) => {
    const { email, name, university } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: { name, university }, // Update details if exists
            create: {
                email,
                name,
                university,
            },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
