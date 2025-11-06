export const Role = {
    ADMIN: 'ADMIN',
    USER: 'USER',
} as const;

export type RoleType = typeof Role[keyof typeof Role];

export const roleOptions = Object.values(Role).map(value => value as RoleType);