import {useFormik} from "formik";
import {FunctionComponent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {BusinessUserSchema} from "../../interfaces/userSchema";
import * as Yup from "yup";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import {LoadingButton} from "@mui/lab";

import {mainMenu} from "../../config/mainMenu";
import {newBusinessRegisterUser} from "../../services/usersServices";
import {successToast} from "../../atoms/notifications/Toasts";
import zxcvbn from "zxcvbn";
import LinearProgress from "@mui/material/LinearProgress";
import {getStrengthColor, getPasswordStrengthLabel} from "../../helpers/passwordChecker";
import {useTranslation} from "react-i18next";
import changeDirection from "../../../locales/directions";

const BusinessRegister: FunctionComponent = () => {
	const navigate = useNavigate();
	const [passwordScore, setPasswordScore] = useState(0);
	const [passwordFeedback, setPasswordFeedback] = useState<string[]>([]);
	const {t} = useTranslation();

	const formik = useFormik<BusinessUserSchema>({
		initialValues: {
			businessName: "",
			email: "",
			password: "",
			phone: "",
			address: {
				city: "",
				street: "",
			},
			category: "",
		},
		validationSchema: Yup.object({
			businessName: Yup.string().required(t("registerPage.firstNameValidation")),
			phone: Yup.string().required(t("registerPage.phoneValidation")),
			email: Yup.string()
				.email(t("registerPage.validEmailValidation"))
				.required(t("registerPage.emailValidation")),
			password: Yup.string()
				.min(8, t("registerPage.validPasswordValidation"))
				.max(30)
				.required(t("registerPage.passwordValidation"))
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
					t("registerPage.matchPasswordValidation"),
				),
			address: Yup.object({
				city: Yup.string().required(t("registerPage.cityValidation")),
				street: Yup.string().required(t("registerPage.streetValidation")),
			}),
			category: Yup.string().required(t("registerPage.categoryValidation")),
		}),

		// onSubmit: (values) => {
		// 	newBusinessRegisterUser(values).then((userData) => {
		// 		localStorage.setItem("token", userData);
		// 		navigate("/");
		// 		successToast(t("login.wellcomeMessage"));
		// 	});
		// },
		onSubmit: (values, {setSubmitting, setErrors}) => {
			newBusinessRegisterUser(values)
				.then((userData) => {
					localStorage.setItem("token", userData);
					navigate("/");
					successToast(t("login.wellcomeMessage"));
				})
				.catch((error) => {
					if (error.response?.status === 400) {
						setErrors({email: error.response.data});
					} else {
						alert(t("errors.unexpectedError"));
					}
				})
				.finally(() => setSubmitting(false));
		},
	});

		const dir = changeDirection();


	return (
		<main
		dir={dir}
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Box
				component='form'
				onSubmit={formik.handleSubmit}
				sx={{
					borderRadius: 2,
					display: "flex",
					flexDirection: "column",
					gap: 2,
					maxWidth: "600px",
				}}
			>
				<Box>
					<Button
						variant='contained'
						sx={{fontSize: "18"}}
						onClick={() => navigate(-1)}
					>
						{t("registerPage.back")}
					</Button>
				</Box>
				<Box display={"flex"} alignContent={"center"} alignItems={"center"}>
					<Typography
						variant='h5'
						sx={{
							color: "#804e16",
							fontWeight: "bold",
							pr: 1,
						}}
					>
						{t("registerPage.registerType.title")} |
					</Typography>

					<Typography
						variant='body2'
						sx={{
							color: "#1d812a",
							fontWeight: "bold",
						}}
					>
						{t("registerPage.registerType.newVendor")}
					</Typography>
				</Box>
				<Typography
					variant='h4'
					align='center'
					gutterBottom
					sx={{
						fontWeight: "bold",
						paddingTop: "60px",
					}}
				>
					{t("login.joinToAfrahnaVendor")}
				</Typography>

				<Typography
					variant='h6'
					align='center'
					gutterBottom
					sx={{color: "warning.main", fontWeight: "normal", mt: -1}}
				>
					{t("login.subtitle")}
				</Typography>
				<div className='row row-cols-md-2 py-2'>
					<div className=' mb-3'>
						<TextField
							label={t("registerPage.businessName")}
							name='businessName'
							value={formik.values.businessName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.businessName &&
								Boolean(formik.errors.businessName)
							}
							helperText={
								formik.touched.businessName && formik.errors.businessName
							}
							variant='filled'
							fullWidth
						/>
					</div>
					<div className=' mb-3'>
						<TextField
							label={t("registerPage.email")}
							name='email'
							type='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
							variant='filled'
							fullWidth
						/>
					</div>
					<div>
						<TextField
							label={t("registerPage.password")}
							name='password'
							type='password'
							value={formik.values.password}
							onChange={(e) => {
								formik.handleChange(e);
								const result = zxcvbn(e.target.value);
								setPasswordScore(result.score);
								setPasswordFeedback(result.feedback.suggestions || []);
							}}
							onBlur={formik.handleBlur}
							error={
								formik.touched.password && Boolean(formik.errors.password)
							}
							helperText={formik.touched.password && formik.errors.password}
							variant='filled'
							fullWidth
						/>
						{passwordFeedback.length > 0 && (
							<ul
								style={{
									paddingLeft: "20px",
									marginTop: "4px",
									color: "#888",
								}}
							>
								{passwordFeedback.map((suggestion, idx) => (
									<li key={idx} style={{fontSize: "0.85rem"}}>
										{suggestion}
									</li>
								))}
							</ul>
						)}
						{formik.values.password && (
							<>
								<Box sx={{mt: 1}}>
									<LinearProgress
										variant='determinate'
										value={(passwordScore + 1) * 20}
										sx={{
											height: 8,
											borderRadius: 2,
											backgroundColor: "#eee",
											"& .MuiLinearProgress-bar": {
												backgroundColor:
													getStrengthColor(passwordScore),
											},
										}}
									/>
									<Typography
										variant='body2'
										sx={{
											color: getStrengthColor(passwordScore),
											mt: 0.5,
										}}
									>
										{getPasswordStrengthLabel(passwordScore)}
									</Typography>
								</Box>
							</>
						)}
					</div>
					<div className=' mb-3'>
						<TextField
							label={t("registerPage.phoneNum")}
							name='phone'
							value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.phone && Boolean(formik.errors.phone)}
							helperText={formik.touched.phone && formik.errors.phone}
							variant='filled'
							fullWidth
						/>
					</div>
					<div>
						<TextField
							label={t("registerPage.city")}
							name='address.city'
							value={formik.values.address.city}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.address?.city &&
								Boolean(formik.errors.address?.city)
							}
							helperText={
								formik.touched.address?.city &&
								formik.errors.address?.city
							}
							variant='filled'
							fullWidth
						/>
					</div>
					<div className=' mb-3'>
						<TextField
							label={t("registerPage.street")}
							name='address.street'
							value={formik.values.address.street}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.address?.street &&
								Boolean(formik.errors.address?.street)
							}
							helperText={
								formik.touched.address?.street &&
								formik.errors.address?.street
							}
							variant='filled'
							fullWidth
						/>
					</div>

					{/*  */}
					<div>
						<FormControl
							fullWidth
							variant='filled'
							error={
								formik.touched.category && Boolean(formik.errors.category)
							}
						>
							<InputLabel>{t("registerPage.category")}</InputLabel>
							<Select
								label={t("registerPage.category")}
								name='category'
								value={formik.values.category}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								variant='filled'
							>
								{mainMenu.map((category, index) => (
									<MenuItem key={index} value={category.category}>
										<ListItemIcon>{category.icon}</ListItemIcon>
										<ListItemText primary={t(category.label)} />
									</MenuItem>
								))}
							</Select>
							{formik.touched.category && formik.errors.category && (
								<div style={{color: "red", fontSize: "12px"}}>
									{formik.errors.category}
								</div>
							)}
						</FormControl>
					</div>
				</div>
				<LoadingButton
					loading={formik.isSubmitting}
					sx={{backgroundColor: "success.main"}}
					type='submit'
					variant='contained'
				>
					{t("registerPage.create")}
				</LoadingButton>
				<Button
					sx={{backgroundColor: "#0F2D44"}}
					type='button'
					variant='contained'
					onClick={() => navigate("/login")}
				>
					{t("login.login")}
				</Button>
				<Button
					sx={{backgroundColor: "#0F2D44"}}
					onClick={() => navigate("/register")}
					type='button'
					variant='contained'
				>
					{t("registerPage.newUser")}
				</Button>
				<Button
					sx={{backgroundColor: "#0F2D44"}}
					onClick={() => navigate("/business-register")}
					variant='contained'
				>
					{t("registerPage.newVendor")}
				</Button>
			</Box>
			<Box display='flex' justifyContent='center' gap={2}>
				<Typography sx={{color: "warning.main"}} variant='body2'>
					<Link to='/privacy-policy'>{t("privacyPolicy")}</Link>
				</Typography>
				<Typography sx={{color: "warning.main"}} variant='body2'>
					|
				</Typography>
				<Typography sx={{color: "warning.main"}} variant='body2'>
					<Link to='/terms-of-use'>{t("termsOfUse")}</Link>
				</Typography>
			</Box>
		</main>
	);
};

export default BusinessRegister;
