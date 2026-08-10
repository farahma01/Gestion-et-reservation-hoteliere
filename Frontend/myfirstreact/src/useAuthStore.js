import { create } from 'zustand';
import { loginUser, registerUser, logoutUser } from './API/AuthAPI';

export const useAuthStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,

    login: async (credentials) => {
        const data = await loginUser(credentials);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({ user: data.user, token: data.token });
        return data;
    },

    register: async (userData) => {
        const data = await registerUser(userData);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({ user: data.user, token: data.token });
        return data;
    },

    logout: async () => {
        const { token } = get();
        if (token) await logoutUser(token);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null });
    },
}));