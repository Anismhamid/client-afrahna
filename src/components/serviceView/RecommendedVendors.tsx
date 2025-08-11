import {FunctionComponent, useCallback, useEffect, useState} from "react";
import {
	Typography,
	Card,
	CardContent,
	Box,
	Skeleton,
	useTheme,
	useMediaQuery,
	Grid,
} from "@mui/material";

import {getRecommendedVendors} from "../../services/recomendedVendors";
import {Services} from "../../interfaces/services";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import {useTranslation} from "react-i18next";
import ServiceCard from "./ServiceCard";

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
			console.log(res);
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
			{services.length <= settings.slidesToShow ? (
				<Slider {...settings} aria-label='Recommended services carousel'>
					{services.map((service) => (
						<Box key={service.vendorId} px={1} >
							<ServiceCard
								service={service}
								vid={service.vendorId}
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
