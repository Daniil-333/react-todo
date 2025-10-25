import {useMemo} from 'react';
import type {UserType} from "../types/userType";
import type {TaskType} from "../types/taskType";

const useTaskGroupByExecutor = (users: UserType[], tasks: TaskType[]) => {

    return useMemo(() => {

        return users.map(user => {
            const filterTasks = tasks.filter(task => user.id === task.executor_id);

            return ({
                id: user.id,
                title: user.fullName,
                tasks: filterTasks,
                emptyText: 'Задач нет'
            })
        })
    }, [users, tasks]);
};

export default useTaskGroupByExecutor;