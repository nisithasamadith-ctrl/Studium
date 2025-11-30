import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Get all assignments for a user
router.get('/', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const assignments = await prisma.assignment.findMany({
            where: { userId: String(userId) },
            orderBy: { dueDate: 'asc' },
        });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignments' });
    }
});

// Create an assignment
router.post('/', async (req, res) => {
    const { title, course, dueDate, difficulty, userId } = req.body;

    try {
        const assignment = await prisma.assignment.create({
            data: {
                title,
                course,
                dueDate: new Date(dueDate),
                difficulty,
                userId,
            },
        });
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating assignment' });
    }
});

// Delete an assignment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.assignment.delete({
            where: { id },
        });
        res.json({ message: 'Assignment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting assignment' });
    }
});

export default router;
