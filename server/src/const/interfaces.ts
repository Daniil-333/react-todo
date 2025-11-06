interface ExecutorType {
    id: number;
    login: string;
    name?: string | null;
    surname?: string | null;
    patron?: string | null;
    fullName?: string;
}

export {
    type ExecutorType
}