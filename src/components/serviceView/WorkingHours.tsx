import {Box, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import {Services} from "../../interfaces/services";

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

	console.log(workingHours);

	if (!workingHours) {
		return (
			<Box sx={{textAlign: "center", mt: 10}}>
				<Typography color='text.secondary'>
					لا توجد بيانات عن ساعات العمل
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
			<Typography variant='h6' gutterBottom>
				ساعات العمل
			</Typography>
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
									sunday: "الأحد",
									monday: "الإثنين",
									tuesday: "الثلاثاء",
									wednesday: "الأربعاء",
									thursday: "الخميس",
									friday: "الجمعة",
									saturday: "السبت",
								}[day]
							}
						</Typography>
						{hours?.closed ? (
							<Typography color='error'>مغلق</Typography>
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
