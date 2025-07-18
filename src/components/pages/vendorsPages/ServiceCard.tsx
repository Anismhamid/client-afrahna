import {FaStar, FaMapMarkerAlt} from "react-icons/fa";
import {Badge} from "react-bootstrap";
import {FunctionComponent, useMemo} from "react";
import {Services} from "../../../interfaces/services";
import {formatCurrency} from "../../../helpers/vendors";
import {Button} from "@mui/material";
import WazeIcon from "/wazeIcon.png";

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
				className='card border-0 shadow-lg h-100 hover-zoom'
				style={{transition: "transform 0.3s ease"}}
			>
				{isDefaultLocation && (
					<div className='alert alert-warning small mb-0'>
						الموقع التقريبي (بناءً على المدينة فقط)
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
						<div className='text-muted'>لا توجد صورة</div>
					)}
				</div>
				{/* כפתור ניווט ל-Waze */}
				<Button
					variant='outlined'
					color='primary'
					onClick={openWaze}
					sx={{display: "flex", alignItems: "center"}}
				>
					<img
						src={WazeIcon}
						alt='Waze'
						style={{width: 30, height: 30, marginInline: 8}}
					/>
					Waze
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

					<div className='mb-2'>
						<FaMapMarkerAlt className='text-primary me-1' />
						<span className='text-muted'>
							{service.address.city}, {service.address.street}
						</span>
					</div>

					{service.description && (
						<p className='card-text text-muted small mb-2'>
							{service.description}
						</p>
					)}

					{service.services?.length > 0 && (
						<div className='mb-2'>
							<strong>الخدمات المتاحة:</strong>
							<ul className='list-unstyled small'>
								{service.services.slice(0, 2).map((s, index: number) => (
									<li key={index} className='text-muted'>
										{s.featureName} - {formatCurrency(s.price)}
									</li>
								))}
								{service.services.length > 2 && (
									<li className='text-muted'>
										+{service.services.length - 2} خدمات أخرى
									</li>
								)}
							</ul>
						</div>
					)}

					<div className='d-flex justify-content-between align-items-center mt-auto'>
						<div>
							{priceRange.min !== priceRange.max ? (
								<Badge bg='light' text='dark' className='fs-6'>
									{priceRange.min} - {formatCurrency(priceRange.max)}
								</Badge>
							) : (
								<Badge bg='light' text='dark' className='fs-6'>
									{formatCurrency(priceRange.min)}
								</Badge>
							)}
						</div>
						<button onClick={onNavigate} className='btn btn-outline-success'>
							احجز الان
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
