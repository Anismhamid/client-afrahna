import {FunctionComponent, JSX, useEffect, useMemo, useState} from "react";
import {
	AppBar,
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
	Grid,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../../contextApi/useUserData";
import {Logout, Person} from "@mui/icons-material";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SettingsIcon from "@mui/icons-material/Settings";
import SubscripbeButton from "../../subscribes/subscribeButton/SubscripbeButton";
import {mainMenu, navbarItems} from "../../config/mainMenu";
import {CloseButton} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import TranslateButtons from "../../atoms/TranslateButtons";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

const Navbar: FunctionComponent = () => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const location = useLocation();
	const {user, setUser} = useUser();
	const {t} = useTranslation();
	const [index, setIndex] = useState(0);

	const toggleDrawer = (open: boolean) => () => {
		setOpen(open);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/");
	};

	const currentUser = useMemo(() => {
		return (
			user?.businessName || `${user?.name?.first ?? ""} ${user?.name?.last ?? ""}`
		);
	}, [user]);

	const navLinkItem = (path: string, icon: JSX.Element, text: string) => (
		<ListItem disablePadding>
			<NavLink
				to={path}
				style={{width: "100%", textDecoration: "none", color: "inherit"}}
			>
				<ListItemButton>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText primary={t(text)} />
				</ListItemButton>
			</NavLink>
		</ListItem>
	);

	return (
		<Box
			sx={{
				flexGrow: 1,
				position: "sticky",
				top: 0,
				zIndex: 1001,
				p: 1,
				margin: "auto",
			}}
			width={isMobile ? "100%" : "90%"}
		>
			<AppBar
				sx={{
					zIndex: 2,
					borderRadius: 10,
					fontSize: "1.2rem",
				}}
				position='sticky'
			>
				<Toolbar>
					<Box
						component={"nav"}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							px: 2,
							py: 2,
							color: "white",
							width: "100%",
							borderRadius: 8,
							boxShadow: "0 0 10px 2px inset black ",
						}}
					>
						<IconButton
							size='small'
							edge='start'
							color='inherit'
							aria-label='menu'
							onClick={toggleDrawer(true)}
						>
							<MenuIcon />
						</IconButton>
						<Box
							sx={{
								border: 1,
								borderRadius: 3,
								px: 2,
								"& a:hover": {
									fontSize: "17px",
								},
							}}
						>
							<NavLink
								to='/'
								style={{
									cursor: "pointer",
									fontWeight: "bold",
									color: "white",
								}}
							>
								{t("afrahna.title")}
							</NavLink>
						</Box>

						{!user?._id ? (
							<Box>
								<Button
									sx={{fontSize: "11px"}}
									variant='contained'
									onClick={() => navigate("/login")}
									color='warning'
								>
									{t("navbar.login")}
								</Button>
							</Box>
						) : (
							<Box>
								<Button
									color='error'
									variant='contained'
									size='small'
									onClick={logout}
								>
									{t("login.logout")}
								</Button>
							</Box>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			{/* side drawer */}
			<Drawer
				variant='persistent'
				anchor={isMobile ? "top" : "right"}
				open={open}
				onClose={toggleDrawer(false)}
			>
				<CloseButton
					style={{width: "100%", marginTop: 8, height: "100%"}}
					onClick={toggleDrawer(false)}
				/>

				{user && (
					<Box
						style={{
							width: "100%",
							textDecoration: "none",
							color: "white",
							backgroundColor: "#681024",
						}}
					>
						<Typography
							variant='h6'
							sx={{
								fontWeight: 1000,
								p: 1,
								textAlign: "center",
								border: 4,
							}}
						>
							{currentUser}
						</Typography>
					</Box>
				)}
				{user?.email && (
					<Typography
						variant='h6'
						sx={{
							textAlign: "center",
							border: 1,
							borderRadius: 3,
							mx: 1,
						}}
					>
						{user?.email}
					</Typography>
				)}

				<Box
					role='presentation'
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
					width={isMobile ? "100%" : 250}
				>
					<List>
						{navbarItems.map((item) =>
							navLinkItem(item.path, item.icon, item.text),
						)}
						{user && (
							<>
								<Typography
									color='warning'
									sx={{
										fontWeight: "bold",
										fontSize: 25,
										backgroundColor: "AppWorkspace",
										textAlign: "center",
									}}
								>
									{t("navbar.management")}
								</Typography>

								{navLinkItem("/profile", <Person />, t("navbar.profile"))}
								{navLinkItem(
									"/my-bookings",
									<ChecklistRtlIcon />,
									t("navbar.bookingsManagement"),
								)}
							</>
						)}
						{user?.role === "isVendor" &&
							navLinkItem(
								`/vendors/${user._id}`,
								<SettingsIcon color='info' />,
								t("navbar.servicesManagement"),
							)}
						{user?.role === "admin" && (
							<>
								{navLinkItem(
									"/manage/users",
									<SettingsIcon color='info' />,
									t("navbar.userManagement"),
								)}
								{navLinkItem(
									"/manage/vendors",
									<SettingsIcon color='primary' />,
									t("navbar.vendorsManagement"),
								)}
							</>
						)}
						{user?.role === "isVendor" &&
							!user?.subscriptionData?.isSubscribed && (
								<Box sx={{width: "100%", m: "auto"}}>
									<SubscripbeButton />
								</Box>
							)}
						<Divider color='error' variant='fullWidth' />

						{/* navigate menu */}
						<Grid container spacing={2}>
							{mainMenu.map((item, i) => (
								<Grid size={{xs: 6}}>
									<Tabs
										aria-label='Soft tabs'
										value={item.label}
										onChange={(_, value) => setIndex(value as number)}
									>
										<TabList variant='soft'>
											<Tab
												variant={index === i ? "solid" : "plain"}
												color={
													index === i ? "primary" : "neutral"
												}
												component={Link}
												to={item.link}
												value={i}
											>
												{t(item.label)}
											</Tab>
										</TabList>
									</Tabs>
								</Grid>
							))}
						</Grid>
						{user?._id ? (
							<Box
								sx={{position: "relative", right: 0, left: 0, bottom: 0}}
							>
								<Button
									sx={{
										width: "100%",
										display: "flex",
										justifyContent: "space-around",
									}}
									color='error'
									variant='outlined'
									onClick={logout}
								>
									<Logout />
									{t("login.logout")}
								</Button>
							</Box>
						) : (
							<Box>
								<Button
									sx={{
										width: "100%",
										display: "flex",
										justifyContent: "space-around",
									}}
									color='error'
									variant='outlined'
									onClick={() => navigate("/login")}
								>
									{t("login.login")}
								</Button>
							</Box>
						)}
					</List>
					{/* Translate buttons */}
					<TranslateButtons />
				</Box>
			</Drawer>
		</Box>
	);
};

export default Navbar;
