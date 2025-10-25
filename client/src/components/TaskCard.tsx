import {type FC} from 'react';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {PriorityConfig, type PriorityType} from "../types/priority";
import type {TaskType} from "../types/taskType";
import {StatusConfig, type StatusType} from "../types/status";


interface TaskCardProps {
    task: TaskType;
    onClick: () => void;
}

const TaskCard: FC<TaskCardProps> = ({task, onClick}) => {
    const priority = task.priority as PriorityType;
    const status = task.status as StatusType;
    const priorityConfig = PriorityConfig[priority];
    const statusConfig = StatusConfig[status];

    return (
        <Card sx={{cursor: 'pointer', borderRadius: '15px'}} onClick={onClick}>
            <CardContent>
                {task.status === 'complete' ?
                    <Typography variant="h5" sx={{ color: 'green' }}>{task.title}</Typography>
                    :
                    (dayjs(task.end_at) < dayjs() ?
                        <Typography variant="h5" sx={{ color: 'red' }}>{task.title}</Typography>
                        :
                        <Typography variant="h5" sx={{ color: 'text.secondary' }}>{task.title}</Typography>)
                }
                <div>
                    Приоритет:
                    <Chip
                        sx={{ marginLeft: '5px'}}
                        label={priorityConfig?.label || task.priority}
                    />
                </div>
                <Typography>{dayjs(task.end_at).format('YYYY-MM-DD')}</Typography>
                <Typography>{task.executor?.fullName || `Неизвестный id ${task.executor_id}`}</Typography>
                <Typography>{statusConfig?.label || task.status}</Typography>
            </CardContent>
        </Card>
    );
};

export default TaskCard;