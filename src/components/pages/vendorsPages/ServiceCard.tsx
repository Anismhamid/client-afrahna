import {FaStar, FaMapMarkerAlt} from "react-icons/fa";
import {Badge} from "react-bootstrap";
import {FunctionComponent, useMemo} from "react";
import {Services} from "../../../interfaces/services";
import {formatCurrency} from "../../../helpers/vendors";
import {Box, Button} from "@mui/material";
import WazeIcon from "/wazeIcon.png";
import {useTranslation} from "react-i18next";
import SocialMediaLinks from "../../../atoms/socialMediaLinks/SocialMediaLinks";

interface ServiceCardProps {
	service: Services & {rating?: number};
	onNavigate: () => void;
}

const ServiceCard: FunctionComponent<ServiceCardProps> = ({service, onNavigate}) => {
	const priceRange = useMemo(() => {
		if (!service.services?.length) return {min: 0, max: 0};
		const prices = service.services.map((s) => s.price);
		return {min: Math.min(...prices), max: Math.max(...prices)};
	}, [service.services]);

	const {t} = useTranslation();
	const isDefaultLocation =
		service.address.lat === 32.0853 && service.address.lng === 34.7818;

	const lat = service.address.lat;
	const lng = service.address.lng;

	const openWaze = () => {
		if (!lat || !lng) {
			alert("Location not available");
			return;
		}
		const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
		window.open(wazeUrl, "_blank");
	};

	return (
		<div className='col'>
			<div
				className='card border-0 shadow-sm h-100 position-relative hover-zoom'
				style={{transition: "transform 0.3s ease", borderRadius: "12px"}}
			>
				{isDefaultLocation && (
					<div className='alert alert-warning small mb-0'>
						{t("globalVendorsPage.location.basedOnCity")}
						{t("globalVendorsPage.moreServices")}
					</div>
				)}

				<div
					className='card-img-top bg-light d-flex align-items-center justify-content-center'
					style={{height: "200px", overflow: "hidden"}}
				>
					{service.images?.length ? (
						<img
							src={service.images[0].url}
							alt={service.images[0].alt || service.businessName}
							style={{height: "100%", objectFit: "cover"}}
						/>
					) : (
						<div className='text-muted'>{t("globalVendorsPage.noImage")}</div>
					)}
				</div>
				{/* כפתור ניווט ל-Waze */}
				<Button
					variant='outlined'
					size='small'
					color='info'
					onClick={openWaze}
					sx={{
						position: "absolute",
						top: 0,
						right: 0,
						backgroundColor: "#2D9CDB",
						color: "#fff",
						fontWeight: "bold",
						textTransform: "none",
						padding: "4px 8px",
						borderRadius: "0 0 0 20px",
						minWidth: "auto",
						boxShadow: 2,
						direction: "rtl",
						"& img": {marginInlineEnd: "6px"},
					}}
				>
					<img
						src={WazeIcon}
						alt='Waze'
						style={{width: 30, height: 30, marginInline: 8}}
					/>
					{t("waze")}
				</Button>

				<div className='card-body d-flex flex-column'>
					<div className='d-flex justify-content-between align-items-start'>
						<h5 className='card-title text-success fw-bold mb-2'>
							{service.businessName}
						</h5>
						{service.rating && (
							<div className='d-flex align-items-center'>
								<FaStar className='text-warning me-1' />
								<span>{service.rating.toFixed(1)}</span>
							</div>
						)}
					</div>
					{service.socialMediaLinks && (
						<Box mt={2} sx={{backgroundColor:"InactiveCaption"}}>
							<SocialMediaLinks
								facebook={service.socialMediaLinks.facebook}
								instagram={service.socialMediaLinks.instagram}
								twitter={service.socialMediaLinks.x}
								youtube={service.socialMediaLinks.youtube}
								tikTok={service.socialMediaLinks.tikTok}
								color='inherit'
								size='small'
								iconSize={24}
								spacing={2}
							/>
						</Box>
					)}
					<div className='mb-2'>
						<FaMapMarkerAlt className='text-primary me-1' />
						<span className='text-muted'>
							{service.address.city}, {service.address.street}
						</span>
					</div>

					{service.description && (
						<p
							className='text-muted small mb-2'
							style={{
								display: "-webkit-box",
								WebkitLineClamp: 2,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
							}}
						>
							{service.description}
						</p>
					)}

					{service.services?.length > 0 && (
						<div className='mb-2'>
							<strong className='small'>
								{t("globalVendorsPage.AvailableServices")}:
							</strong>
							<ul className='list-unstyled small'>
								{service.services.slice(0, 1).map((s, index: number) => (
									<li key={index} className='text-muted'>
										{s.featureName} - {formatCurrency(s.price)}
									</li>
								))}
								{service.services.length > 1 && (
									<li className='text-muted'>
										+{service.services.length - 1}{" "}
										{t("globalVendorsPage.moreServices")}
									</li>
								)}
							</ul>
						</div>
					)}

					<div className='d-flex justify-content-between align-items-center mt-auto'>
						<div>
							{priceRange.min !== priceRange.max ? (
								<Badge
									bg='light'
									text='dark'
									className='fs-6 px-3 py-1 rounded-pill'
								>
									{priceRange.min} - {formatCurrency(priceRange.max)}
								</Badge>
							) : (
								<Badge bg='light' text='dark' className='fs-6'>
									{formatCurrency(priceRange.min)}
								</Badge>
							)}
						</div>
						<button
							onClick={onNavigate}
							className='btn btn-outline-success btn-sm'
						>
							{t("globalVendorsPage.bookNow")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
