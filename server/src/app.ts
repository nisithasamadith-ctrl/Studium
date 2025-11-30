import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/tasks.routes';
import assignmentRoutes from './routes/assignments.routes';
import focusRoutes from './routes/focus.routes';
import aiRoutes from './routes/ai.routes';
import friendRoutes from './routes/friends.routes';
import { authMiddleware } from './middleware/auth.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/tasks', authMiddleware, taskRoutes);
app.use('/assignments', authMiddleware, assignmentRoutes);
app.use('/focus', authMiddleware, focusRoutes);
app.use('/ai', authMiddleware, aiRoutes);
app.use('/friends', authMiddleware, friendRoutes);

app.get('/', (req, res) => {
    res.send('Studium API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
