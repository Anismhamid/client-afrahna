import {FunctionComponent} from "react";
import i18n from "../../locales/i18n";
import {Box, Button} from "@mui/material";

interface TranslateButtonsProps {}

const TranslateButtons: FunctionComponent<TranslateButtonsProps> = () => {
	return (
		<Box
			sx={{
				textAlign: "center",
				background: "#0F4073",
				borderRadius: "3px 3px 0 0 ",
				width: "93%",
				m: "auto",
				"& button": {
					color: "orange",
				},
			}}
		>
			<Button onClick={() => i18n.changeLanguage("ar")}>AR</Button>|
			<Button onClick={() => i18n.changeLanguage("he")}>He</Button>|
			<Button onClick={() => i18n.changeLanguage("en")}>En</Button>
		</Box>
	);
};

export default TranslateButtons;
