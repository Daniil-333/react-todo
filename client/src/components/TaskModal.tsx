import {type FC} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TaskForm from "./TaskForm.tsx";
import type {TaskType} from "../types/taskType";

interface TaskModalProps {
    open: boolean;
    onClose: () => void;
    task: TaskType | null;
    onSave: (taskData: TaskType) => void;
}

const TaskModal: FC<TaskModalProps> = ({ open, onClose, task, onSave }) => {
    const isEditMode = !!task?.id;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                {isEditMode ? 'Редактирование задачи' : 'Создание задачи'}
            </DialogTitle>

            <DialogContent>
                <TaskForm
                    task={task}
                    onSave={onSave}
                    onCancel={onClose}
                />
            </DialogContent>
        </Dialog>
    );
};

export default TaskModal;