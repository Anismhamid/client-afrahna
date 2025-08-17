import {FieldArray, FormikProvider, useFormik} from "formik";
import {FunctionComponent, useEffect, useState} from "react";
import {createNewOffer, getAllOffers} from "../../../services/specialOffers";
import {useUser} from "../../../contextApi/useUserData";
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
import HorizontalDevider from "../../../atoms/customDeviders/HorizontalDevider";
import {FormValues} from "../../../interfaces/specialOffers";
import SpecialOffersList from "./SpecialOffersList";
import {
	specialOffersFormikInitialValues,
	specialOffersValidationSchema,
} from "./formik/specialOffersFormik";
import {useTranslation} from "react-i18next";
import changeDirection from "../../../../locales/directions";

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
		initialValues: specialOffersFormikInitialValues,
		validationSchema: specialOffersValidationSchema,
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

	const {t} = useTranslation();
	const dir = changeDirection();
	return (
		<Box dir={dir} textAlign='center' component='main' sx={{p: 3}}>
			<Typography variant='h4' gutterBottom>
				{t("specialOffers.title")}
			</Typography>

			{user?.role === "isVendor" && (
				<>
					<HorizontalDevider />
					<Typography variant='h5' gutterBottom sx={{mt: 3}}>
						{t("specialOffers.createNew")}
					</Typography>
					<form
						style={{padding: 30, maxWidth: 600, margin: "auto"}}
						onSubmit={formik.handleSubmit}
					>
						{/* Title */}
						<TextField
							fullWidth
							id='title'
							name='title'
							label={`${t("specialOffers.offerTitle")} *`}
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
								{t("specialOffers.services")} *
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
													label={`${t(
														"specialOffers.servicesName",
													)} *`}
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
											variant='contained'
											sx={{maxWidth: 200}}
											startIcon={<AddIcon />}
											onClick={() =>
												arrayHelpers.push({
													featureName: "",
													price: 0,
												})
											}
										>
											{t("specialOffers.addService")}
										</Button>
									</Stack>
								)}
							/>

							<Divider sx={{mb: 3}} />

							{/* Images */}
							<Typography variant='h6' gutterBottom>
								{t("specialOffers.images")}
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
													label={t("specialOffers.imagesUrl")}
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
													label={t("specialOffers.imagesAlt")}
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
											variant='contained'
											color='primary'
											sx={{maxWidth: 200, mx: "auto"}}
											startIcon={<AddIcon />}
											onClick={() =>
												arrayHelpers.push({url: "", alt: ""})
											}
										>
											{t("specialOffers.addImages")}
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
							label={t("specialOffers.offerDescription")}
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
							sx={{m: 2}}
						>
							{submitting
								? t("specialOffers.creating")
								: t("specialOffers.create")}
						</Button>
					</form>
				</>
			)}

			<SpecialOffersList setOffers={setOffers} offers={offers} loading={loading} />
		</Box>
	);
};

export default SpecialOffers;
