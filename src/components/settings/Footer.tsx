import {Box, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
	const {t} = useTranslation();
	return (
		<Box
			component='footer'
			sx={{
				color: "white",
				textAlign: "center",
				py: 2,
				mt: 5,
			}}
		>
			<Typography color='#ED6C03' dir='ltr' variant='body1'>
				© {t("footer.copyRight")} 2025
			</Typography>
		</Box>
	);
};

export default Footer;
