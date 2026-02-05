import axios from 'axios';

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

api.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axios(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error('No refresh token');
                const { data } = await api.post(
                    '/auth/refresh',
                    {},
                    { headers: { 'x-refresh-token': refreshToken } }
                );

                localStorage.setItem('accessToken', data.accessToken);

                processQueue(null, data.accessToken);

                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                
                return axios(originalRequest);
            } catch (e) {
                processQueue(e, null);
                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(err);
    }
);

export default api;
