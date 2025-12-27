import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.MODE === 'production' 
        ? 'https://your-backend-name.onrender.com/api' 
        : '/api',
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
