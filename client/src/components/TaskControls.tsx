import {type FC} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import type {GroupExecutorVisibility, GroupVisibility, ViewMode} from "../types/types";
import {useIsAdmin} from '../store/authStore'


interface TaskControlsProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    visibleGroupsEndAt: GroupVisibility;
    taskGroupsEndAt: any[];
    toggleGroupEndAt: (groupId: string) => void;
    toggleAllGroupsEndAt: (show: boolean) => void;
    visibleGroupsExecutor: GroupExecutorVisibility,
    taskGroupByExecutor: any[];
    toggleGroupExecutor: (groupId: number) => void;
    toggleAllGroupsExecutor: (show: boolean) => void;
    onCreateTask: () => void;
}

const TaskControls: FC<TaskControlsProps> = ({
                                                 viewMode,
                                                 setViewMode,
                                                 visibleGroupsEndAt,
                                                 toggleGroupEndAt,
                                                 toggleAllGroupsEndAt,
                                                 taskGroupsEndAt,
                                                 visibleGroupsExecutor,
                                                 taskGroupByExecutor,
                                                 toggleGroupExecutor,
                                                 toggleAllGroupsExecutor,
                                                 onCreateTask
                                             }) => {

    const isAdmin = useIsAdmin();

    return (
        <Paper sx={{ p: 2, mb: 3, borderRadius: '15px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                            variant={viewMode === 'grouped_end_at' ? 'contained' : 'outlined'}
                            onClick={() => setViewMode('grouped_end_at')}
                            size="small"
                        >
                            📁 По дате завершения
                        </Button>

                        {isAdmin &&
                            <Button
                                variant={viewMode === 'grouped_executor' ? 'contained' : 'outlined'}
                                onClick={() => setViewMode('grouped_executor')}
                                size="small"
                            >
                                📁 По ответственным
                            </Button>
                        }

                        <Button
                            variant={viewMode === 'all' ? 'contained' : 'outlined'}
                            onClick={() => setViewMode('all')}
                            size="small"
                        >
                            📋 Без группировки
                        </Button>
                    </Box>

                    {viewMode === 'grouped_end_at' && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Показать группы:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {taskGroupsEndAt.map(group => (
                                    <Chip
                                        key={group.id}
                                        label={`${group.icon} ${group.tasks.length}`}
                                        variant={visibleGroupsEndAt[group.id] && group.tasks.length ? 'filled' : 'outlined'}
                                        onClick={() => toggleGroupEndAt(group.id)}
                                        color={visibleGroupsEndAt[group.id] ? 'primary' : 'default'}
                                        size="small"
                                    />
                                ))}
                                <Button
                                    size="small"
                                    onClick={() => toggleAllGroupsEndAt(true)}
                                    variant="outlined"
                                >
                                    Все
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {viewMode === 'grouped_executor' && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Показать группы:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {taskGroupByExecutor.map(group => (
                                    <Chip
                                        key={group.id}
                                        label={`${group.title} (${group.tasks.length})`}
                                        variant={visibleGroupsExecutor[group.id] && group.tasks.length ? 'filled' : 'outlined'}
                                        onClick={() => toggleGroupExecutor(group.id)}
                                        color={visibleGroupsExecutor[group.id] ? 'primary' : 'default'}
                                        size="small"
                                    />
                                ))}
                                <Button
                                    size="small"
                                    onClick={() => toggleAllGroupsExecutor(true)}
                                    variant="outlined"
                                >
                                    Все
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>

                {isAdmin &&
                    <Button
                        variant="contained"
                        onClick={onCreateTask}
                        sx={{ flexShrink: 0 }}
                    >
                        Новая задача
                    </Button>
                }

            </Box>
        </Paper>
    );
};

export default TaskControls;