import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Container,
	Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {FunctionComponent} from "react";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import {useTranslation} from "react-i18next";

const faqs = [
	{
		question: "faq.q1",
		answer: "faq.a1",
	},
	{
		question: "faq.q2",
		answer: "faq.a2",
	},
	{
		question: "faq.q3",
		answer: "faq.a3",
	},
	{
		question: "faq.q4",
		answer: "faq.a4",
	},
	{
		question: "faq.q5",
		answer: "faq.a5",
	},
];

interface FAQPageProps {}

const FAQPage: FunctionComponent<FAQPageProps> = () => {
	const {t} = useTranslation();
	return (
		<Container maxWidth='md' sx={{py: 5}}>
			<Typography
				sx={{
					textAlign: "center",
					fontWeight: "bold",
					mt: 10,
				}}
				variant='h4'
				align='center'
				gutterBottom
				color='primary'
			>
				{t("faq.title")}
			</Typography>
			<HorizontalDevider />
			<Box
				sx={{
					backgroundColor: "background.paper",
					borderRadius: 3,
					p: 4,
					boxShadow: 3,
					mt: 5,
				}}
			>
				{faqs.map((faq, index) => (
					<Accordion key={index} sx={{mb: 2}}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant='subtitle1' fontWeight='bold'>
								{t(faq.question)}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant='body1'>{t(faq.answer)}</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Container>
	);
};

export default FAQPage;
