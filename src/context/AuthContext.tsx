import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { User } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  institution: string;
  course: string;
  password: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const saved = localStorage.getItem('demo_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fall through */ }
    }
    return mockUsers[0];
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (_email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    localStorage.setItem('token', 'mock-jwt-token');
    setUser(mockUsers[0]);
    setIsLoading(false);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    localStorage.setItem('token', 'mock-jwt-google');
    setUser(mockUsers[0]);
    setIsLoading(false);
  }, []);

  const loginWithGithub = useCallback(async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    localStorage.setItem('token', 'mock-jwt-github');
    setUser(mockUsers[0]);
    setIsLoading(false);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      institution: data.institution,
      course: data.course ?? '',
      rank: 'E',
      projectCount: 0,
      eventCount: 0,
    };
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('demo_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, loginWithGoogle, loginWithGithub, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
