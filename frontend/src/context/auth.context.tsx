import { createContext, useContext, useState, type ReactNode } from 'react';
import { registerAPI, loginAPI, logoutAPI } from '../api/auth.api';

interface AuthContextType {
    user: string | null;
    register: (data: any) => Promise<void>;
    login: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<string | null>(() => {
        return localStorage.getItem('userEmail');
    });

    const register = async (data: any) => {
        const res = await registerAPI(data);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('userEmail', data.email); // save email
        setUser(data.email);
    };

    const login = async (data: any) => {
        const res = await loginAPI(data);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('userEmail', data.email); // save email
        setUser(data.email);
    };

    const logout = async () => {
        await logoutAPI();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userEmail'); // remove email
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
