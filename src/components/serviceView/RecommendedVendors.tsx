import {FunctionComponent, memo, useCallback, useEffect, useState} from "react";
import {
	Typography,
	Card,
	CardMedia,
	CardContent,
	Button,
	Rating,
	Chip,
	Box,
	Skeleton,
	useTheme,
	useMediaQuery,
	IconButton,
	Grid,
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

interface ServiceCardProps {
	service: Services;
	isFavorite: boolean;
	onToggleFavorite: (id: string) => void;
}

const ServiceCard = memo(({service, isFavorite, onToggleFavorite}: ServiceCardProps) => {
	const theme = useTheme();
	const imageUrl =
		Array.isArray(service.images) && service.images.length > 0
			? typeof service.images[0] === "string"
				? service.images[0]
				: service.images[0].url
			: "/wedding-rings.png";


	return (
		<Card
			sx={{
				borderRadius: 2,
				boxShadow: 1,
				height: "100%",
				transition: "transform 0.3s, box-shadow 0.3s",
				"&:hover": {
					transform: "translateY(-5px)",
					boxShadow: 8,
				},
			}}
		>
			<Link to={`/service/${service._id}`} style={{textDecoration: "none"}}>
				<Box sx={{position: "relative"}}>
					<CardMedia
						component='img'
						height='200'
						image={imageUrl}
						alt={service.businessName}
						sx={{
							objectFit: "cover",
							backgroundColor: theme.palette.grey[200],
						}}
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
					>
						{isFavorite ? (
							<FavoriteIcon color='primary' />
						) : (
							<FavoriteBorderIcon color='primary' />
						)}
					</IconButton>
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
					>
						{service.businessName}
					</Typography>

					<Box sx={{display: "flex", alignItems: "center", mb: 1}}>
						<Rating value={5} precision={0.5} readOnly sx={{ml: 1}} />
						<Typography variant='body2' color='text.secondary'>
							(19)
						</Typography>
					</Box>

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
	);
});

interface RecommendedServicesProps {}

const RecommendedServices: FunctionComponent<RecommendedServicesProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState(true);
	const [favorites, setFavorites] = useState<Set<string>>(new Set());
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const settings = {
		infinite: true,
		slidesToScroll: 1,
		slidesToShow: isMobile ? 1 : isTablet ? 2 : 5,
		autoplay: true,
		speed: 800,
		dots: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		centerPadding: isMobile ? "20px" : "60px",
		cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
		responsive: [
			{
				breakpoint: theme.breakpoints.values.xl,
				settings: {
					slidesToShow: 4,
					centerPadding: "60px",
				},
			},
			{
				breakpoint: theme.breakpoints.values.lg,
				settings: {
					slidesToShow: 3,
					centerPadding: "40px",
				},
			},
			{
				breakpoint: theme.breakpoints.values.md,
				settings: {
					slidesToShow: 1,
					centerMode: false,
				},
			},
			{
				breakpoint: theme.breakpoints.values.xs,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true,
				},
			},
		],
	};

	const fetchServices = useCallback(async () => {
		setLoading(true);
		try {
			const res = await getRecommendedVendors();
			setServices(res);
		} catch (err) {
			console.error("Failed to fetch vendors:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchServices();
	}, [fetchServices]);

	const toggleFavorite = useCallback((serviceId: string) => {
		setFavorites((prev) => {
			const newFavorites = new Set(prev);
			newFavorites.has(serviceId)
				? newFavorites.delete(serviceId)
				: newFavorites.add(serviceId);
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
					الخدمات الموصى بها
				</Typography>
				<HorizontalDevider />
				<Grid container spacing={1} justifyContent='center'>
					{[...Array(isMobile ? 1 : isTablet ? 2 : 3)].map((_, index) => (
						<Grid size={{xs: 12, md: 4}} key={index}>
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
				الخدمات الموصى بها
			</Typography>
			<HorizontalDevider />
			{services.length  ? (
				<Slider {...settings}>
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
						لا توجد خدمات موصى بها حالياً
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default RecommendedServices;
