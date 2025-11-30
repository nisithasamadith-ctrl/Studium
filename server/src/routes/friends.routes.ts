import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Add a friend by email
router.post('/add', async (req, res) => {
    const { userId, friendEmail } = req.body;

    if (!userId || !friendEmail) {
        return res.status(400).json({ message: 'User ID and Friend Email are required' });
    }

    try {
        const friendUser = await prisma.user.findUnique({
            where: { email: friendEmail },
        });

        if (!friendUser) {
            return res.status(404).json({ message: 'User with this email not found' });
        }

        if (friendUser.id === userId) {
            return res.status(400).json({ message: 'You cannot add yourself as a friend' });
        }

        // Check if already friends
        const existingFriendship = await prisma.friend.findFirst({
            where: {
                userId,
                friendId: friendUser.id,
            },
        });

        if (existingFriendship) {
            return res.status(400).json({ message: 'Already friends' });
        }

        // Create bidirectional friendship? Or just one way for now.
        // Let's do one way for simplicity, or create two records for mutual.
        // For MVP, simple one-way follow is easier, but "Friend" implies mutual.
        // Let's just create one record for "following".

        await prisma.friend.create({
            data: {
                userId,
                friendId: friendUser.id,
            },
        });

        res.json({ message: 'Friend added successfully', friend: friendUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding friend' });
    }
});

// List friends with stats (Leaderboard)
router.get('/', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const friendships = await prisma.friend.findMany({
            where: { userId: String(userId) },
            include: {
                friend: {
                    include: {
                        focusSessions: true, // To calculate stats
                    }
                }
            }
        });

        // Calculate weekly focus minutes for each friend
        const leaderboard = friendships.map(f => {
            const totalMinutes = f.friend.focusSessions.reduce((acc, session) => acc + session.duration, 0);
            return {
                id: f.friend.id,
                name: f.friend.name,
                university: f.friend.university,
                totalMinutes,
            };
        });

        // Sort by total minutes desc
        leaderboard.sort((a, b) => b.totalMinutes - a.totalMinutes);

        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching friends' });
    }
});

export default router;
