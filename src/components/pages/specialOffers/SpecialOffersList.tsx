import {
	Box,
	Button,
	Typography,
	Divider,
	ImageListItemBar,
	ImageList,
	CardContent,
	Card,
	ImageListItem,
	Grid,
	ListItem,
	List,
	ListItemText,
	CircularProgress,
	IconButton,
} from "@mui/material";
import {Dispatch, FunctionComponent, SetStateAction, useState} from "react";
import HorizontalDevider from "../../../atoms/customDeviders/HorizontalDevider";
import {FormValues} from "../../../interfaces/specialOffers";
import {useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {deleteAnSpecialOffer} from "../../../services/specialOffers";
import {useUser} from "../../../contextApi/useUserData";
import EditOfferModal from "./EditOfferModal";
import {useTranslation} from "react-i18next";

interface SpecialOffersListProps {
	offers: FormValues[];
	loading: boolean;
	setOffers: Dispatch<SetStateAction<FormValues[]>>;
}

const SpecialOffersList: FunctionComponent<SpecialOffersListProps> = ({
	offers,
	loading,
	setOffers,
}) => {
	const navigate = useNavigate();
	const {user} = useUser();
	const {t} = useTranslation();
	const [openEdit, setOpenEdit] = useState(false);
	const [selectedOffer, setSelectedOffer] = useState<string>("");

	const handleEdit = (offerId: string) => {
		setSelectedOffer(offerId);
		setOpenEdit(true);
	};

	const handleDelete = async (offerId: string) => {
		try {
			await deleteAnSpecialOffer(offerId);
			setOffers((prev) => prev.filter((o) => o._id !== offerId));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box sx={{m: "auto", p: 1}} component={"main"}>
			<Typography mt={10} variant='h2' gutterBottom>
				العروض
			</Typography>
			<HorizontalDevider />

			{loading ? (
				<Box sx={{display: "flex", justifyContent: "center", py: 4}}>
					<CircularProgress />
				</Box>
			) : offers.length === 0 ? (
				<Typography variant='body1' color='text.secondary'>
					لا توجد عروض متاحة
				</Typography>
			) : (
				<Box sx={{m: "auto", p: 3}}>
					<Grid mx={"auto"} container spacing={3}>
						{offers.map((offer) => (
							<Grid
								sx={{border: 1, p: 2, borderRadius: 5, boxShadow: 8}}
								size={{xs: 12, sm: 12, md: 12}}
								key={offer._id}
							>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
										mt: "auto",
									}}
								>
									<CardContent>
										{offer.images.some((img) => img.url) && (
											<>
												<Divider sx={{my: 2}} />
												<ImageList cols={1}>
													<Box
														sx={{
															display: "flex",
															justifyContent:
																"space-around",
														}}
													>
														{offer.images.map(
															(img, i) =>
																img.url && (
																	<ImageListItem
																		key={i}
																	>
																		<img
																			src={img.url}
																			alt={
																				img.alt ||
																				"No description"
																			}
																			loading='lazy'
																		/>
																		{img.alt && (
																			<ImageListItemBar
																				title={
																					img.alt
																				}
																				position='top'
																			/>
																		)}
																	</ImageListItem>
																),
														)}
													</Box>
												</ImageList>
											</>
										)}
										<Divider sx={{my: 2}} />
										<Typography
											variant='h6'
											component='h4'
											gutterBottom
										>
											{offer.title}
										</Typography>
										<Box sx={{display: "flex", gap: 1}}>
											<Typography
												textAlign={"start"}
												variant='h6'
												component='h4'
												gutterBottom
												color='error'
											>
												{t("specialOffers.offerDate")}:
											</Typography>
											<Typography
												textAlign={"start"}
												variant='h6'
												component='h4'
												gutterBottom
											>
												{offer.createdAt &&
													new Date(
														offer.createdAt,
													).toLocaleString("he-IL", {
														year: "numeric",
														month: "short",
														day: "numeric",
														hour: "2-digit",
														minute: "2-digit",
													})}
											</Typography>
										</Box>

										{offer.note && (
											<Box
												sx={{
													border: 1,
													m: 2,
													p: 5,
													borderRadius: 5,
												}}
											>
												{t("specialOffers.offerDescription")}:
												<Typography
													variant='body1'
													color='text.secondary'
													sx={{
														whiteSpace: "pre-line",
														mt: 2,
													}}
												>
													{offer.note}
												</Typography>
											</Box>
										)}

										<Typography variant='subtitle1' gutterBottom>
											{t("specialOffers.services")}:
										</Typography>
										<List dense>
											{offer.services.map((s, i) => (
												<ListItem key={i}>
													<ListItemText
														primary={s.featureName}
														secondary={`${s.price.toLocaleString(
															"he-IL",
															{
																currency: "ILs",
																style: "currency",
															},
														)}`}
													/>
												</ListItem>
											))}
										</List>
									</CardContent>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-around",
										}}
									>
										<Button
											onClick={() =>
												navigate(`/service/${offer.vendorId}`)
											}
											variant='contained'
											sx={{
												width: 200,
												mx: "auto",
												my: 5,
												backgroundColor: "primary.main",
											}}
										>
											احصل عليه
										</Button>
										{user &&
											(offer.vendorId === user._id ||
												user.role === "admin") && (
												<Box
													display='flex'
													gap={1}
													justifyContent='center'
													my={2}
												>
													<IconButton
														sx={{
															width: 30,
															height: 30,
														}}
														color='primary'
														onClick={() =>
															handleEdit(
																offer._id as string,
															)
														}
													>
														<EditIcon />
													</IconButton>

													<IconButton
														sx={{
															width: 30,
															height: 30,
														}}
														color='error'
														onClick={() =>
															handleDelete(
																offer._id as string,
															)
														}
													>
														<DeleteIcon />
													</IconButton>
												</Box>
											)}
									</Box>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
			<EditOfferModal
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				offerId={selectedOffer}
				setOffers={setOffers}
			/>
		</Box>
	);
};

export default SpecialOffersList;
