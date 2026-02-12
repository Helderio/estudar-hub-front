import api from './api';
import type { RegisterData } from '@/context/AuthContext';

export const authService = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: RegisterData) => api.post('/auth/register', data),
  loginWithGoogle: (token: string) => api.post('/auth/google', { token }),
  loginWithGithub: (code: string) => api.post('/auth/github', { code }),
  refreshToken: () => api.post('/auth/refresh'),
  me: () => api.get('/auth/me'),
};
