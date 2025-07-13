import {Link, useNavigate, useParams} from "react-router-dom";
import {FunctionComponent, useState} from "react";
import {customToast, errorToast, successToast} from "../../atoms/notifications/Toasts";
import {useFormik} from "formik";
import * as yup from "yup";
import {useUser} from "../../contextApi/useUserData";
import {
	Box,
	Button,
	Checkbox,
	Chip,
	FormControlLabel,
	TextField,
	Typography,
} from "@mui/material";
import Calendar from "../../atoms/calendar/Calendar";
import ReactSlick from "../../atoms/reactSlick/ReactSlick";
import {formatCurrency} from "../../helpers/vendors";
import {useServiceData} from "../../hooks/useServiceData";
import {useBookingHandler} from "../../hooks/useBookingHandler";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import SpicialLogo from "../../atoms/SpicialLogo";
import Loader from "../../atoms/Loader";
import WorkingHours from "../serviceView/WorkingHours";
import SocialMediaLinks from "../../atoms/socialMediaLinks/SocialMediaLinks";
import VendorGalleryTabs from "../../atoms/VendotGalleryTabs";
import JsonLd from "../JsonLd";
import {generateSingleServiceJsonLd} from "../../utils/structuredData";
import LeafletMap from "../../atoms/map/LeafletMap";
import {Paper} from "@mui/material";

interface SingleServicePageProps {}

