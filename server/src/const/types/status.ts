export const Status = {
    CREATED: 'created',
    PROGRESS: 'in_progress',
    COMPLETED: 'complete',
    CANCELED: 'cancel',
} as const;

export type StatusType = typeof Status[keyof typeof Status];

export const statusOptions = Object.values(Status).map(value => value as StatusType);