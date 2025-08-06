import {FunctionComponent, memo, useCallback, useEffect, useState} from "react";
import {
	Typography,
	Card,
	CardMedia,
	CardContent,
	Rating,
	Chip,
	Box,
	Skeleton,
	useTheme,
	useMediaQuery,
	IconButton,
	Grid,
	Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {getRecommendedVendors} from "../../services/recomendedVendors";
import {Services} from "../../interfaces/services";
import {Link} from "react-router-dom";
import {formatCurrency} from "../../helpers/vendors";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import {useTranslation} from "react-i18next";

interface ServiceCardProps {
	service: Services;
	isFavorite: boolean;
	onToggleFavorite: (id: string) => void;
}

const ServiceCard = memo(({service, isFavorite, onToggleFavorite}: ServiceCardProps) => {
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
					height: "100%",
					transition: "transform 0.3s, box-shadow 0.3s",
					"&:hover": {
						transform: "translateY(-5px)",
						boxShadow: 8,
					},
				}}
				aria-label={`Service card for ${service.businessName}`}
			>
				<Link
					to={`/service/${service.vendorId}`}
					style={{textDecoration: "none"}}
					aria-label={`View details for ${service.businessName}`}
				>
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
							title={
								isFavorite ? "Remove from favorites" : "Add to favorites"
							}
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
									isFavorite
										? "Remove from favorites"
										: "Add to favorites"
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
});

interface RecommendedServicesProps {}

const RecommendedServices: FunctionComponent<RecommendedServicesProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [favorites, setFavorites] = useState<Set<string>>(() => {
		// Initialize favorites from localStorage if available
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("favoriteVendors");
			return saved ? new Set(JSON.parse(saved)) : new Set();
		}
		return new Set();
	});

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));
	const {t} = useTranslation();

	const settings = {
		slidesToShow: 6,
		slidesToScroll: 1,
		cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
		autoplay: true,

		responsive: [
			{
				breakpoint: theme.breakpoints.values.xl,
				settings: {slidesToShow: 5},
			},
			{
				breakpoint: theme.breakpoints.values.lg,
				settings: {slidesToShow: 3},
			},
			{
				breakpoint: theme.breakpoints.values.md,
				settings: {slidesToShow: 2},
			},
			{
				breakpoint: theme.breakpoints.values.sm,
				settings: {slidesToShow: 1, arrows: false},
			},
		],
	};

	const fetchServices = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await getRecommendedVendors();
			setServices(res);
		} catch (err) {
			console.error("Failed to fetch vendors:", err);
			setError(t("recommendedVendors.fetchError"));
		} finally {
			setLoading(false);
		}
	}, [t]);

	useEffect(() => {
		fetchServices();
	}, [fetchServices]);

	const toggleFavorite = useCallback((serviceId: string) => {
		setFavorites((prev) => {
			const newFavorites = new Set(prev);
			if (newFavorites.has(serviceId)) {
				newFavorites.delete(serviceId);
			} else {
				newFavorites.add(serviceId);
			}

			// Persist to localStorage
			if (typeof window !== "undefined") {
				localStorage.setItem(
					"favoriteVendors",
					JSON.stringify(Array.from(newFavorites)),
				);
			}

			return newFavorites;
		});
	}, []);

	if (loading) {
		return (
			<Box sx={{p: 4, textAlign: "center"}}>
				<Typography
					variant='h4'
					gutterBottom
					sx={{
						textAlign: "center",
						fontWeight: "bold",
						color: theme.palette.primary.main,
						mt: 10,
					}}
				>
					{t("recommendedVendors.title")}
				</Typography>
				<HorizontalDevider />
				<Grid container spacing={1} justifyContent='center'>
					{[...Array(isMobile ? 1 : isTablet ? 2 : 3)].map((_, index) => (
						<Grid size={{xs: 12, sm: 6, md: 4}} key={index}>
							<Card sx={{borderRadius: 4, m: 3, height: "80%"}}>
								<Skeleton variant='rectangular' height={180} />
								<CardContent>
									<Skeleton variant='text' width='80%' sx={{mb: 1}} />
									<Skeleton variant='text' width='60%' sx={{mb: 1}} />
									<Skeleton variant='text' width='60%' />
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{p: 4, textAlign: "center"}}>
				<Typography
					variant='h4'
					gutterBottom
					sx={{
						textAlign: "center",
						fontWeight: "bold",
						color: theme.palette.primary.main,
						mt: 10,
					}}
				>
					{t("recommendedVendors.title")}
				</Typography>
				<HorizontalDevider />
				<Box sx={{textAlign: "center", py: 4}}>
					<Typography variant='body1' color='error'>
						{error}
					</Typography>
				</Box>
			</Box>
		);
	}

	return (
		<Box
			sx={{p: 4, textAlign: "center"}}
			component='section'
			aria-labelledby='recommended-services-heading'
		>
			<Typography
				variant='h4'
				gutterBottom
				id='recommended-services-heading'
				sx={{
					textAlign: "center",
					fontWeight: "bold",
					color: theme.palette.primary.main,
					mt: 10,
				}}
			>
				{t("recommendedVendors.title")}
			</Typography>
			<HorizontalDevider />
			{services.length ? (
				<Slider {...settings} aria-label='Recommended services carousel'>
					{services.map((service) => (
						<Box key={service._id} px={1}>
							<ServiceCard
								service={service}
								isFavorite={favorites.has(service.vendorId)}
								onToggleFavorite={toggleFavorite}
							/>
						</Box>
					))}
				</Slider>
			) : (
				<Box sx={{textAlign: "center", py: 4}}>
					<Typography variant='body1' color='text.secondary'>
						{t("recommendedVendors.noServices")}
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default RecommendedServices;
