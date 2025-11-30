import { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/firebase';

export interface AuthRequest extends Request {
    user?: {
        uid: string;
        email: string;
    };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Allow dev bypass if explicitly enabled in env (optional safety)
        if (process.env.NODE_ENV === 'development' && req.headers['x-dev-user-email']) {
            req.user = { uid: 'dev-uid', email: req.headers['x-dev-user-email'] as string };
            return next();
        }
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email || ''
        };
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
