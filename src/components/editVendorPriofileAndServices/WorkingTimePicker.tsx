import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TimeClock} from "@mui/x-date-pickers/TimeClock";
import {TextField, Box, Typography, Button, Grid} from "@mui/material";
import "dayjs/locale/ar"; // Import Arabic locale
import {useEffect, useState} from "react";

interface TimeClockPickerProps {
	label: string;
	value: string;
	onChange: (time: string) => void;
	disabled?: boolean;
	locale?: string;
	resetLabel?: string;
	timeFormat?: string;
}

export const TimeClockPicker = ({
	label,
	value,
	onChange,
	disabled = false,
	locale = "he", // Default to Hebrew but can be overridden
	resetLabel = "إعادة تعيين الوقت", // Default reset label
	timeFormat = "HH:mm", // Default time format
}: TimeClockPickerProps) => {
	// Convert string time to Dayjs object
	const parseTimeString = (timeStr: string): Dayjs | null => {
		if (!timeStr) return null;
		return dayjs(`2000-01-01T${timeStr}`); // Using arbitrary date
	};

	// Convert Dayjs object back to time string
	const formatTimeString = (date: Dayjs | null): string => {
		if (!date) return "";
		return date.format(timeFormat);
	};

	const [timeValue, setTimeValue] = useState<Dayjs | null>(parseTimeString(value));

	useEffect(() => {
		setTimeValue(parseTimeString(value));
	}, [value]);

	const handleTimeChange = (newValue: Dayjs | null) => {
		setTimeValue(newValue);
		onChange(formatTimeString(newValue));
	};

	const handleResetClock = () => {
		setTimeValue(parseTimeString("09:00")); // Reset to default time
		onChange("09:00");
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
			<Box sx={{direction: "rtl"}}>
				<Typography variant='subtitle1' gutterBottom>
					{label}
				</Typography>
				<TimeClock
					value={timeValue}
					onChange={handleTimeChange}
					disabled={disabled}
					ampm={false}
					views={["hours", "minutes"]}
					sx={{
						"& .MuiClock-amButton, & .MuiClock-pmButton": {
							display: "none",
						},
					}}
				/>
				<TextField
					value={timeValue ? timeValue.format(timeFormat) : ""}
					size='small'
					fullWidth
					InputProps={{
						readOnly: true,
					}}
					sx={{
						mt: 2,
						"& .MuiInputBase-input": {
							textAlign: "center",
							fontWeight: "bold",
						},
					}}
				/>
				<Button
					variant='outlined'
					onClick={handleResetClock}
					sx={{mt: 2, width: "100%"}}
					disabled={disabled}
				>
					{resetLabel}
				</Button>
			</Box>
		</LocalizationProvider>
	);
};
