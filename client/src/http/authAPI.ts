import { AxiosError } from 'axios';
import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
import type {UserType} from "../types/userType";

interface JwtPayload {
    id: number;
    login: string;
    role: string;
    iat: number;
    exp: number;
    fullName: string;
}

export const registration = async (login: string, password: string): Promise<UserType> => {
    try {
        const {data} = await $host.post('api/auth/registration', {login, password});
        const decoded = jwtDecode<JwtPayload>(data.token);
        localStorage.setItem('token', data.token);

        return {
            id: decoded.id,
            role: decoded.role,
            fullName: decoded.fullName,
        }
    }catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || 'Ошибка регистрации');
        }
        throw error;
    }

};

export const login = async (login: string, password: string): Promise<UserType> => {
    try {
        const {data} = await $host.post('api/auth/login', {login, password});
        const decoded = jwtDecode<JwtPayload>(data.token);
        localStorage.setItem('token', data.token);

        return {
            id: decoded.id,
            role: decoded.role,
            fullName: decoded.fullName,
        }
    }catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || 'Ошибка входа');
        }
        throw new Error('Ошибка входа');
    }

};

export const check = async (): Promise<UserType | null> => {
    const token = localStorage.getItem('token');

    if (!token) return null;

    try {
        const {data} = await $authHost.get('api/auth/check', {});

        if(!data.token){
            return null;
        }

        if (data.token !== token) {
            localStorage.setItem('token', data.token);
        }

        const decoded = jwtDecode<JwtPayload>(data.token);

        return {
            id: decoded.id,
            role: decoded.role,
            fullName: decoded.fullName,
        }
    }catch (error) {
        if(error instanceof AxiosError) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
            }
            return null;
        }

        return null;
    }
};