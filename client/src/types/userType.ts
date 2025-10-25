type UserType = {
    id: number;
    name?: string;
    surname?: string;
    patron?: string;
    role: string;
    fullName?: string;
}

type UserShortInfo = {
    id: string;
    login?: string;
    name?: string;
    surname?: string;
    patron?: string;
    fullName?: string;
}

export type {
    UserType,
    UserShortInfo
}