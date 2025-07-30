import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

const Pnf: FunctionComponent = () => {
	const navigate = useNavigate();
	const {t} = useTranslation();

	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			minHeight='100vh'
			textAlign='center'
			px={2}
		>
			<Typography variant='h1' color='primary' fontWeight={700}>
				404
			</Typography>
			<Typography variant='h4' gutterBottom>
				{t("pnf.title")}
			</Typography>
			<Typography variant='body1' mb={3}>
				{t("pnf.description")}
			</Typography>
			<Button variant='contained' color='primary' onClick={() => navigate("/")}>
				{t("pnf.backHome")}
			</Button>
		</Box>
	);
};

export default Pnf;
