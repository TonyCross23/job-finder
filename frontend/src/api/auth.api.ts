import api from './axios';

export interface RegisterDTO {
    email: string;
    username: string;
    password: string;
    code: string;
    roleId?: number;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export const sendCodeAPI = async (email: string) => {
    return await api.post('/auth/code', { email });
};

export const registerAPI = async (dto: RegisterDTO) => {
    return await api.post('/auth/register', dto);
};

export const loginAPI = async (dto: LoginDTO) => {
    return await api.post('/auth/login', dto);
};

export const logoutAPI = async () => {
    return await api.post('/auth/logout', { });
};
