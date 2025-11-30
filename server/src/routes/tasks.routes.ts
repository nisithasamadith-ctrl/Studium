import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Get all tasks for a user
router.get('/', async (req, res) => {
    const { userId } = req.query; // In real app, get from req.user

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const tasks = await prisma.task.findMany({
            where: { userId: String(userId) },
            orderBy: { deadline: 'asc' },
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Create a task
router.post('/', async (req, res) => {
    const { title, course, deadline, priority, estimatedTime, userId } = req.body;

    try {
        const task = await prisma.task.create({
            data: {
                title,
                course,
                deadline: deadline ? new Date(deadline) : null,
                priority,
                estimatedTime,
                userId,
            },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
});

// Update a task (e.g., complete)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { isCompleted, title, priority } = req.body;

    try {
        const task = await prisma.task.update({
            where: { id },
            data: {
                isCompleted,
                title,
                priority,
            },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.task.delete({
            where: { id },
        });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

export default router;
