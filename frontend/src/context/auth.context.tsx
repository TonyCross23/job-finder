import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loginAPI, logoutAPI } from '../api/auth.api';
import { jwtDecode } from 'jwt-decode';

interface UserType {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: UserType | null;
    loading: boolean;
    register: (data: any) => Promise<void>;
    login: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);

    const getUserFromToken = (token: string | null): UserType | null => {
        if (!token) return null;
        try {
            const decoded: any = jwtDecode(token);
            const payload = decoded.data || decoded;

            return {
                id: payload.id,
                name: payload.name,
                email: payload.email,
            };
        } catch { return null; }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setUser(getUserFromToken(token));
        }
        setLoading(false);
    }, []);

    const login = async (data: any) => {
        const res = await loginAPI(data);
        const token = res.data.acceptToken;
        localStorage.setItem('accessToken', token);
        setUser(getUserFromToken(token));
    };

    const logout = async () => {
        try {
            await logoutAPI()
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            localStorage.removeItem('accessToken');
            setUser(null);
            window.location.href = '/login';
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register: async () => { } }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);