const SingleServicePage: FunctionComponent<SingleServicePageProps> = () => {
	const [galleryOpen, setGalleryOpen] = useState(true);
	const [galleryType, setGalleryType] = useState<
		"main" | "photos" | "videos" | "contact"
	>("main");
	const {vendorId = ""} = useParams<{vendorId: string}>();
	const navigate = useNavigate();
	const {user} = useUser();
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [isDateAvailable, setIsDateAvailable] = useState<boolean>(true);
	const {bookingState, handleBooking} = useBookingHandler();
	const {
		businessAddress,
		service,
		planId,
		unavailableDates,
		visibleServices,
		loading,
		error,
	} = useServiceData(vendorId);

	const descriptionPoints = service?.description
		? service.description
				.split("-")
				.map((point) => point.trim())
				.filter(Boolean)
		: [];

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		const formatted = date.toISOString().split("T")[0];
		const available = !unavailableDates.some(
			(d) => d.toISOString().split("T")[0] === formatted,
		);
		setIsDateAvailable(available);
		if (!available) {
			errorToast("لا يمكن الحجز في التاريخ الذي حددته، يرجى اختيار تاريخ آخر");
		}
	};

	const handleFeatureToggle = (feature: {featureName: string; price: number}) => {
		const exists = formik.values.features.some(
			(f) => f.featureName === feature.featureName,
		);
		const cleanedFeature = {
			featureName: feature.featureName,
			price: feature.price,
		};
		formik.setFieldValue(
			"features",
			exists
				? formik.values.features.filter(
						(f) => f.featureName !== feature.featureName,
				  )
				: [...formik.values.features, cleanedFeature],
		);
	};

	const formik = useFormik({
		initialValues: {
			features: [] as {featureName: string; price: number}[],
			note: "",
		},
		validationSchema: yup.object({
			features: yup
				.array()
				.of(
					yup.object({
						featureName: yup.string().required(),
						price: yup.number().required(),
					}),
				)
				.min(1, "يجب تحديد ميزة واحدة على الأقل."),
			note: yup.string(),
		}),
		onSubmit: async (values, {resetForm}) => {
			if (!user) {
				customToast(
					"يجب عليك تسجيل الدخول لتستفيد من جميع خدماتنا المميزة",
					navigate,
				);
				return;
			}
			if (!vendorId || !service) return;

			const result = await handleBooking(
				values,
				selectedDate,
				vendorId,
				service.businessName,
			);

			if (result?.success) {
				successToast(
					`تم إرسال الطلب لتاريخ ${selectedDate.toLocaleDateString()} مع الخدمات:\n${values.features
						.map((feature) => `${feature.featureName} - ${feature.price} ₪`)
						.join(", ")}`,
				);
				resetForm();
			}
		},
	});
	const totalPrice = formik.values.features.reduce((acc, f) => acc + f.price, 0);

	if (loading) return <Loader />;

	if (error) {
		return (
			<Box component={"main"} sx={{textAlign: "center", p: 4}}>
				<Typography color='error' variant='h6' gutterBottom>
					فشل تحميل بيانات الخدمة
				</Typography>
				<Button
					variant='contained'
					color='primary'
					onClick={() => window.location.reload()}
				>
					اعادة التحميل
				</Button>
			</Box>
		);
	}

	if (bookingState.success) {
		return (
			<Box component={"main"}>
				<Box
					sx={{
						textAlign: "center",
						my: 5,
						p: 3,
						borderRadius: 2,
					}}
				>
					<Typography variant='h4' color='primary'>
						تم إرسال طلبك بنجاح!
					</Typography>
					<Typography variant='body1' sx={{mb: 3}}>
						سيتم التواصل معك قريبًا لتأكيد الطلب {service.phone}
					</Typography>
					<Button
						variant='contained'
						color='primary'
						size='large'
						onClick={() => navigate("/")}
					>
						العودة إلى الصفحة الرئيسية
					</Button>

					<Button
						variant='contained'
						color='primary'
						sx={{
							display: "block",
							margin: "auto",
							mt: 3,
						}}
						size='large'
						onClick={() => navigate("/my-bookings")}
					>
						رؤيه الطلبات التي طلبتها
					</Button>
				</Box>
			</Box>
		);
	}

	// const sameUser = user && user._id === service.vendorId;
	const adminUser = user && user.role === "admin";
	// const adminUserOrSameUsaer = adminUser || sameUser;

	return (
		<Box
			component={"main"}
			sx={{
				textAlign: "center",
				mx: "auto",
				p: {
					xs: 2,
					md: 3,
					fontFamily: "monospace",
					backgroundColor: "background.default",
				},
			}}
		>
			<JsonLd data={generateSingleServiceJsonLd(service)} />
			<Typography
				variant='h1'
				sx={{color: "palette.text.primary", fontSize: "3rem", p: 3}}
			>
				{service?.businessName}
			</Typography>
			<Paper id='address-Paper' sx={{p: 4}}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
					}}
				/>

				{/* special vendor tag */}
				{planId === "premium" && <SpicialLogo />}
				{/* vendor address chip */}
				<Chip
					variant='outlined'
					sx={{
						p: 2,
						m: "auto",
						textAlign: "center",
						borderRadius: 1,
						borderColor: "primary.main",
						backgroundColor: "background.paper",
						"&:hover": {
							backgroundColor: "action.hover",
						},
					}}
					icon={
						<LocationOnIcon
							fontSize='large'
							color='primary'
							sx={{
								fontSize: "1.5rem",
							}}
						/>
					}
					label={
						<Typography variant='body1' component='span'>
							{service?.address?.city || "غير محدد"},{" "}
							{service?.address?.street || "غير محدد"}
						</Typography>
					}
				/>
			</Paper>
			{/* social media links */}
			<SocialMediaLinks
				instagram={"https://instagram.com"}
				facebook={"https://facebook.com"}
				twitter={"https://x.com"}
			/>

			<HorizontalDevider />

			{/* vedios, images, manage => buttons */}
			{adminUser && (
				<>
					<Button
						size='medium'
						color='primary'
						variant='contained'
						sx={{
							position: "relative",
							top: 0,
						}}
						onClick={() => navigate(`/vendors/${vendorId}`)}
					>
						ادارة الصفحه
					</Button>
				</>
			)}
			<VendorGalleryTabs
				vendorId={vendorId}
				openGalleries={setGalleryOpen}
				setGalleryType={setGalleryType}
			/>
			{galleryOpen && (
				<Box sx={{mt: 2}}>
					{galleryType === "main" && (
						<>
							<Box
								width={"100%"}
								display={"flex"}
								alignItems={"center"}
								justifyContent={"space-around"}
							>
								{adminUser && (
									<Button
										size='medium'
										color='primary'
										variant='contained'
										sx={{
											position: "relative",
											top: 0,
										}}
										onClick={() => navigate(`/vendors/${vendorId}`)}
									>
										ادارة الصفحه
									</Button>
								)}
							</Box>
							{/* facing image view */}
							<ReactSlick images={service?.images as any} />
							{/* Map */}
							<LeafletMap
								position={[businessAddress.lat, businessAddress.lng]}
							/>
							{/* vendor working hours */}
							<WorkingHours service={service} />
							{/* facing description */}
							<Box
								sx={{
									fontFamily: "monospace",
									borderRadius: 5,
									p: 5,
									my: 5,
									boxShadow: 1,
									transition: "all 0.3s ease",
									"&:hover": {
										boxShadow: 8,
									},
								}}
							>
								<Box
									component='ul'
									sx={{
										listStyleType: "none",
										padding: 0,
										margin: 0,
										counterReset: "list-counter",
									}}
								>
									{descriptionPoints.map((point, index) => (
										<Box
											component='li'
											key={index}
											sx={{
												marginBottom: "0.75em",
												display: "flex",
												alignItems: "flex-start",
												"&:before": {
													content: '"▹"',
													// content: '""',
													color: "primary.main",
													mr: 1.5,
													fontSize: "0.9em",
													lineHeight: 1.5,
												},
											}}
										>
											<Typography
												variant='body1'
												sx={{
													lineHeight: 1.6,
													fontFamily: "monospace",
													fontSize: {
														xs: "0.875rem",
														sm: "1rem",
													},
													flex: 1,
													textAlign: "start",
												}}
											>
												{point}
											</Typography>
										</Box>
									))}
								</Box>
							</Box>
							{/* booking calendar */}
							<Calendar
								selectedDate={selectedDate}
								handleDateChange={handleDateChange}
								unavailableDates={unavailableDates}
							/>
							{/* facing services */}
							<Box
								component='form'
								onSubmit={formik.handleSubmit}
								sx={{
									mt: 4,
									p: 3,
									borderRadius: "0px 0 50px 50px",
									boxShadow: 8,
								}}
							>
								<Typography
									color='info'
									variant='h5'
									align='center'
									gutterBottom
								>
									اختر الخدمات المطلوبة
								</Typography>

								<Box
									sx={{
										display: "grid",
										gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr"},
										gap: 2,
										mb: 3,
									}}
								>
									{visibleServices.length > 0 ? (
										visibleServices.map((item, index) => (
											<FormControlLabel
												key={item.id || index}
												control={
													<Checkbox
														checked={formik.values.features.some(
															(f) =>
																f.featureName ===
																item.featureName,
														)}
														onChange={() =>
															handleFeatureToggle(item)
														}
														color='primary'
													/>
												}
												label={
													<Typography
														variant='body1'
														color='text.primary'
													>
														{item.featureName} -{" "}
														{formatCurrency(item.price)}
													</Typography>
												}
												sx={{
													textAlign: "right",
													mx: {xs: 0, sm: 1},
												}}
											/>
										))
									) : (
										<>
											<Typography
												variant='body1'
												color='error'
												sx={{
													fontWeight: "bold",
													gridColumn: "1 / -1",
													textAlign: "center",
												}}
											>
												لا توجد خدمات متاحة
											</Typography>
											{service.services.length === 0 && (
												<>
													<Typography
														variant='body1'
														color='error'
														sx={{
															fontWeight: "bold",
															gridColumn: "1 / -1",
															textAlign: "center",
														}}
													>
														يجب عليك اضافة خدمة واحده على
														الاقل لكي يتم اظهارها للمستخدمين
													</Typography>
													<Button
														sx={{
															m: "auto",
														}}
														onClick={() =>
															navigate(
																`/vendors/${vendorId}`,
															)
														}
														variant='contained'
													>
														اضافه خدماتك المميزة
													</Button>
												</>
											)}
										</>
									)}
								</Box>
								<Box sx={{p: 1, borderRadius: 5, m: 5, boxShadow: 3}}>
									<Typography
										my={5}
										color='primary.main'
										fontWeight={700}
										variant='h6'
									>
										سعر الطلبات المحددة الشامل{" "}
										{formatCurrency(totalPrice)}
									</Typography>
								</Box>

								<TextField
									fullWidth
									name='note'
									label='ملاحظات إضافية (اختياري)'
									multiline
									rows={4}
									value={formik.values.note}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.note && Boolean(formik.errors.note)
									}
									helperText={formik.touched.note && formik.errors.note}
									sx={{my: 3}}
								/>
								<Box sx={{textAlign: "center"}}>
									<Button
										disabled={
											!(
												formik.isValid &&
												formik.dirty &&
												isDateAvailable
											)
										}
										type='submit'
										variant='contained'
										color='primary'
										size='large'
										sx={{px: 6}}
									>
										احجز الآن
									</Button>
								</Box>
							</Box>
						</>
					)}

					{/* {galleryType === "videos" && (
						<VideoGalleryComponent videos={service?.videos || []} />
					)} */}

					{galleryType === "photos" && (
						<ReactSlick images={(service?.images as any) || []} />
					)}

					{galleryType === "contact" &&
						service.planeId !== "basic" &&
						service.planeId !== "free" && (
							<>
								<Link
									to={`mailto:${service.email}`}
									className=' text-success d-block'
								>
									ايميل: {service.email}
								</Link>
								<Link
									to={`tel:+947${service.phone}`}
									className=' text-success'
								>
									هاتف: {service.phone}
								</Link>
							</>
						)}
				</Box>
			)}
		</Box>
	);
};

export default SingleServicePage;
