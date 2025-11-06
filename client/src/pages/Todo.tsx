import {useEffect, useState, useMemo, type FC} from 'react';
import {createTask, fetchTasks, updateTask} from "../http/taskAPI";
import {fetchUsers} from "../http/usersAPI";
import {useTaskActions, useTasks} from "../store/taskStore";
import TaskModal from "../components/TaskModal.tsx";
import type {TaskType} from "../types/taskType";
import useTaskGroupsEndAt from "../hooks/useTaskGroupsEndAt";
import useTaskGroupByExecutor from "../hooks/useTaskGroupByExecutor";
import TaskDisplay from "../components/TaskDisplay.tsx";
import TaskControls from "../components/TaskControls.tsx";
import type {GroupExecutorVisibility, GroupVisibility, ViewMode} from "../types/types";
import dayjs from "dayjs";
import {useUserActions, useUsers} from "../store/usersStore.tsx";

const Todo: FC = () => {
    const {setTasks} = useTaskActions();
    const tasks = useTasks();
    const {setUsers} = useUserActions();
    const users = useUsers();

    // Состояния для группировки и переключателей
    const taskGroupsEndAt = useTaskGroupsEndAt(tasks);
    const taskGroupByExecutor = useTaskGroupByExecutor(users, tasks);
    const [viewMode, setViewMode] = useState<ViewMode>('grouped_end_at');
    const [visibleGroupsEndAt, setVisibleGroupsEndAt] = useState<GroupVisibility>({
        overdue: true,
        today: true,
        tomorrow: true,
        week: true,
        future: true
    });

    // console.log(Object.fromEntries(users.map(user => ([user.id, true]))))
    const [visibleGroupsExecutor, setVisibleGroupsExecutor] = useState<GroupExecutorVisibility>({
        ...Object.fromEntries(users.map(user => ([user.id, true])))
    });

    // Состояния для модалки
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const [usersData, tasksData] = await Promise.all([
                fetchUsers(),
                fetchTasks()
            ]);
            setUsers(usersData);
            setTasks(tasksData);
        };
        fetchData();
    }, [setUsers, setTasks]);

    useEffect(() => {
        if (users.length > 0 && Object.keys(visibleGroupsExecutor).length === 0) {
            const initialVisibility: GroupExecutorVisibility = {};
            users.forEach(user => {
                initialVisibility[user.id] = true;
            });
            setVisibleGroupsExecutor(initialVisibility);
        }
    }, [users, visibleGroupsExecutor]);

    const sortedTasks = useMemo(() => {
        if (viewMode !== 'all') return tasks;

        return [...tasks].sort((a, b) => {
            const dateA = dayjs(a.updatedAt || a.createdAt || 0);
            const dateB = dayjs(b.updatedAt || b.createdAt || 0);
            return dateB.diff(dateA, 'seconds');
        });
    }, [tasks, viewMode]);

    // Обработчики для модалки\
    const handleTaskClick = (task: TaskType) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };
    const handleCreateTask = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };
    const handleSaveTask = async (taskData: TaskType) => {
        try {
            if (selectedTask?.id) {
                await updateTask(selectedTask.id, taskData);
            }
            else {
                await createTask(taskData);
            }
            const updatedTasks = await fetchTasks();
            setTasks(updatedTasks);

            if(!selectedTask?.id) {
                handleCloseModal();
            }
        } catch (error) {
            throw error
            // console.error('Error saving task:', error);
        }
    };

    // Управление группами По дате завершения
    const toggleGroupEndAt = (groupId: string) => {
        setVisibleGroupsEndAt(prev => ({
            ...prev,
            [groupId]: !prev[groupId]
        }));
    };
    const toggleAllGroupsEndAt = (show: boolean) => {
        const newVisibility = taskGroupsEndAt.reduce((acc, group) => {
            acc[group.id] = show;
            return acc;
        }, {} as GroupVisibility);
        setVisibleGroupsEndAt(newVisibility);
    };

    // Управление группами По ответственным
    const toggleGroupExecutor = (groupId: number) => {
        setVisibleGroupsExecutor(prev => ({
            ...prev,
            [groupId]: !prev[groupId]
        }));
    };
    const toggleAllGroupsExecutor = (show: boolean) => {
        const newVisibility = taskGroupByExecutor.reduce((acc, group) => {
            acc[group.id] = show;
            return acc;
        }, {} as GroupExecutorVisibility);
        setVisibleGroupsExecutor(newVisibility);
    };


    return (
        <div>
            TooDoo list!
            <ol>
                <li>Пользователь не может указать в качестве ответственного задачи другого пользователя, который не является его подчиненным</li>
            </ol>

            <TaskControls
                viewMode={viewMode}
                setViewMode={setViewMode}
                visibleGroupsEndAt={visibleGroupsEndAt}
                taskGroupsEndAt={taskGroupsEndAt}
                toggleGroupEndAt={toggleGroupEndAt}
                toggleAllGroupsEndAt={toggleAllGroupsEndAt}
                visibleGroupsExecutor={visibleGroupsExecutor}
                taskGroupByExecutor={taskGroupByExecutor}
                toggleGroupExecutor={toggleGroupExecutor}
                toggleAllGroupsExecutor={toggleAllGroupsExecutor}
                onCreateTask={handleCreateTask}
            />

            <TaskDisplay
                viewMode={viewMode}
                visibleGroupsEndAt={visibleGroupsEndAt}
                taskGroupsEndAt={taskGroupsEndAt}
                visibleGroupsExecutor={visibleGroupsExecutor}
                taskGroupByExecutor={taskGroupByExecutor}
                tasks={sortedTasks}
                onTaskClick={handleTaskClick}
            />

            <TaskModal
                open={isModalOpen}
                onClose={handleCloseModal}
                task={selectedTask}
                onSave={handleSaveTask}
            />
        </div>
    );
};

export default Todo;