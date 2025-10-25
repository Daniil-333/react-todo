import {useId} from 'react';
import FormControl from '@mui/material/FormControl';
import { Select, MenuItem, InputLabel, type SelectChangeEvent } from '@mui/material';
import {statusOptions, type StatusType} from "../types/status";

interface StatusSelectProps {
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    error?: boolean;
    required?: boolean;
    value: StatusType | '';
    onChange: (value: StatusType) => void;
    label?: string;
    disabled?: boolean;
    id?: string
}

export default function StatusSelect({
                                           value,
                                           onChange,
                                           id,
                                           fullWidth = true,
                                           size = 'medium',
                                           error = false,
                                           required = false,
                                           label = "Статус",
                                           disabled = false,
                                       }: StatusSelectProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as StatusType);
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
                {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}