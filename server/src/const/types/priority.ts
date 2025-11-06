export const Priority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
} as const;

export type PriorityType = typeof Priority[keyof typeof Priority];

export const priorityOptions = Object.values(Priority).map(value => value as PriorityType);