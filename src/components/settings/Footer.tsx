import {Box, Typography} from "@mui/material";
import {FunctionComponent} from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
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
				© جميع الحقوق محفوظة - موقع أفراحنا 2025
			</Typography>
		</Box>
	);
};

export default Footer;
