import { create } from 'zustand'
import type {TaskType} from "../types/taskType.ts";

interface TaskState {
    tasks: TaskType[]|[],
    actions: {
        setTasks: (tasks: TaskType[]|[]) => void,
    }
}

const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    actions: {
        setTasks: (tasks) => set({ tasks }),
    }
}));

export const useTasks = () => useTaskStore(state => state.tasks);
export const useTaskActions = () => useTaskStore(state => state.actions);