import {FunctionComponent} from "react";
import i18n from "../../locales/i18n";
import {Box, Button} from "@mui/material";

interface TranslateButtonsProps {}

const TranslateButtons: FunctionComponent<TranslateButtonsProps> = () => {
	return (
		<Box sx={{textAlign: "center", p: 3}}>
			<Button onClick={() => i18n.changeLanguage("ar")}>العربية</Button>
			<Button onClick={() => i18n.changeLanguage("he")}>עברית</Button>
			<Button onClick={() => i18n.changeLanguage("en")}>English</Button>
		</Box>
	);
};

export default TranslateButtons;
