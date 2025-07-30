import {FunctionComponent, useEffect, useState} from "react";
import Calendar from "react-calendar";
import styles from "./calendar.module.css";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {useTranslation} from "react-i18next";

interface CalendarsProps {
	handleDateChange: Function;
	selectedDate: Date;
	unavailableDates: Date[];
}

const Calendars: FunctionComponent<CalendarsProps> = ({
	selectedDate,
	handleDateChange,
	unavailableDates,
}) => {
	const isSameDay = (date1: Date, date2: Date) =>
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate();
	const {t} = useTranslation();
	const [lang, setLang] = useState<string | null>(null);

	useEffect(() => {
		return setLang(localStorage.getItem("i18nextLng"));
	}, [t]);

	return (
		<article
			className={`${styles.calendarContainer} mt-5 m-auto w-100 border border-2 border-warning`}
		>
			<div
				style={{
					backgroundColor: "#00000088",
					fontFamily: "monospace",
					marginTop: 30,
				}}
				className='text-warning py-3 fs-5 mb-3 border border-top border-warning rounded-5 w-100'
			>
				<WarningAmberIcon color='warning' /> {t("calendar.directions")}
			</div>
			<h3 className='mb-4'>{t("calendar.chooseBookDate")}</h3>
			<Calendar
				className={styles.reactCalendar}
				onChange={(date) => handleDateChange(date as Date)}
				value={selectedDate}
				minDate={new Date()}
				maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 5))}
				view='month'
				locale={lang || ""}
				next2Label={null}
				prev2Label={null}
				calendarType='hebrew'
				tileClassName={({date, view}) => {
					if (
						view === "month" &&
						unavailableDates.some((d) => isSameDay(d, date))
					) {
						return styles.unavailableDate;
					}
					return null;
				}}
				tileDisabled={({date, view}) =>
					view === "month" && unavailableDates.some((d) => isSameDay(d, date))
				}
			/>
		</article>
	);
};

export default Calendars;
