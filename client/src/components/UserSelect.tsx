import {useId} from 'react';
import FormControl from '@mui/material/FormControl';
import { Select, MenuItem, InputLabel, type SelectChangeEvent } from '@mui/material';
import type {UserType} from '../types/userType';

interface UserSelectProps {
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    error?: boolean;
    required?: boolean;
    value: number | string;
    onChange?: (value: number) => void;
    label?: string;
    disabled?: boolean;
    includeEmpty?: boolean;
    emptyLabel?: string;
    id?: string,
    userOptions: UserType[]
}

export default function UserSelect({
                                           value,
                                           onChange,
                                           id,
                                           fullWidth = true,
                                           size = 'medium',
                                           error = false,
                                           required = false,
                                           label = "Пользователь",
                                           disabled = false,
                                           includeEmpty = false,
                                           emptyLabel = "Не выбран",
                                           userOptions = [],
                                       }: UserSelectProps) {
    const handleChange = (event: SelectChangeEvent<number | string>) => {
        onChange?.(Number(event.target.value));
    };
    const generatedId = useId();
    const finalId = id || generatedId;
    const labelId = `${finalId}-label`;

    return (
        <FormControl
            fullWidth={fullWidth}
            size={size}
            error={error}
            required={required}
        >
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                id={finalId}
                value={value}
                label={label}
                onChange={handleChange}
                disabled={disabled}
            >
                {includeEmpty && (
                    <MenuItem value="">
                        <em>{emptyLabel}</em>
                    </MenuItem>
                )}

                {userOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.fullName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}