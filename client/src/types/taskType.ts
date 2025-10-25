import type {StatusType} from "./status";
import {type PriorityType} from "./priority";
import type {UserShortInfo} from "./userType";

type TaskType = {
    id?: number;
    title: string;
    description: string;
    end_at: string;
    priority: PriorityType;
    status: StatusType;
    creator_id?: string;
    executor_id: number;
    executor?: UserShortInfo;
    updatedAt?: string;
    createdAt?: string;
}

export type {
    TaskType,
}