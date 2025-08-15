import {Box, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
	const {t, i18n} = useTranslation();
	const dir = i18n.dir();

	return (
		<Box
			dir={dir}
			component='footer'
			sx={{
				background: "linear-gradient(90deg, #6a11cb, #2575fc)",
				textAlign: "center",
				py: 3,
				mt: 5,
				color: "#ffffff",
			}}
		>
			<Typography variant='body2'>
				© {new Date().getFullYear()} {t("footer.copyRight")}
			</Typography>
		</Box>
	);
};

export default Footer;
