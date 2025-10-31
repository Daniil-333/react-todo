enum PriorityVariant {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

enum TaskStatus {
    created = 'created',
    progress = 'progress',
    complete = 'complete',
    cancel = 'cancel',
}

enum Role {
    admin = 'ADMIN',
    user = 'USER',
}

export {
    PriorityVariant,
    TaskStatus,
    Role
}