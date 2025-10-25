export const Priority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
} as const;

export type PriorityType = typeof Priority[keyof typeof Priority];

export const PriorityConfig = {
    [Priority.LOW]: {label: 'Низкий', color: '#4caf50'},
    [Priority.MEDIUM]: {label: 'Средний', color: '#ff9800'},
    [Priority.HIGH]: {label: 'Высокий', color: '#f44336'},
} as const;


export const priorityOptions = Object.values(Priority).map(value => ({
    value: value as PriorityType,
    label: PriorityConfig[value as PriorityType].label
}));