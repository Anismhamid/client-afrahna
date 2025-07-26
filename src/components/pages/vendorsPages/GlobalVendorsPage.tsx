import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getServiceByCategories} from "../../../services/vendorsServices";
import {Address, Services} from "../../../interfaces/services";
import HorizontalDevider from "../../../atoms/customDeviders/HorizontalDevider";
import JsonLd from "../../JsonLd";
import {generateServiceJsonLd} from "../../../utils/structuredData";
import {getCoordinates} from "../../../atoms/map/OpenStreetMap";
import ServiceFilters from "./ServiceFilters";
import ServiceCard from "./ServiceCard";
import useMetaDocument from "../../../hooks/useMetaDocunent";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

interface GlobalVendorsPageProps {
	category: string;
	pageTitle: string;
	metaDescription: string;
	introText: string;
	subCategories?: string[];
}

const GlobalVendorsPage: FunctionComponent<GlobalVendorsPageProps> = ({
	category,
	pageTitle,
	metaDescription,
	introText,
}) => {
	const {t} = useTranslation();
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortBy, setSortBy] = useState<"rating" | "price" | "location" | "none">(
		"none",
	);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
	const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(
		null,
	);
	const navigate = useNavigate();

	// creating meta data
	useMetaDocument(pageTitle, metaDescription);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				setLoading(true);

				// Get user location if needed
				if (sortBy === "location" && !userLocation) {
					const cachedLocation = localStorage.getItem("userLocation");
					if (cachedLocation) {
						setUserLocation(JSON.parse(cachedLocation));
					} else {
						navigator.geolocation.getCurrentPosition(
							(position) => {
								const loc = {
									lat: position.coords.latitude,
									lng: position.coords.longitude,
								};
								setUserLocation(loc);
								localStorage.setItem("userLocation", JSON.stringify(loc));
							},
							(error) => console.error("Location error:", error),
						);
					}
				}

				// Fetch and enhance services
				const servicesData = await getServiceByCategories(category);

				const enhancedServices = await Promise.all(
					servicesData.map(
						async (service: {
							address: {city: string; street: string};
							businessName: string;
						}) => {
							try {
								const {lat, lng} = await getCoordinates(
									service.address.city,
									service.address.street,
								);
								return {
									...service,
									address: {...service.address, lat, lng},
								};
							} catch (error) {
								console.error(
									`Geocoding failed for ${service.businessName}`,
									error,
								);
								return {
									...service,
									address: {
										...service.address,
										lat: 32.0853,
										lng: 34.7818,
									},
								};
							}
						},
					),
				);

				setServices(enhancedServices);
			} catch (error) {
				console.error("Service fetch failed:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchServices();
	}, [category, sortBy, userLocation]);

	const calculateDistance = (lat1: number, lon1: number, address: Address) => {
		if (!address.lat || !address.lng) {
			return Infinity;
		}
		const R = 6371;
		const dLat = ((address.lat - lat1) * Math.PI) / 180;
		const dLon = ((address.lng - lon1) * Math.PI) / 180;
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos((lat1 * Math.PI) / 180) *
				Math.cos((address.lat * Math.PI) / 180) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	};

	const filteredServices = useMemo(() => {
		let result = [...services];

		// Filter by search
		if (searchTerm) {
			result = result.filter(
				(service) =>
					service.businessName
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					service.description
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					service.address.city.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		// Filter by price (based on sub-services)
		result = result.filter((service) => {
			if (!service.services || service.services.length === 0) return false;

			const minServicePrice = Math.min(...service.services.map((s) => s.price));
			const maxServicePrice = Math.max(...service.services.map((s) => s.price));

			return minServicePrice >= priceRange[0] && maxServicePrice <= priceRange[1];
		});

		// Sort
		switch (sortBy) {
			// case "rating":
			// 	result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
			// 	break;
			case "price":
				result.sort((a, b) => {
					const aMinPrice = a.services?.length
						? Math.min(...a.services.map((s) => s.price))
						: 0;
					const bMinPrice = b.services?.length
						? Math.min(...b.services.map((s) => s.price))
						: 0;
					return aMinPrice - bMinPrice;
				});
				break;
			case "location":
				if (userLocation) {
					result.sort((a, b) => {
						const distanceA = calculateDistance(
							userLocation.lat,
							userLocation.lng,
							a.address,
						);
						const distanceB = calculateDistance(
							userLocation.lat,
							userLocation.lng,
							b.address,
						);
						return distanceA - distanceB;
					});
				}
				break;
			default:
				break;
		}

		return result;
	}, [services, searchTerm, sortBy, priceRange, userLocation]);

	if (loading) {
		return (
			<div className='text-center mt-5'>
				<div className='spinner-border text-warning' role='status' />
			</div>
		);
	}

	return (
		<main>
			<Typography
				variant='h1'
				sx={{color: "primary.main", fontSize: "3rem"}}
				className='display-6 fw-bold text-center mb-3'
			>
				{t(pageTitle)}
			</Typography>
			<HorizontalDevider />
			<div className='text-center mb-5 p-3'>
				<JsonLd
					data={generateServiceJsonLd({
						serviceType: category,
						serviceUrl:
							services.length > 0
								? `https://client-afrahna.vercel.app/${services[0].vendorId}`
								: "",
					})}
				/>
				<Typography
					variant='h2'
					sx={{color: "primary.main", fontSize: "2rem"}}
					className='lead'
				>
					{t(introText)}
				</Typography>
			</div>

			<ServiceFilters
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				sortBy={sortBy}
				setSortBy={setSortBy}
				priceRange={priceRange}
				setPriceRange={setPriceRange}
			/>

			<div className='container'>
				{filteredServices.length === 0 ? (
					<div className='text-center py-5'>
						<h4>{t("globalVendorsPage.noServices")}</h4>
					</div>
				) : (
					<div className='row m-auto row-cols-1 row-cols-md-2 row-cols-xl-4 g-5'>
						{filteredServices.map((service) => (
							<ServiceCard
								key={service.vendorId}
								service={service}
								onNavigate={() =>
									navigate(`/service/${service.vendorId}`)
								}
							/>
						))}
					</div>
				)}
			</div>
		</main>
	);
};

export default GlobalVendorsPage;
