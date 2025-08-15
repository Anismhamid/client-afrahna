import {FieldArray, FormikProvider, useFormik} from "formik";
import {FunctionComponent, useEffect, useState} from "react";
import * as yup from "yup";
import {createNewOffer, getAllOffers} from "../../services/specialOffers";
import {useUser} from "../../contextApi/useUserData";
import {
	Box,
	Button,
	Stack,
	TextField,
	Typography,
	IconButton,
	Divider,
} from "@mui/material";
import {Delete as DeleteIcon, Add as AddIcon} from "@mui/icons-material";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import {FormValues} from "../../interfaces/specialOffers";
import SpecialOffersList from "./SpecialOffersList";

const SpecialOffers: FunctionComponent = () => {
	const [offers, setOffers] = useState<FormValues[]>([]);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const {user} = useUser();

	useEffect(() => {
		setLoading(true);
		getAllOffers()
			.then((res) => setOffers(res))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);

	const formik = useFormik<FormValues>({
		initialValues: {
			title: "",
			services: [{featureName: "", price: 0}],
			images: [{url: "", alt: ""}],
			note: "",
		},
		validationSchema: yup.object({
			title: yup.string().required("Title is required"),
			services: yup.array().of(
				yup.object({
					featureName: yup.string().required("Feature name is required"),
					price: yup
						.number()
						.required("Price is required")
						.min(0, "Price must be >= 0"),
				}),
			),
			images: yup.array().of(
				yup.object({
					url: yup.string().url("Invalid URL").nullable(),
					alt: yup.string(),
				}),
			),
			note: yup.string(),
		}),
		onSubmit: (values, {resetForm}) => {
			const cleanedValues = {
				...values,
				services: values.services.map(({featureName, price}) => ({
					featureName,
					price: Number(price),
				})),
				images: values.images.map(({url, alt}) => ({
					url: url || "",
					alt: alt || "",
				})),
			};

			setSubmitting(true);
			createNewOffer(cleanedValues)
				.then((res) => {
					setOffers((prev) => [...prev, res]);
					resetForm();
				})
				.catch((error) => console.error("Failed to create offer:", error))
				.finally(() => setSubmitting(false));
		},
	});

	return (
		<Box textAlign='center' component='main' sx={{p: 3, maxWidth: 600}}>
			<Typography variant='h4' gutterBottom>
				عروض خاصة
			</Typography>

			{user?.role === "isVendor" && (
				<>
					<HorizontalDevider />
					<Typography variant='h5' gutterBottom sx={{mt: 3}}>
						إنشاء عرض خاص جديد
					</Typography>
					<HorizontalDevider />
					<form onSubmit={formik.handleSubmit}>
						{/* Title */}
						<TextField
							fullWidth
							id='title'
							name='title'
							label='Offer Title*'
							placeholder='Enter offer title'
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
							sx={{mb: 3}}
						/>

						<FormikProvider value={formik}>
							{/* Services */}
							<Typography variant='h6' gutterBottom>
								الخدمات*
							</Typography>
							<FieldArray
								name='services'
								render={(arrayHelpers) => (
									<Stack spacing={2} sx={{mb: 4}}>
										{formik.values.services.map((s, index) => (
											<Stack
												key={index}
												direction='row'
												spacing={2}
												alignItems='center'
											>
												<TextField
													fullWidth
													name={`services[${index}].featureName`}
													label='Feature Name*'
													value={s.featureName}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													error={
														formik.touched.services?.[index]
															?.featureName &&
														Boolean(
															(
																formik.errors.services?.[
																	index
																] as any
															)?.featureName,
														)
													}
													helperText={
														formik.touched.services?.[index]
															?.featureName &&
														(
															formik.errors.services?.[
																index
															] as any
														)?.featureName
													}
												/>
												<TextField
													type='number'
													name={`services[${index}].price`}
													label='Price*'
													value={s.price}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													error={
														formik.touched.services?.[index]
															?.price &&
														Boolean(
															(
																formik.errors.services?.[
																	index
																] as any
															)?.price,
														)
													}
													helperText={
														formik.touched.services?.[index]
															?.price &&
														(
															formik.errors.services?.[
																index
															] as any
														)?.price
													}
												/>
												<IconButton
													color='error'
													onClick={() =>
														arrayHelpers.remove(index)
													}
													disabled={
														formik.values.services.length <= 1
													}
												>
													<DeleteIcon />
												</IconButton>
											</Stack>
										))}
										<Button
											variant='outlined'
											startIcon={<AddIcon />}
											onClick={() =>
												arrayHelpers.push({
													featureName: "",
													price: 0,
												})
											}
										>
											Add Service
										</Button>
									</Stack>
								)}
							/>

							<Divider sx={{mb: 3}} />

							{/* Images */}
							<Typography variant='h6' gutterBottom>
								Images
							</Typography>
							<FieldArray
								name='images'
								render={(arrayHelpers) => (
									<Stack spacing={2} sx={{mb: 4}}>
										{formik.values.images.map((img, index) => (
											<Stack
												key={index}
												direction='row'
												spacing={2}
												alignItems='center'
											>
												<TextField
													fullWidth
													name={`images[${index}].url`}
													label='Image URL'
													value={img.url}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													error={
														formik.touched.images?.[index]
															?.url &&
														Boolean(
															(
																formik.errors.images?.[
																	index
																] as any
															)?.url,
														)
													}
													helperText={
														formik.touched.images?.[index]
															?.url &&
														(
															formik.errors.images?.[
																index
															] as any
														)?.url
													}
												/>
												<TextField
													fullWidth
													name={`images[${index}].alt`}
													label='Alt Text'
													value={img.alt}
													onChange={formik.handleChange}
												/>
												<IconButton
													color='error'
													onClick={() =>
														arrayHelpers.remove(index)
													}
													disabled={
														formik.values.images.length <= 1
													}
												>
													<DeleteIcon />
												</IconButton>
											</Stack>
										))}
										<Button
											variant='outlined'
											startIcon={<AddIcon />}
											onClick={() =>
												arrayHelpers.push({url: "", alt: ""})
											}
										>
											Add Image
										</Button>
									</Stack>
								)}
							/>
						</FormikProvider>

						{/* Note */}
						<TextField
							fullWidth
							id='note'
							name='note'
							label='Note'
							multiline
							rows={3}
							value={formik.values.note}
							onChange={formik.handleChange}
							sx={{mb: 3}}
						/>

						{/* Submit */}
						<Button
							type='submit'
							variant='contained'
							color='primary'
							disabled={submitting}
							sx={{mt: 2}}
						>
							{submitting ? "Creating..." : "Create Offer"}
						</Button>
					</form>
				</>
			)}

			<SpecialOffersList
				setOffers={setOffers}
				offers={offers}
				loading={loading}
			/>
		</Box>
	);
};

export default SpecialOffers;
