import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin
// In production, you should set GOOGLE_APPLICATION_CREDENTIALS env var
// or pass the service account object directly.
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
        console.log('Firebase Admin initialized');
    } catch (error) {
        console.error('Firebase Admin initialization failed:', error);
    }
}

export const auth = admin.auth();
