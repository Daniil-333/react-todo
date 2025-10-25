import {type FC} from 'react';
import type {TaskType} from "../types/taskType";
import TaskCard from "../components/TaskCard.tsx";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TaskGroupProps {
    group: {
        id: string;
        title: string;
        tasks: TaskType[];
        emptyText: string;
        color?: string;
        icon: string;
    };
    onTaskClick: (task: TaskType) => void;
}

const TaskGroup: FC<TaskGroupProps> = ({ group, onTaskClick }) => {
    // console.log(group, 'TaskGroup')
    if (group.tasks.length === 0) {
        return (
            <Box sx={{ mb: 4, opacity: 0.7 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    {group.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {group.emptyText}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.primary' }}>
                {group.title} ({group.tasks.length})
            </Typography>
            <Grid container spacing={2}>
                {group.tasks.map(task => (
                    <Grid key={task.id}>
                        <TaskCard task={task} onClick={() => onTaskClick(task)}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TaskGroup;