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
	Stack,
	IconButton,
} from "@mui/material";
import {Dispatch, FunctionComponent, SetStateAction} from "react";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import {FormValues} from "../../interfaces/specialOffers";
import {useNavigate} from "react-router-dom";
import {DeleteIcon} from "lucide-react";
import {deleteAnSpecialOffer} from "../../services/specialOffers";

interface SpecialOffersListProps {
	offers: FormValues[];
	loading: boolean;
	setOffers: Dispatch<SetStateAction<FormValues[]>>;
}

const SpecialOffersList: FunctionComponent<SpecialOffersListProps> = ({
	offers,
	loading,
  setOffers
}) => {
	const navigate = useNavigate();


  const handleDelete = async (offerId: string) => {
  const deleted = await deleteAnSpecialOffer(offerId);
  setOffers(prev => prev.filter(o => o._id !== offerId));
};

return (
	<Box sx={{m: "auto", p: 3}}>
		<Typography variant='h5' gutterBottom>
			العروض الحالية
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
						<Grid size={{xs: 12, sm: 12, md: 12}} key={offer._id}>
							<Card
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									mt: "auto",
								}}
							>
								<CardContent>
									<Typography variant='h6' component='h4' gutterBottom>
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
											تاريخ العرض :
										</Typography>
										<Typography
											textAlign={"start"}
											variant='h6'
											component='h4'
											gutterBottom
										>
											{offer.createdAt &&
												new Date(offer.createdAt).toLocaleString(
													"he-IL",
													{
														year: "numeric",
														month: "short",
														day: "numeric",
														hour: "2-digit",
														minute: "2-digit",
													},
												)}
										</Typography>
									</Box>
									{offer.note && (
										<Typography
											variant='body2'
											color='text.secondary'
											paragraph
										>
											dsecription:
											{offer.note}
										</Typography>
									)}
									{offer.images.some((img) => img.url) && (
										<>
											<Divider sx={{my: 2}} />
											<ImageList
												cols={1}
												style={{padding: 3}}
												sx={{
													maxHeight: "100%",
													minHeight: "50%",
												}}
											>
												{offer.images.map(
													(img, i) =>
														img.url && (
															<ImageListItem key={i}>
																<img
																	src={img.url}
																	alt={
																		img.alt ||
																		"No description"
																	}
																	loading='lazy'
																	style={{
																		height: 100,
																		objectFit:
																			"cover",
																	}}
																/>
																{img.alt && (
																	<ImageListItemBar
																		title={img.alt}
																		position='below'
																	/>
																)}
															</ImageListItem>
														),
												)}
											</ImageList>
										</>
									)}
									<Divider sx={{my: 2}} />

									<Typography variant='subtitle1' gutterBottom>
										خدمات:
									</Typography>
									<List dense>
										{offer.services.map((s, i) => (
											<ListItem key={i}>
												<ListItemText
													primary={s.featureName}
													secondary={`$${s.price.toFixed(2)}`}
												/>
											</ListItem>
										))}
									</List>
								</CardContent>
								<Button
									onClick={() => navigate(`/service/${offer.vendorId}`)}
									variant='contained'
									sx={{
										width: 200,
										mx: "auto",
										my: 2,

										backgroundColor: "primary.main",
									}}
								>
									احصل على هذا العرض
								</Button>
								<Stack>
									<IconButton
										color='error'
										onClick={() => handleDelete(offer._id as string)}
									>
										<DeleteIcon />
									</IconButton>
								</Stack>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>
		)}
	</Box>
);
};

export default SpecialOffersList;
