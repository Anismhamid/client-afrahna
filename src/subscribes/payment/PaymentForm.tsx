import {
	Paper,
	Typography,
	Box,
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
} from "@mui/material";
import {FormikValues} from "formik";
import {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";
import {FaCcVisa, FaCcMastercard, FaCcAmex} from "react-icons/fa";
import {Link} from "react-router-dom";
import changeDirection from "../../../locales/directions";

interface PaymentFormProps {
	formik: FormikValues;
}

const PaymentForm: FunctionComponent<PaymentFormProps> = ({formik}) => {
	const {t} = useTranslation();
	const dir = changeDirection();
	return (
		<Paper
			dir={dir}
			elevation={3}
			sx={{
				p: 2,
				borderRadius: 2,
				width: {xs: "100%", sm: "80%", md: "50%"},
				mx: "auto",
				border: 1,
			}}
		>
			<Typography textAlign={"center"} variant='h5' gutterBottom sx={{mb: 3}}>
				{t("payment.paymentForm.title")}
			</Typography>

			<form style={{padding: 10}} onSubmit={formik.handleSubmit}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						gap: 1,
						textAlign: "center",
						mb: 1,
					}}
				>
					<FaCcVisa size={30} />
					<FaCcMastercard size={30} />
					<FaCcAmex size={30} />
				</Box>

				{/* Card Number Field */}
				<TextField
					name='cardNumber'
					label={t("payment.paymentForm.cardNumber")}
					fullWidth
					margin='normal'
					variant='outlined'
					placeholder='1234 5678 9012 3456'
					inputProps={{maxLength: 19}}
					onChange={(e) => {
						const value = e.target.value
							.replace(/\s/g, "")
							.replace(/(\d{4})/g, "$1 ")
							.trim();
						formik.setFieldValue("cardNumber", value);
					}}
					error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
					helperText={formik.touched.cardNumber && formik.errors.cardNumber}
				/>

				<Box sx={{display: "flex", gap: 2, mt: 2}}>
					{/* Expiry Date Field */}
					<TextField
						name='expiryDate'
						label={t("payment.paymentForm.expiryDate")}
						fullWidth
						margin='normal'
						variant='outlined'
						placeholder='MM/YY'
						inputProps={{maxLength: 5}}
						onChange={(e) => {
							let value = e.target.value.replace(/[^0-9]/g, "");
							if (value.length > 2) {
								value =
									value.substring(0, 2) + "/" + value.substring(2, 4);
							}
							formik.setFieldValue("expiryDate", value);
						}}
						error={
							formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
						}
						helperText={formik.touched.expiryDate && formik.errors.expiryDate}
					/>

					{/* CVV Field - Fixed */}
					<TextField
						name='cvv'
						label='CVV'
						fullWidth
						margin='normal'
						variant='outlined'
						placeholder='123'
						type='password'
						inputProps={{
							maxLength: 4,
							inputMode: "numeric",
							pattern: "[0-9]*",
						}}
						onChange={(e) => {
							// Only allow numbers
							const value = e.target.value.replace(/[^0-9]/g, "");
							formik.setFieldValue("cvv", value);
						}}
						error={formik.touched.cvv && Boolean(formik.errors.cvv)}
						helperText={formik.touched.cvv && formik.errors.cvv}
					/>
				</Box>

				{/* Cardholder Name Field - Fixed */}
				<TextField
					name='cardHolderName'
					label={t("payment.paymentForm.cardHolderName")}
					fullWidth
					margin='normal'
					variant='outlined'
					onChange={(e) => {
						// Only allow letters, spaces, and Arabic characters
						const value = e.target.value.replace(
							/[^a-zA-Z\u0600-\u06FF\s]/g,
							"",
						);
						formik.setFieldValue("cardHolderName", value);
					}}
					error={
						formik.touched.cardHolderName &&
						Boolean(formik.errors.cardHolderName)
					}
					helperText={
						formik.touched.cardHolderName && formik.errors.cardHolderName
					}
				/>

				<FormControlLabel
					control={
						<Checkbox
							name='saveCard'
							checked={formik.values.saveCard}
							onChange={formik.handleChange}
							color='primary'
						/>
					}
					label={
						<Typography variant='body2'>
							{t("payment.paymentForm.saveCard")}
						</Typography>
					}
					sx={{mt: 2}}
				/>

				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					size='large'
					sx={{mt: 3}}
					disabled={formik.isSubmitting}
				>
					{t("payment.paymentForm.submit")}
				</Button>

				<Typography variant='body2' align='center' sx={{mt: 2}}>
					<Link to='/payment-terms'>{t("payment.paymentForm.termsLink")}</Link>
				</Typography>
			</form>
		</Paper>
	);
};

export default PaymentForm;
