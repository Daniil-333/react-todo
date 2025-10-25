import {useMemo} from 'react';
import type {TaskType} from "../types/taskType";
import dayjs from "dayjs";

const useTaskGroupsEndAt = (tasks: TaskType[]) => {
    const today = dayjs().startOf('day');
    const tomorrow = dayjs().add(1, 'day').startOf('day');
    const weekEnd = dayjs().add(7, 'day').endOf('day');

    return useMemo(() => {
        const groups = [
            {
                id: 'overdue',
                title: '🚨 Просроченные',
                icon: '🚨',
                filter: (task: TaskType) => dayjs(task.end_at).isBefore(today, 'day') && task.status !== 'complete',
                emptyText: 'Просроченных задач нет',
            },
            {
                id: 'today',
                title: '⏰ Сегодня',
                icon: '⏰',
                filter: (task: TaskType) => dayjs(task.end_at).isSame(today, 'day'),
                emptyText: 'На сегодня задач нет'
            },
            {
                id: 'tomorrow',
                title: '📅 Завтра',
                icon: '📅',
                filter: (task: TaskType) => dayjs(task.end_at).isSame(tomorrow, 'day'),
                emptyText: 'На завтра задач нет'
            },
            {
                id: 'week',
                title: '🗓️ На этой неделе',
                icon: '️🗓️',
                filter: (task: TaskType) => {
                    const taskDate = dayjs(task.end_at);
                    return taskDate.isAfter(tomorrow) && taskDate.isBefore(weekEnd);
                },
                emptyText: 'На неделе задач нет'
            },
            {
                id: 'future',
                title: '🔮 Будущие задачи',
                icon: '️🔮',
                filter: (task: TaskType) => dayjs(task.end_at).isAfter(weekEnd),
                emptyText: 'Будущих задач нет'
            }
        ];

        return groups.map(group => ({
            ...group,
            tasks: tasks.filter(group.filter)
        }));
    }, [tasks]);
};

export default useTaskGroupsEndAt;