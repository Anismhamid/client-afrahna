import {Box, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import {Services} from "../../interfaces/services";
import {useTranslation} from "react-i18next";

interface WorkingHoursProps {
	service: Services;
}
/**
 * Services working hours
 * @param {service}
 * @returns  working hours
 */
const WorkingHours: FunctionComponent<WorkingHoursProps> = ({service}) => {
	const workingHours = service.workingHours;
	const {t} = useTranslation();

	if (!workingHours) {
		return (
			<Box sx={{textAlign: "center", mt: 10}}>
				<Typography color='text.secondary'>
					{t("booking.workingHours")}
				</Typography>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				maxWidth: 300,
				m: "auto",
				mt: 10,
				p: 2,
				borderRadius: 2,
			}}
		>
			<Typography variant='h6' gutterBottom></Typography>
			<Box component='ul' sx={{pl: 0, listStyle: "none"}}>
				{Object.entries(service.workingHours).map(([day, hours]) => (
					<Box
						key={day}
						component='li'
						sx={{
							display: "flex",
							justifyContent: "space-between",
							py: 1,
							borderBottom: "1px solid",
							borderColor: "divider",
						}}
					>
						<Typography>
							{
								{
									sunday: t("days.sunday"),
									monday: t("days.monday"),
									tuesday: t("days.tuesday"),
									wednesday: t("days.wednesday"),
									thursday: t("days.thursday"),
									friday: t("days.friday"),
									saturday: t("days.saturday"),
								}[day]
							}
						</Typography>
						{hours?.closed ? (
							<Typography color='error'>{t("closed")}</Typography>
						) : (
							<Typography>
								{hours?.from} - {hours?.to}
							</Typography>
						)}
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default WorkingHours;
