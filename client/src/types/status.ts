export const Status = {
    CREATED: 'created',
    PROGRESS: 'in_progress',
    COMPLETED: 'complete',
    CANCELED: 'cancel',
} as const;

export type StatusType = typeof Status[keyof typeof Status];

export const StatusConfig = {
    [Status.CREATED]: {label: 'Создана'},
    [Status.PROGRESS]: {label: 'В работе'},
    [Status.COMPLETED]: {label: 'Завершена'},
    [Status.CANCELED]: {label: 'Отменена'},
} as const;

export const statusOptions = Object.values(Status).map(value => ({
    value: value as StatusType,
    label: StatusConfig[value as StatusType].label
}));