import axios from 'axios';
import { Platform } from 'react-native';

// Use 10.0.2.2 for Android Emulator, localhost for iOS/Web
const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

let authToken: string | null = null;

export const setAuthToken = (token: string) => {
    authToken = token;
};

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token interceptor if needed
api.interceptors.request.use(async (config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    } else {
        // Fallback for dev/testing if needed, or remove for strict auth
        config.headers['x-dev-user-email'] = 'test@example.com';
    }
    return config;
});

export default api;
