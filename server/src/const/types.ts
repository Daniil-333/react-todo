type JWTProps = (id: number, login: string, role: string, fullName: string) => string

// export interface IUser {
//     id: number;
//     login: string;
//     password: string;
//     name?: string | null;
//     surname?: string | null;
//     patron?: string | null;
//     role: string;
//     supervisor?: number | null;
//     fullName: string;
// }

//TODO типизировать Приоритет и Статус
export interface ITask {
    id: number;
    title: string;
    description: string;
    end_at: string;
    priority: string;
    status: string;
    creator_id: number;
    executor_id: number;
}

export {
    type JWTProps,
}