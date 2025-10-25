import {type FC} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import type {TaskType} from "../types/taskType";
import TaskGroup from "./TaskGroup.tsx";
import TaskCard from "./TaskCard.tsx";
import type {GroupExecutorVisibility, GroupVisibility, ViewMode} from "../types/types";

interface TaskDisplayProps {
    viewMode: ViewMode;
    taskGroupsEndAt: any[];
    visibleGroupsEndAt: GroupVisibility;
    taskGroupByExecutor: any[],
    visibleGroupsExecutor: GroupExecutorVisibility;
    tasks: TaskType[];
    onTaskClick: (task: TaskType) => void;
}

const TaskDisplay: FC<TaskDisplayProps> = ({
                                               viewMode,
                                               taskGroupsEndAt,
                                               visibleGroupsEndAt,
                                               taskGroupByExecutor,
                                               visibleGroupsExecutor,
                                               tasks,
                                               onTaskClick
                                           }) => {
// console.log(taskGroupByExecutor, 'TaskDisplay')
    if (viewMode === 'grouped_end_at') {
        return (
            <Box>
                {taskGroupsEndAt.map(group =>
                    visibleGroupsEndAt[group.id] && (
                            <TaskGroup
                                key={group.id}
                                group={group}
                                onTaskClick={onTaskClick}
                            />
                        )
                )}
            </Box>
        );
    }

    if (viewMode === 'grouped_executor') {
        console.log(visibleGroupsExecutor)
        return (
            <Box>
                {taskGroupByExecutor.map(group =>
                    visibleGroupsExecutor[group.id] && (
                            <TaskGroup
                                key={group.id}
                                group={group}
                                onTaskClick={onTaskClick}
                            />
                        )
                )}
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {tasks.map(task => (
                <Grid key={task.id} >
                    <TaskCard
                        task={task}
                        onClick={() => onTaskClick(task)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default TaskDisplay;