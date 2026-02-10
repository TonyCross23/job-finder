import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { registerAPI, loginAPI, logoutAPI } from '../api/auth.api';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    user: string | null;
    loading: boolean;
    register: (data: any) => Promise<void>;
    login: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<string | null>(null);

    const getEmailFromToken = (token: string | null) => {
        if (!token) return null;
        try {
            const decoded: any = jwtDecode(token);
            return decoded.data?.email || decoded.email || null;
        } catch {
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setUser(getEmailFromToken(token));
        }
        setLoading(false);
    }, []);

    const login = async (data: any) => {
        const res = await loginAPI(data);
        const token = res.data.acceptToken;

        localStorage.setItem('accessToken', token);
        setUser(getEmailFromToken(token));
    };

    const register = async (data: any) => {
        const res = await registerAPI(data);
        const { accessToken } = res.data;
        
        localStorage.setItem('accessToken', accessToken);
        setUser(getEmailFromToken(accessToken));
    };

    const logout = async () => {
        try { await logoutAPI(); } finally {
            localStorage.removeItem('accessToken');
            setUser(null);
            window.location.href = '/login';
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);