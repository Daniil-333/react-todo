import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import type {DateValidationError} from '@mui/x-date-pickers/models';
import { Dayjs } from 'dayjs';

interface DateFieldProps {
    label: string;
    required?: boolean;
    value?: Dayjs | null;
    onChange?: (date: Dayjs | null) => void;
    onError?: (error: DateValidationError) => void;
    minDate?: Dayjs | undefined;
    error?: boolean;
    disabled?: boolean
}

export default function BasicDateField({label, required, value, onChange, onError, minDate, error = false, disabled = true}: DateFieldProps){
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']}>
                <DateField
                    format="DD-MM-YYYY"
                    label={label}
                    required={required}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    onError={onError}
                    minDate={minDate}
                    slotProps={{
                        textField: {
                            error: error,
                        }
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}