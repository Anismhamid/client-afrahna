import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Chip,
	IconButton,
	Skeleton,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import {FunctionComponent, useState} from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Services} from "../../interfaces/services";
import {formatCurrency} from "../../helpers/vendors";
import {StarIcon} from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
	service: Services;
	isFavorite: boolean;
	onToggleFavorite: (id: string) => void;
	isRecommended?: boolean;
	vid: string;
}

const ServiceCard: FunctionComponent<ServiceCardProps> = ({
	service,
	isFavorite,
	isRecommended,
	onToggleFavorite,
}) => {
	const theme = useTheme();
	const [imageLoaded, setImageLoaded] = useState(false);

	const imageUrl =
		Array.isArray(service.images) && service.images.length > 0
			? typeof service.images[0] === "string"
				? service.images[0]
				: service.images[0].url
			: "/wedding-rings.png";

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	return (
		<Box sx={{display: "flex", justifyContent: "space-around"}}>
			<Card
				sx={{
					borderRadius: 2,
					boxShadow: 1,
					width: "100%",
					maxHeight: 300,
					margin: 2,
					transition: "transform 0.3s, box-shadow 0.3s",
					// "&:hover": {
					// 	transform: "translateY(-5px)",
					// 	boxShadow: 8,
					// },
				}}
				aria-label={`Service card for ${service.businessName}`}
			>
				<Link
					to={`/service/${service.vendorId}`}
					style={{textDecoration: "none"}}
					aria-label={`View details for ${service.businessName}`}
				>
				<Box sx={{position: "relative"}}>
					{isRecommended && (
						<Chip
							icon={<StarIcon />}
							label='موصى به'
							color='secondary'
							sx={{
								position: "absolute",
								top: 16,
								left: 100,
								zIndex: 2,
								fontWeight: "bold",
							}}
						/>
					)}
				</Box>
				<Box sx={{position: "relative"}}>
					{!imageLoaded && (
						<Skeleton variant='rectangular' height={200} width='100%' />
					)}
					<CardMedia
						component='img'
						height='200'
						image={imageUrl}
						alt={`${service.businessName} service image`}
						sx={{
							objectFit: "cover",
							backgroundColor: theme.palette.grey[200],
							display: imageLoaded ? "block" : "none",
						}}
						onLoad={handleImageLoad}
						loading='lazy'
					/>
					<Chip
						label={formatCurrency(service.price?.min || 0)}
						color='primary'
						sx={{
							position: "absolute",
							top: 16,
							left: 16,
							fontWeight: "bold",
							px: 1.5,
							py: 0.5,
							borderRadius: "8px",
						}}
					/>
					<Tooltip
						title={isFavorite ? "Remove from favorites" : "Add to favorites"}
					>
						<IconButton
							onClick={(e) => {
								e.preventDefault();
								onToggleFavorite(service.vendorId);
							}}
							sx={{
								position: "absolute",
								top: 16,
								right: 16,
								bgcolor: "background.paper",
								"&:hover": {
									bgcolor: "action.hover",
								},
							}}
							aria-label={
								isFavorite ? "Remove from favorites" : "Add to favorites"
							}
						>
							{isFavorite ? (
								<FavoriteIcon color='primary' />
							) : (
								<FavoriteBorderIcon color='primary' />
							)}
						</IconButton>
					</Tooltip>
				</Box>

				<CardContent sx={{flexGrow: 1, p: 2}}>
					<Typography
						variant='h6'
						sx={{
							fontWeight: "bold",
							mb: 1,
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
						aria-label={`Business name: ${service.businessName}`}
					>
						{service.businessName}
					</Typography>

					{/* <Box sx={{display: "flex", alignItems: "center", mb: 1}}>
							<Rating
								value={service.rating || 5}
								precision={0.5}
								readOnly
								sx={{ml: 1}}
								aria-label={`Rating: ${service.rating || 5} stars`}
							/>
							<Typography variant='body2' color='text.secondary'>
								({service.reviewCount || 19})
							</Typography>
						</Box> */}

					{service.address && (
						<Box sx={{display: "flex", alignItems: "center", mb: 2}}>
							<LocationOnIcon
								fontSize='small'
								color='primary'
								sx={{ml: 0.5}}
							/>
							<Typography variant='body2' color='text.secondary'>
								{`${service.address.city || ""}, ${
									service.address.street || ""
								}`}
							</Typography>
						</Box>
					)}
				</CardContent>
				</Link>
			</Card>
		</Box>
	);
};

export default ServiceCard;
