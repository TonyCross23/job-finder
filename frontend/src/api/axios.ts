// api/axios.ts
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('accessToken');

        if (token && !config.url?.includes('/auth/refresh')) {
            const decoded: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp - currentTime < 60) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(newToken => {
                        config.headers['Authorization'] = `Bearer ${newToken}`;
                        return config;
                    });
                }

                isRefreshing = true;
                try {
                    const { data } = await api.post('/auth/refresh', {});

                    const newToken = data.acceptToken || data.accessToken;
                    if (newToken) {
                        localStorage.setItem('accessToken', newToken);

                        config.headers['Authorization'] = `Bearer ${newToken}`;

                        processQueue(null, newToken);
                        token = newToken;
                    }
                } catch (err) {
                    processQueue(err, null);
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login';
                } finally {
                    isRefreshing = false;
                }
            }
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;