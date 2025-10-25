import { AxiosError } from 'axios';
import {$authHost} from "./index";
import type {UserType} from "../types/userType";

export const fetchUsers = async (): Promise<UserType[]> => {
    try {
        const {data} = await $authHost.get('api/users');
        console.log(data, 'fetchUsers');
        return data || [];

    }catch (error) {
        if(error instanceof AxiosError) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
            }
        }
        return [];
    }
}