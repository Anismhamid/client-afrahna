import {getVendorData, updateVendorServices} from "../../services/vendorServices";
import {useUser} from "../../contextApi/useUserData";
import {FunctionComponent, useState, useEffect} from "react";
import {useFormik} from "formik";
import {Services, vendorsServicesInitionalData} from "../../interfaces/services";
import {
	Button,
	Typography,
	Divider,
	CircularProgress,
	Box,
	InputLabel,
	MenuItem,
	Select,
	FormControl,
	FormHelperText,
	TextareaAutosize,
	FormControlLabel,
	Checkbox,
	Grid,
} from "@mui/material";
import {successToast} from "../../atoms/notifications/Toasts";
import AddIcon from "@mui/icons-material/Add";
import AddNewPicture from "../../atoms/AddNewPicture";
import ReactSlick from "../../atoms/reactSlick/ReactSlick";
import ServicesSettings from "./ServicesSettings";
import {JwtPayload} from "../../interfaces/userSchema";
import {useNavigate, useParams} from "react-router-dom";
import CustomTextFiled from "./CustomTextFiled";
import {days, vendorsvalidationSchema} from "./servicesFormik";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import {TimeClockPicker} from "./WorkingTimePicker";
import {useTranslation} from "react-i18next";

interface EditServicesProps {}

