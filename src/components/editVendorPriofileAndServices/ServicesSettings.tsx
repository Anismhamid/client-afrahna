import {FunctionComponent, useState} from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import {
	Button,
	Typography,
	Divider,
	Box,
	useMediaQuery,
	Paper,
	List,
	ListItem,
	IconButton,
	CircularProgress,
	ListItemText,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Theme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddNewServiceModal from "../../atoms/AddNewServiceModal";
import {JwtPayload} from "../../interfaces/userSchema";
import {Services} from "../../interfaces/services";
import {formatCurrency} from "../../helpers/vendors";
import {removeVendorService} from "../../services/vendorServices";
import {useTranslation} from "react-i18next";
import changeDirection from "../../../locales/directions";

interface ServicesSettingsProps {
	vendorServices: Services[];
	user: JwtPayload;
}

const ServicesSettings: FunctionComponent<ServicesSettingsProps> = ({
	vendorServices,
	user,
}) => {
	const dir = changeDirection();
	const {t} = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [refresh, setRefresh] = useState<boolean>(false);
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

	const [open, setOpen] = useState<boolean>(false);

	const handleClickOpen = () => setOpen(!open);
	const handleClose = () => setOpen(!open);

	const handleRemoveVendorService = async (vid: string, servName: string) => {
		setLoading(true);
		try {
			await removeVendorService(vid, servName);

			setRefresh(!refresh);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Paper
			dir={dir}
			sx={{
				backdropFilter: "blur(80px)",
				p: 3,
				borderRadius: 2,
				boxShadow: 3,
				backgroundColor: "background.paper",
			}}
			elevation={3}
		>
			<Typography variant='h5' gutterBottom sx={{textAlign: "center", mb: 3}}>
				{t("servicesSettings.availableServices")}
			</Typography>

			<Box sx={{display: "flex", justifyContent: "flex-start", mb: 2}}>
				<Button
					variant='contained'
					color='primary'
					startIcon={<AddIcon />}
					onClick={handleClickOpen}
					sx={{borderRadius: 5}}
				>
					{t("servicesSettings.addNewService")}
				</Button>
			</Box>

			{vendorServices.length === 0 ? (
				<Typography color='text.secondary' textAlign='center' py={4}>
					{t("servicesSettings.noServicesAvailable")}
				</Typography>
			) : isMobile ? (
				// Mobile View
				<List sx={{width: "100%"}}>
					{vendorServices.map((vendorItem, index) => (
						<Paper key={index} sx={{mb: 3, overflow: "hidden"}}>
							<Box sx={{p: 2}}>
								<Typography variant='h6' textAlign='center' gutterBottom>
									{vendorItem.businessName}
								</Typography>

								<Box sx={{mb: 2}}>
									<Typography variant='subtitle2'>
										{t("servicesSettings.priceRange")}:
									</Typography>
									<Typography>
										{vendorItem.priceType === "fixed"
											? `${formatCurrency(
													vendorItem.price.min,
											  )} (${t("servicesSettings.fixed")})`
											: `${t(
													"servicesSettings.from",
											  )} ${formatCurrency(
													vendorItem.price.min,
											  )} ${t(
													"servicesSettings.to",
											  )} ${formatCurrency(vendorItem.price.max)}`}
									</Typography>
								</Box>

								<Divider sx={{my: 1}} />

								<Typography variant='subtitle2' gutterBottom>
									{t("servicesSettings.services")}:
								</Typography>
								{vendorItem.services?.length > 0 ? (
									<List dense>
										{vendorItem.services.map((service, i) => (
											<ListItem
												key={i}
												secondaryAction={
													<Box
														component='div'
														sx={{
															display: "flex",
															alignItems: "center",
														}}
													>
														{loading ? (
															<CircularProgress size={20} />
														) : (
															<IconButton
																edge='end'
																color='error'
																onClick={() =>
																	handleRemoveVendorService(
																		vendorItem.vendorId,
																		service.featureName,
																	)
																}
																disabled={loading}
																sx={{
																	"&.MuiIconButton-root":
																		{
																			padding: 0,
																			background:
																				"transparent",
																		},
																}}
															>
																<DeleteIcon />
															</IconButton>
														)}
													</Box>
												}
											>
												<ListItemText
													primary={
														service.featureName ||
														t(
															"servicesSettings.unnamedService",
														)
													}
													secondary={
														service.price !== undefined
															? formatCurrency(
																	service.price,
															  )
															: null
													}
												/>
											</ListItem>
										))}
									</List>
								) : (
									<Typography variant='body2' color='text.secondary'>
										{t("servicesSettings.noServices")}
									</Typography>
								)}
							</Box>
						</Paper>
					))}
				</List>
			) : (
				// Desktop View
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{fontWeight: "bold"}}>
									{t("servicesSettings.businessName")}
								</TableCell>
								<TableCell>{vendorServices[0].businessName}</TableCell>

								<TableCell sx={{fontWeight: "bold"}}>
									{t("servicesSettings.priceRange")}
								</TableCell>

								<TableCell>
									{vendorServices[0].priceType === "fixed" ? (
										<span>
											{formatCurrency(vendorServices[0].price.min)}{" "}
											({t("servicesSettings.fixed")})
										</span>
									) : (
										<span>
											{t("servicesSettings.from")}{" "}
											{formatCurrency(vendorServices[0].price.min)}{" "}
											{t("servicesSettings.to")}{" "}
											{formatCurrency(vendorServices[0].price.max)}
										</span>
									)}
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
					<Table sx={{minWidth: 650}} aria-label='services table'>
						<TableHead>
							<TableRow>
								<TableCell sx={{fontWeight: "bold"}}>
									{t("servicesSettings.services")}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{vendorServices.map((vendorItem, index) => (
								<TableRow key={index}>
									<TableCell>
										{vendorItem.services?.length > 0 ? (
											<List dense>
												{vendorItem.services.map((service, i) => (
													<ListItem
														key={i}
														secondaryAction={
															<IconButton
																edge='end'
																color='error'
																onClick={() =>
																	handleRemoveVendorService(
																		vendorItem.vendorId,
																		service.featureName,
																	)
																}
																disabled={loading}
															>
																{loading ? (
																	<CircularProgress
																		size={20}
																	/>
																) : (
																	<DeleteIcon />
																)}
															</IconButton>
														}
													>
														<ListItemText
															primary={
																service.featureName ||
																t(
																	"servicesSettings.unnamedService",
																)
															}
															secondary={
																service.price !==
																undefined
																	? formatCurrency(
																			service.price,
																	  )
																	: null
															}
														/>
													</ListItem>
												))}
											</List>
										) : (
											<Typography
												variant='body2'
												color='text.secondary'
											>
												{t("servicesSettings.noServices")}
											</Typography>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			<AddNewServiceModal
				userId={user?._id as string}
				handleClose={handleClose}
				open={open}
				refresh={() => setRefresh(!refresh)}
			/>
		</Paper>
	);
};

export default ServicesSettings;
