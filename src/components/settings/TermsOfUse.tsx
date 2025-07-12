import {
	Container,
	Typography,
	Box,
	Divider,
	List,
	ListItem,
	ListItemIcon,
} from "@mui/material";
import {FunctionComponent} from "react";
import {
	Gavel,
	Description,
	Rule,
	AccessTime,
	AccountCircle,
	Email,
} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

const icons = [<Gavel />, <Rule />, <AccountCircle />, <Description />, <AccessTime />];

const TermsOfUse: FunctionComponent = () => {
	const {t} = useTranslation();

	const termsSections = t("terms.sections", {returnObjects: true}) as {
		title: string;
		items: string[];
	}[];

	return (
		<Container maxWidth='md' sx={{py: 5}}>
			<Box
				sx={{
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
					sx={{fontWeight: "bold", color: "primary.main"}}
				>
					<Gavel sx={{verticalAlign: "middle", mr: 1}} />
					{t("terms.title")}
				</Typography>

				<Divider sx={{my: 3}} />

				<Typography variant='body1' sx={{mb: 4, lineHeight: 1.8}}>
					{t("terms.intro")}
				</Typography>

				<List>
					{termsSections.map((section, index) => (
						<Box key={index} sx={{mb: 4}}>
							<ListItem disableGutters>
								<ListItemIcon sx={{minWidth: 40, color: "primary.main"}}>
									{icons[index]}
								</ListItemIcon>

								<Typography variant='h6' sx={{fontWeight: "bold"}}>
									{section.title}
								</Typography>
							</ListItem>

							<List dense sx={{pl: 6}}>
								{section.items.map((item, itemIndex) => (
									<ListItem
										key={itemIndex}
										disableGutters
										sx={{alignItems: "flex-start"}}
									>
										<ListItemIcon sx={{minWidth: 24, mt: 0.5}}>
											<span style={{color: "text.secondary"}}>
												•
											</span>
										</ListItemIcon>
										<Typography variant='body1' component='span'>
											{item}
										</Typography>
									</ListItem>
								))}
							</List>

							{index < termsSections.length - 1 && <Divider sx={{my: 2}} />}
						</Box>
					))}
				</List>

				<Typography variant='h6' gutterBottom sx={{mt: 3, fontWeight: "bold"}}>
					<Email sx={{verticalAlign: "middle", mr: 1}} />
					{t("terms.contactUsTitle")}{" "}
				</Typography>
				<Typography variant='body1'>{t("terms.contactUsDescription")}</Typography>
				<Typography variant='body1' sx={{pl: 4}}>
					• {t("terms.contactEmail", {email: "terms@afra7na.com"})} <br />•{" "}
					{t("terms.contactPhone", {phone: "0500000000"})} <br />•{" "}
					{t("terms.contactAddress", {address: "أم الفحم، إسرائيل"})}
				</Typography>

				<Typography
					variant='body2'
					color='text.secondary'
					sx={{mt: 4, fontStyle: "italic"}}
				>
					{t("terms.lastUpdate", {date: "27.5.2025"})}
				</Typography>
			</Box>
		</Container>
	);
};

export default TermsOfUse;
