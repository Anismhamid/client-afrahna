import {useState} from "react";
import {Box, Button, Menu, MenuItem, Tabs} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useTranslation} from "react-i18next";
import {mainMenu} from "../config/mainMenu";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import {useNavigate} from "react-router-dom";

const DropdownNav = () => {
	const {t} = useTranslation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();
	// const open = Boolean(anchorEl);
	// const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	// 	setAnchorEl(event.currentTarget);
	// };
	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	return (
		<Box sx={{display: "flex", alignItems: "center", gap: 2}}>
			<Tabs value={false} sx={{borderRadius: 20, bgcolor: "#fff3", px: 1}}>
				<TabList>
					{mainMenu.slice(0, 2).map((item) => (
						<Tab
							key={item.label}
							onClick={() => navigate(item.link)}
							variant='plain'
						>
							{t(item.label)}
						</Tab>
					))}
				</TabList>
			</Tabs>

			{/* Dropdown בתוך ה-Tabs */}
			<Box>
				<Button
					id='dropdown-tab'
					onClick={(e) => setAnchorEl(e.currentTarget)}
					sx={{color: "white"}}
					endIcon={<ArrowDropDownIcon />}
				>
					{t("menu.services")}
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={() => setAnchorEl(null)}
					anchorOrigin={{vertical: "bottom", horizontal: "left"}}
					transformOrigin={{vertical: "top", horizontal: "left"}}
				>
					{mainMenu.slice(2).map((item) => (
						<MenuItem
							key={item.label}
							onClick={() => {
								navigate(item.link);
								setAnchorEl(null);
							}}
						>
							{t(item.label)}
						</MenuItem>
					))}
				</Menu>
			</Box>
		</Box>
	);
};

export default DropdownNav;
