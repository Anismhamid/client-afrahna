import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	TextField,
	Stack,
	IconButton,
	Typography,
	Divider,
} from "@mui/material";
import {Dispatch, FunctionComponent, useEffect, useState} from "react";
import {FieldArray, useFormik, FormikProvider} from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
	getSpecialOfferById,
	updateSpecialOfferById,
} from "../../../services/specialOffers";
import {FormValues} from "../../../interfaces/specialOffers";
import {
	specialOffersFormikInitialValues,
	specialOffersValidationSchema,
} from "./formik/specialOffersFormik";

interface EditOfferModalProps {
	open: boolean;
	onClose: () => void;
	offerId: string;
	setOffers: Dispatch<React.SetStateAction<FormValues[]>>;
}

const EditOfferModal: FunctionComponent<EditOfferModalProps> = ({
	open,
	onClose,
	offerId,
	setOffers,
}) => {
	const [initialValues, setInitialValues] = useState<FormValues>(
		specialOffersFormikInitialValues,
	);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!open || !offerId) return;
		getSpecialOfferById(offerId)
			.then((offer) => setInitialValues(offer))
			.catch((err) => console.log(err));
	}, [offerId, open]);

	const formik = useFormik<FormValues>({
		initialValues,
		enableReinitialize: true,
		validationSchema: specialOffersValidationSchema,
		onSubmit: (values) => {
			setSubmitting(true);

			// تنظيف البيانات قبل الإرسال
			const cleanedValues = {
				title: values.title,
				note: values.note,
				services: values.services.map(({_id, ...s}) => s),
				images: values.images.map(({_id, createdAt, updatedAt, ...i}) => i),
			};

			updateSpecialOfferById(offerId, cleanedValues)
				.then((res) => {
					setOffers((prev) => prev.map((o) => (o._id === offerId ? res : o)));
					onClose();
				})
				.catch((error) => console.error("Failed to update offer:", error))
				.finally(() => setSubmitting(false));
		},
	});

	return (
		<Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
			<DialogTitle>Edit Offer</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
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
												(formik.errors.services?.[index] as any)
													?.featureName
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
												formik.touched.services?.[index]?.price &&
												Boolean(
													(
														formik.errors.services?.[
															index
														] as any
													)?.price,
												)
											}
											helperText={
												formik.touched.services?.[index]?.price &&
												(formik.errors.services?.[index] as any)
													?.price
											}
										/>
										<IconButton
											color='error'
											onClick={() => arrayHelpers.remove(index)}
											disabled={formik.values.services.length <= 1}
										>
											<DeleteIcon />
										</IconButton>
									</Stack>
								))}
								<Button
									variant='outlined'
									startIcon={<AddIcon />}
									onClick={() =>
										arrayHelpers.push({featureName: "", price: 0})
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
												formik.touched.images?.[index]?.url &&
												Boolean(
													(formik.errors.images?.[index] as any)
														?.url,
												)
											}
											helperText={
												formik.touched.images?.[index]?.url &&
												(formik.errors.images?.[index] as any)
													?.url
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
											onClick={() => arrayHelpers.remove(index)}
											disabled={formik.values.images.length <= 1}
										>
											<DeleteIcon />
										</IconButton>
									</Stack>
								))}
								<Button
									variant='outlined'
									startIcon={<AddIcon />}
									onClick={() => arrayHelpers.push({url: "", alt: ""})}
								>
									Add Image
								</Button>
							</Stack>
						)}
					/>
				</FormikProvider>

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

				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button type='submit' variant='contained' disabled={submitting}>
						{submitting ? "Updating..." : "Update Offer"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default EditOfferModal;
