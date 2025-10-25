import {useMemo, useEffect, useState, type FC} from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import type {DateValidationError} from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';
import BasicDateField from "../components/DateField";
import PrioritySelect from "../components/PrioritySelect";
import StatusSelect from "../components/StatusSelect";
import UserSelect from "../components/UserSelect";
import type {TaskType} from "../types/taskType";
import type {UserType} from "../types/userType";
import type {PriorityType} from "../types/priority";
import type {StatusType} from "../types/status";
import {useUserActions, useUsers} from "../store/usersStore.tsx";
import {fetchUsers} from "../http/usersAPI";
import {useAuth} from "../store/authStore.tsx";

interface TaskFormProps {
    task?: TaskType | null;
    onSave: (taskData: TaskType) => void;
    onCancel: () => void;
}

const TaskForm: FC<TaskFormProps> = ({task, onSave, onCancel}) => {
    const isEditMode = !!task?.id;

    const [title, setTitle] = useState<string>(task?.title || '');
    const [description, setDescription] = useState<string>(task?.description || '');
    const [endDate, setEndDate] = useState<Dayjs | null>(task?.end_at ? dayjs(task.end_at) : null);
    const [priority, setPriority] = useState<PriorityType>(task?.priority || 'low');
    const [status, setStatus] = useState<StatusType>(task?.status || 'created');
    const [executor, setExecutor] = useState<number | string>(task?.executor_id || '');
    const [errorServer, setErrorServer] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errEndDate, setErrEndDate] = useState<DateValidationError | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const {setUsers} = useUserActions();
    const users = useUsers();
    const authUser = useAuth();
    const isAdmin = Boolean(authUser && authUser.role === 'ADMIN');

    useEffect(() => {
        fetchUsers().then(data => setUsers(data))
    }, [setUsers]);

    const handleDateChange = (newValue: Dayjs | null) => {
        setEndDate(newValue);

        if (fieldErrors.end_at) {
            setFieldErrors(prev => ({ ...prev, end_at: '' }));
        }
    };

    const errorMessageDateField = useMemo(() => {
        if (fieldErrors.end_at) {
            return fieldErrors.end_at;
        }

        // Runtime ошибки DateField
        if (!errEndDate) return '';

        switch (errEndDate) {
            case 'minDate': return 'Выберите дату не ранее сегодняшней';
            case 'invalidDate': return 'Не корректная дата';
            default: return 'Ошибка в дате'
        }
    }, [errEndDate, fieldErrors.end_at]);

    const displayDateError = fieldErrors.end_at || (errEndDate ? errorMessageDateField : '');

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setEndDate(null);
        setPriority('low');
        setStatus('created');
        setExecutor('');
    }

    const validateForm = (): boolean => {
        setFieldErrors({});
        setSuccessMessage('');

        const errors: Record<string, string> = {};
        const emptyFieldTxt: string = 'Поле обязательно для заполнения!';

        if (!endDate) {
            errors.end_at = emptyFieldTxt;
        } else if (errEndDate) {
            errors.end_at = errorMessageDateField;
        }

        // Проверяем остальные поля
        if (!title.trim()) errors.title = emptyFieldTxt;
        if (!description.trim()) errors.description = emptyFieldTxt;
        if (!priority.trim()) errors.priority = emptyFieldTxt;
        if (!status.trim()) errors.status = emptyFieldTxt;
        if (!status.trim()) errors.status = emptyFieldTxt;
        if (!executor) errors.executor = emptyFieldTxt;

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        if(!validateForm()) return;

        // Очищаем ошибки при успешной валидации
        setFieldErrors({});

        const taskData: TaskType = {
            title,
            description,
            priority,
            status,
            end_at: endDate ? endDate.format('YYYY-MM-DD') : (dayjs()).add(1, 'day').format('YYYY-MM-DD'),
            executor_id: Number(executor)
        }

        if (isEditMode && task?.id) {
            taskData.id = task.id;
        }

        try {
            onSave(taskData);
            const successTxt = 'Задача успешно ' + (isEditMode ? 'обновлена' : 'добавлена');

            if(!isEditMode) {
                clearForm();
            }

            setSuccessMessage(successTxt)
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000)
        }catch (e) {
            e instanceof Error ? setErrorServer(e.message) : setErrorServer('Произошла неизвестная ошибка');
        }
    }

    return (
        <Box sx={{
            boxShadow: '0 1px 4px rgba(21,21,21, .5)',
            padding: '2rem 4rem',
            borderRadius: '8px'
        }}>
            <FormControl sx={{
                display: 'grid',
                gap: 2,
            }}>
                <Box>
                    <TextField
                        sx={{width: '100%'}}
                        required
                        label="Заголовок"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        error={Boolean('title' in fieldErrors)}
                        disabled={!isAdmin}
                    />
                    {'title' in fieldErrors && <Alert severity="error">{fieldErrors.title}</Alert>}
                </Box>
                <Box>
                    <TextField
                        sx={{width: '100%'}}
                        required
                        label="Описание"
                        name="description"
                        multiline
                        maxRows={10}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        error={Boolean('description' in fieldErrors)}
                        disabled={!isAdmin}
                    />
                    {'description' in fieldErrors && <Alert severity="error">{fieldErrors.description}</Alert>}
                </Box>
                <Box>
                    <BasicDateField
                        required
                        label="Дата окончания"
                        value={endDate}
                        onChange={handleDateChange}
                        onError={(error) => setErrEndDate(error)}
                        minDate={dayjs()}
                        error={!!displayDateError}
                        disabled={!isAdmin}
                    />
                    {displayDateError && <Alert severity="error">{errorMessageDateField}</Alert>}
                </Box>
                <Box>
                    <PrioritySelect
                        required={true}
                        value={priority}
                        label="Приоритет"
                        onChange={setPriority}
                        error={Boolean('priority' in fieldErrors)}
                        disabled={!isAdmin}
                    />
                    {'priority' in fieldErrors && <Alert severity="error">{fieldErrors.priority}</Alert>}
                </Box>
                <Box>
                    <StatusSelect
                        required={true}
                        value={status}
                        label="Статус"
                        onChange={setStatus}
                        error={Boolean('status' in fieldErrors)}
                    />
                    {'status' in fieldErrors && <Alert severity="error">{fieldErrors.status}</Alert>}
                </Box>
                <Box>
                    <UserSelect
                        required={true}
                        value={(authUser && ('id' in authUser)) ? authUser.id : ''}
                        disabled
                        userOptions={(authUser && ('id' in authUser)) ? [authUser as UserType] : []}
                        label={'Создатель'}
                    />
                </Box>
                <Box>
                    <UserSelect
                        required={true}
                        value={executor}
                        label={'Ответственный'}
                        onChange={setExecutor}
                        userOptions={users}
                        error={Boolean('executor' in fieldErrors)}
                        disabled={!isAdmin}
                    />
                    {'executor' in fieldErrors && <Alert severity="error">{fieldErrors.executor}</Alert>}
                </Box>

                {errorServer && <Alert severity="error">{errorServer}</Alert>}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button onClick={onCancel}>Отмена</Button>
                    <Button variant="outlined" sx={{
                        marginTop: 2,
                        marginLeft: 'auto',
                    }}
                            onClick={handleSubmit}
                    >
                        {isEditMode ? 'Сохранить' : 'Создать'}
                    </Button>
                </Box>

            </FormControl>
        </Box>
    );
};

export default TaskForm;