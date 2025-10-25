import { AxiosError } from 'axios';
import {$authHost} from "./index";
import type {TaskType} from "../types/taskType";

export const createTask = async ({
                                     title,
                                     description,
                                     end_at,
                                     priority,
                                     status,
                                     executor_id
}: TaskType): Promise<TaskType> => {
    try {
        const {data} = await $authHost.post('api/tasks/', {
            title, description, end_at, priority, status, executor_id
        });

        return data as TaskType;
    }catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || 'Ошибка регистрации');
        }
        throw error;
    }
};

export const updateTask = async (id: number, taskData: TaskType) => {
    try {
        const {data} = await $authHost.put(`api/tasks/${id}`, taskData);

        return data as TaskType[];

    }catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || 'Ошибка обновления задачи');
        }
        throw new Error('Ошибка обновления задачи');
    }
}

export const fetchTasks = async (): Promise<TaskType[]> => {
    try {
        const {data} = await $authHost.get('api/tasks/');

        console.log(data, 'fetchTasks')

        return data as TaskType[];
    }catch (error) {
        console.log(error);
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || 'Ошибка получения списка задач');
        }
        throw new Error('Ошибка получения списка задач');
    }}