const EditServices: FunctionComponent<EditServicesProps> = () => {
	const [vendor, setVendor] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [openAddImage, setOpenAddImage] = useState<boolean>(false);
	const {user} = useUser();
	const {vendorId} = useParams<{vendorId: string}>();
	const {t} = useTranslation();
	const navigate = useNavigate();

	const handleClickOpenAddImage = () => setOpenAddImage(!openAddImage);
	const handleCloseAddImage = () => setOpenAddImage(!openAddImage);

	useEffect(() => {
		const fetchVendorData = async () => {
			if ((user && user._id === vendorId) || (user && user.role === "admin")) {
				try {
					setLoading(true);
					setError(null);
					const data = await getVendorData(vendorId as string);
					setVendor(data);
				} catch (err) {
					setError("فشل في تحميل بيانات مزود الخدمة. يرجى المحاولة مرة أخرى.");
				} finally {
					setLoading(false);
				}
			}
		};
		fetchVendorData();
	}, [user, refresh]);

	const initialValues =
		vendor.length > 0
			? {
					...vendorsServicesInitionalData, // Defaults first
					...vendor[0], // Then API data
					// Deep merge for nested objects
					price: {
						...vendorsServicesInitionalData.price,
						...(vendor[0].price || {}), // Fallback to empty if missing
					},
					address: {
						...vendorsServicesInitionalData.address,
						...(vendor[0].address || {}),
					},
			  }
			: vendorsServicesInitionalData;

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: vendorsvalidationSchema,
		onSubmit: async (values) => {
			try {
				setLoading(true);
				await updateVendorServices(values.vendorId, values);
				successToast("تم تحديث البيانات بنجاح!");
				setVendor((prevVendors) =>
					prevVendors.map((vendor) =>
						vendor.vendorId === values.vendorId
							? {...vendor, ...values}
							: vendor,
					),
				);
			} catch (err) {
				console.error("Failed to update vendor:", err);
				setError("فشل في تحديث البيانات. يرجى المحاولة مرة أخرى.");
			} finally {
				setLoading(false);
			}
		},
	});

	if (loading && vendor.length === 0) {
		return (
			<Box
				component={"main"}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				component={"main"}
				sx={{
					textAlign: "center",
					p: 4,
				}}
			>
				<Typography color='error'>{error}</Typography>
				<Button
					variant='contained'
					onClick={() => window.location.reload()}
					sx={{mt: 2}}
				>
					{t("editServices.tryAgain")}
				</Button>
			</Box>
		);
	}

	return (
		<Box component={"main"}>
			<Box className='container'>
				<Typography variant='h4' gutterBottom sx={{textAlign: "center", py: 5}}>
					تعديل بيانات مزود الخدمة
				</Typography>

				<Button
					size='small'
					variant='contained'
					sx={{mb: 2, position: "sticky", top: 80, left: 20, zIndex: 2}}
					onClick={() => navigate(`/service/${vendorId}`)}
				>
					{t("editServices.myservicesPage")}
				</Button>
				{/* edit section */}
				<Box component='form' onSubmit={formik.handleSubmit} noValidate>
					<Grid container>
						<Grid size={12} spacing={2}>
							{/* Business Info Section */}
							<Grid container>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<CustomTextFiled
										formik={formik}
										label={t('editServices.businessName')}
										name='businessName'
									/>
								</Grid>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<CustomTextFiled
										formik={formik}
										label={t('registerPage.phone')}
										name='phone'
									/>
								</Grid>
							</Grid>
							{/* Address Section */}
							<Grid container>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<CustomTextFiled
										formik={formik}
										label={t("registerPage.city")}
										name='address.city'
									/>
								</Grid>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<CustomTextFiled
										formik={formik}
										label={t("registerPage.street")}
										name='address.street'
									/>
								</Grid>
							</Grid>
							{/* Pricing Section */}
							<Grid container>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<CustomTextFiled
										formik={formik}
										label='الفئة'
										name='category'
									/>
								</Grid>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<FormControl
										fullWidth
										error={
											formik.touched.priceType &&
											Boolean(formik.errors.priceType)
										}
									>
										<InputLabel
											id='priceType-label'
											sx={{textAlign: "right"}}
										>
											نوع السعر
										</InputLabel>
										<Select
											labelId='priceType-label'
											id='priceType'
											name='priceType'
											value={formik.values.priceType}
											label='نوع السعر'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											sx={{textAlign: "right"}}
										>
											<MenuItem value='' disabled>
												اختر نوع السعر
											</MenuItem>
											<MenuItem value='fixed'>سعر ثابت</MenuItem>
											<MenuItem value='range'>
												سعر غير ثابت
											</MenuItem>
										</Select>
										{formik.touched.priceType &&
											formik.errors.priceType && (
												<FormHelperText sx={{textAlign: "right"}}>
													{formik.errors.priceType}
												</FormHelperText>
											)}
									</FormControl>
								</Grid>
							</Grid>
							<Grid container>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<CustomTextFiled
										formik={formik}
										label='السعر الأدنى'
										name='price.min'
										type='number'
									/>
								</Grid>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<CustomTextFiled
										formik={formik}
										label='السعر الأقصى'
										name='price.max'
										type='number'
									/>
								</Grid>
							</Grid>
							{/* booking types */}
							<Typography
								variant='h5'
								sx={{textAlign: "center", mt: 5, mb: 1}}
							>
								تخصيص نوع الحجز
							</Typography>
							<HorizontalDevider />
							<Grid container>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<CustomTextFiled
										formik={formik}
										label='أقصى عدد حجوزات في اليوم'
										name='maxBookingsPerDay'
										type='number'
									/>
								</Grid>

								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<FormControlLabel
										control={
											<Checkbox
												name='allowOverlappingBookings'
												checked={
													formik.values.allowOverlappingBookings
												}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										}
										label='السماح بحجوزات متداخلة'
										sx={{justifyContent: "end", my: 1}}
									/>
								</Grid>
							</Grid>
							<Grid container>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<CustomTextFiled
										formik={formik}
										label='مدة الحجز (بالساعات)'
										name='bookingDurationInHours'
										type='number'
									/>
								</Grid>
								<Grid m={"auto"} mt={3} size={{xs: 12, md: 5}}>
									<FormControl
										fullWidth
										error={
											formik.touched.bookingType &&
											Boolean(formik.errors.bookingType)
										}
									>
										<InputLabel
											id='bookingType-label'
											sx={{textAlign: "right"}}
										>
											نوع الحجز
										</InputLabel>
										<Select
											labelId='bookingType-label'
											id='bookingType'
											name='bookingType'
											value={formik.values.bookingType}
											label='نوع الحجز'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											sx={{textAlign: "right"}}
										>
											<MenuItem value='' disabled>
												اختر نوع الحجز
											</MenuItem>
											<MenuItem value='daily'>يومي</MenuItem>
											<MenuItem value='hourly'>بالساعة</MenuItem>
											<MenuItem value='multi-booking'>
												متعدد
											</MenuItem>
										</Select>
										{formik.touched.bookingType &&
											formik.errors.bookingType && (
												<FormHelperText sx={{textAlign: "right"}}>
													{formik.errors.bookingType}
												</FormHelperText>
											)}
									</FormControl>
								</Grid>
							</Grid>
							{/* work hours section */}
							<Typography variant='h5' sx={{textAlign: "center", my: 5}}>
								تخصيص ساعات الدوام
							</Typography>
							<HorizontalDevider />
							{days.map(({key, label}) => (
								<Box alignItems='center' marginBlock={"auto"}>
									<Grid container spacing={2} key={key}>
										<Grid
											size={{xs: 6, md: 2, lg: 3}}
											alignItems='center'
										>
											<TimeClockPicker
												label={`وقت البدء (${label})`}
												value={
													formik.values.workingHours[key]
														?.from || ""
												}
												onChange={(time) =>
													formik.setFieldValue(
														`workingHours.${key}.from`,
														time,
													)
												}
												disabled={
													formik.values.workingHours[key]
														?.closed
												}
											/>
										</Grid>
										<Grid size={{xs: 6, md: 6}}>
											<TimeClockPicker
												label={`وقت الانتهاء (${label})`}
												value={
													formik.values.workingHours[key]?.to ||
													""
												}
												onChange={(time) =>
													formik.setFieldValue(
														`workingHours.${key}.to`,
														time,
													)
												}
												disabled={
													formik.values.workingHours[key]
														?.closed
												}
											/>
										</Grid>
										<Grid size={{xs: 6, md: 6}}>
											<FormControlLabel
												control={
													<Checkbox
														checked={
															formik.values.workingHours[
																key
															]?.closed
														}
														onChange={(e) =>
															formik.setFieldValue(
																`workingHours.${key}.closed`,
																e.target.checked,
															)
														}
														color='primary'
													/>
												}
												label='مغلق'
												sx={{justifyContent: "flex-end"}}
											/>
										</Grid>
									</Grid>
								</Box>
							))}

							{/* note section */}
							<Box
								component='ul'
								sx={{
									bgcolor: "#ffffffeb",
									fontFamily: "monospace",
									borderRadius: 2,
									p: 3,
									my: 3,
									boxShadow: 1,
									transition: "all 0.3s ease",
									listStyle: "none",
									"&:hover": {
										boxShadow: 3,
										bgcolor: "#fffffff2",
									},
									"& li": {
										position: "relative",
										pl: 2,
										mb: 1.5,
										"&:before": {
											content: '""',
											position: "absolute",
											right: 0,
											transform: "translateX(100%)",
											mr: 1,
										},
									},
								}}
							>
								<Typography variant='h6' sx={{fontWeight: "bold", mb: 2}}>
									التعليمات:
								</Typography>
								<Typography component='li' sx={{lineHeight: 1.8}}>
									إذا أردت إضافة سطر جديد، يمكنك إضافة علامة الناقص (-)
									في أول السطر
								</Typography>
								<Typography
									component='li'
									sx={{
										bgcolor: "#F3B63F",
										p: 1.5,
										borderRadius: 1,
										lineHeight: 1.8,
									}}
								>
									-هذا سطر جديد مع علامة الناقص
								</Typography>
							</Box>
							<TextareaAutosize
								name='description'
								aria-label='الوصف'
								minRows={4}
								maxLength={500}
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								style={{
									width: "100%",
									padding: "8px",
									fontFamily: "inherit",
									fontSize: "1rem",
									direction: "rtl",
									borderColor:
										formik.touched.description &&
										formik.errors.description
											? "red"
											: "rgba(0, 0, 0, 0.23)",
									borderRadius: "4px",
								}}
							/>
							<FormHelperText sx={{textAlign: "right"}}>
								{formik.touched.description && formik.errors.description
									? formik.errors.description
									: `عدد الأحرف: ${formik.values.description.length}/500`}
							</FormHelperText>
							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-end",
									mt: 3,
								}}
							>
								<Button
									type='submit'
									variant='contained'
									size='large'
									disabled={loading}
									sx={{minWidth: 120}}
								>
									{loading ? (
										<CircularProgress size={24} />
									) : (
										"حفظ التغييرات"
									)}
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>

				<Divider sx={{my: 4}} />

				{/* Images view */}
				<Box
					sx={{
						backgroundColor: "#681025ea",
						backdropFilter: "blur(80px)",
						boxShadow: 1,
						borderRadius: 2,
						p: 3,
						width: "90%",
						m: "auto",
					}}
				>
					<Button
						size='small'
						variant='contained'
						sx={{mb: 2}}
						startIcon={<AddIcon />}
						onClick={handleClickOpenAddImage}
					>
						إضافة صورة جديدة
					</Button>

					{vendor.length > 0 && <ReactSlick images={vendor[0].images as any} />}
				</Box>

				<HorizontalDevider />

				{/* Services Section */}
				<ServicesSettings user={user as JwtPayload} vendorServices={vendor} />

				<AddNewPicture
					userId={user?._id as string}
					handleClose={handleCloseAddImage}
					open={openAddImage}
					refresh={() => setRefresh(!refresh)}
				/>
			</Box>
		</Box>
	);
};

export default EditServices;
