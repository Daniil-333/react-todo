import {useId} from 'react';
import FormControl from '@mui/material/FormControl';
import { Select, MenuItem, InputLabel, type SelectChangeEvent } from '@mui/material';
import {priorityOptions, type PriorityType} from '../types/priority';

interface PrioritySelectProps {
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    error?: boolean;
    required?: boolean;
    value: PriorityType | '';
    onChange: (value: PriorityType  | 'low') => void;
    label?: string;
    disabled?: boolean;
    includeEmpty?: boolean;
    emptyLabel?: string;
    id?: string
}

export default function PrioritySelect({
                                           value,
                                           onChange,
                                           id,
                                           fullWidth = true,
                                           size = 'medium',
                                           error = false,
                                           required = false,
                                           label = "Приоритет",
                                           disabled = false,
                                           includeEmpty = false,
                                           emptyLabel = "Не выбран",
                                       }: PrioritySelectProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as PriorityType  | 'low');
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

                {priorityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}