import {useFormik} from "formik";
import {FunctionComponent, useState} from "react";
import {UserSchema} from "../../interfaces/userSchema";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";

import {Button, Box, Typography, LinearProgress} from "@mui/material";
import {registerNewUser} from "../../services/usersServices";
import {Link, useNavigate} from "react-router-dom";
import {successToast} from "../../atoms/notifications/Toasts";
import {getStrengthColor, getPasswordStrengthLabel} from "../../helpers/passwordChecker";
import zxcvbn from "zxcvbn";
import {useTranslation} from "react-i18next";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	const navigate = useNavigate();
	const {t} = useTranslation();

	const [passwordScore, setPasswordScore] = useState(0);
	const [passwordFeedback, setPasswordFeedback] = useState<string[]>([]);

	const formik = useFormik<UserSchema>({
		initialValues: {
			name: {
				first: "",
				last: "",
			},
			email: "",
			password: "",
			phone: "",
			address: {
				city: "",
				street: "",
			},
		},
		validationSchema: Yup.object({
			name: Yup.object({
				first: Yup.string().required(t("registerPage.firstNameValidation")),
				last: Yup.string().required(t("registerPage.lastNameValidation")),
			}),
			email: Yup.string()
				.email(t("registerPage.validEmailValidation"))
				.required(t("registerPage.emailValidation")),
			password: Yup.string()
				.min(8, t("registerPage.validPasswordValidation"))
				.max(30)
				.required(t("registerPage.passwordValidation"))
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
					t("registerPage.matchPasswordValidation"),
				),
			phone: Yup.string().required(t("registerPage.phoneValidation")),
			address: Yup.object({
				city: Yup.string().required("الرجاء إدخال المدينة"),
				street: Yup.string().required("الرجاء إدخال الشارع"),
			}),
		}),

		onSubmit: (values) => {
			console.log(values);
			registerNewUser(values).then((userData) => {
				localStorage.setItem("token", userData);
				navigate("/");
				successToast(t("login.wellcomeMessage"));
			});
		},
	});

	return (
		<main
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
					padding: 3,
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
							color: "#0F2D44",
							fontWeight: "bold",
						}}
					>
						{t("registerPage.newUser")}
					</Typography>
				</Box>

				<Typography
					variant='h4'
					align='center'
					gutterBottom
					sx={{
						color: "#0F2D44",
						fontWeight: "bold",
						paddingTop: "60px",
					}}
				>
					{t("login.joinToAfrahnaUser")}
				</Typography>
				<Typography
					variant='h6'
					align='center'
					gutterBottom
					sx={{color: "warning.main", fontWeight: "normal", mt: -1}}
				>
					{t("login.subtitle")}
				</Typography>
				<Box className='row row-cols-md-2 py-2'>
					<Box className=' mb-3'>
						<TextField
							label={t("registerPage.fName")}
							name='name.first'
							value={formik.values.name.first}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.name?.first &&
								Boolean(formik.errors.name?.first)
							}
							helperText={
								formik.touched.name?.first && formik.errors.name?.first
							}
							variant='filled'
							fullWidth
						/>
					</Box>
					<Box>
						<TextField
							label={t("registerPage.lName")}
							name='name.last'
							value={formik.values.name.last}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.name?.last &&
								Boolean(formik.errors.name?.last)
							}
							helperText={
								formik.touched.name?.last && formik.errors.name?.last
							}
							variant='filled'
							fullWidth
						/>
					</Box>
					<Box className=' mb-3'>
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
					</Box>
					<Box>
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
					</Box>
					<Box className=' mb-3'>
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
					</Box>
					<Box>
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
					</Box>
					<Box className=' mb-3'>
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
					</Box>
				</Box>
				<Button
					loading={formik.isSubmitting}
					sx={{backgroundColor: "success.main"}}
					type='submit'
					variant='contained'
					fullWidth
				>
					{t("registerPage.create")}
				</Button>
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

export default Register;