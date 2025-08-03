import {
	Box,
	Typography,
	Divider,
	Container,
	List,
	ListItem,
	ListItemIcon,
} from "@mui/material";
import {FunctionComponent} from "react";

import {useTranslation} from "react-i18next";
import {useTerms} from "./terms";
import changeDirection from "../../../locales/directions";

const PaymentTerms: FunctionComponent = () => {
	const {t} = useTranslation();
	const dir = changeDirection();
	const terms = useTerms();

	return (
		<Container maxWidth='md' sx={{py: 5}} dir={dir}>
			<Box
				sx={{
					backgroundColor: "background.paper",
					borderRadius: 4,
					padding: {xs: 3, md: 4},
					boxShadow: 3,
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				<Typography
					variant='h4'
					gutterBottom
					textAlign='center'
					sx={{fontWeight: "bold"}}
				>
					{t("payment.paymentTerms.title")}
				</Typography>
				<Divider sx={{my: 3}} />

				<Typography variant='body1' paragraph sx={{mb: 3, textAlign: "center"}}>
					{t("payment.paymentTerms.lastUpdated", {
						date: new Date().toLocaleDateString("he-IL"),
					})}
				</Typography>

				<List>
					{terms.map((term, index) => (
						<Box key={term.title} sx={{mb: 3}}>
							<ListItem disableGutters>
								<ListItemIcon sx={{minWidth: 40}}>
									{term.icon}
								</ListItemIcon>
								<Typography
									variant='h6'
									component='div'
									sx={{fontWeight: "bold"}}
								>
									{term.title}
								</Typography>
							</ListItem>
							<Typography variant='body1' paragraph sx={{pl: 6}}>
								{term.content}
							</Typography>
							{index < terms.length - 1 && <Divider sx={{my: 1}} />}
						</Box>
					))}
				</List>

				<Typography
					variant='body2'
					color='text.secondary'
					sx={{mt: 3, fontStyle: "italic"}}
				>
					{t("payment.paymentTerms.note")}
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					sx={{mt: 3, fontStyle: "italic", textAlign: "center"}}
				>
					{t("payment.paymentTerms.moreInfo")}
					<a
						href='/privacy-policy'
						style={{color: "#1976d2", fontSize: "0.9rem"}}
					>
						{t("payment.paymentTerms.privacyPolicy")}
					</a>
					.
				</Typography>
			</Box>
		</Container>
	);
};

export default PaymentTerms;
