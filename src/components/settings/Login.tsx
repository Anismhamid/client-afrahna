import {useFormik} from "formik";
import {FunctionComponent, useEffect, useState} from "react";
import {LoginSchema} from "../../interfaces/userSchema";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import {
	Box,
	Typography,
	IconButton,
	OutlinedInput,
	InputLabel,
	FormControl,
	InputAdornment,
	FormHelperText,
} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {userLogin} from "../../services/usersServices";
import {errorToast, successToast} from "../../atoms/notifications/Toasts";
import {useTranslation} from "react-i18next";
import changeDirection from "../../../locales/directions";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const navigate = useNavigate();
	const {t} = useTranslation();
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	useEffect(() => {
		if (localStorage.getItem("token")) navigate("/");
	},[]);

	const formik = useFormik<LoginSchema>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().required(t("registerPage.emailValidation")),
			password: Yup.string().required(t("registerPage.passwordValidation")),
		}),
		onSubmit: async (values, {setSubmitting}) => {
			try {
				const token = await userLogin(values);
				localStorage.setItem("token", token);
				successToast(t("login.wellcomeMessage"));
				navigate("/");
			} catch (error: any) {
				const message = error?.response?.data?.message || t("login.error");
				errorToast(message);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const dir = changeDirection();

	return (
		<main
			dir={dir}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				paddingTop: 0,
			}}
		>
			<Box
				noValidate
				component='form'
				onSubmit={formik.handleSubmit}
				sx={{
					borderRadius: 2,
					display: "flex",
					flexDirection: "column",
					gap: 2,
					maxWidth: "400px",
					direction: dir,
					color: "primary.main",
					border: 1,
					boxShadow: 8,
				}}
			>
				<Typography
					variant='h4'
					align='center'
					gutterBottom
					sx={{
						fontWeight: "bold",
						color: "primary.main",
					}}
				>
					{t("login.title")}
				</Typography>
				<Typography
					variant='h6'
					align='center'
					gutterBottom
					sx={{color: "warning.main", fontWeight: "normal", mt: -1}}
				>
					{t("login.subtitle")}
				</Typography>
				<TextField
					label={t("registerPage.email")}
					name='email'
					type='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
					variant='outlined'
				/>
				<FormControl fullWidth variant='outlined'>
					<InputLabel htmlFor='password'>
						{t("registerPage.password")}
					</InputLabel>
					<OutlinedInput
						dir={dir}
						name='password'
						id='password'
						type={showPassword ? "text" : "password"}
						endAdornment={
							<InputAdornment position='start'>
								<IconButton
									aria-label={
										showPassword
											? "hide the password"
											: "display the password"
									}
									onClick={handleClickShowPassword}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						label={t("registerPage.password")}
					/>
					{formik.touched.password && formik.errors.password && (
						<FormHelperText sx={{color: "red"}}>
							{formik.errors.password}
						</FormHelperText>
					)}
				</FormControl>
				<LoadingButton
					loading={formik.isSubmitting}
					sx={{backgroundColor: "primary.main"}}
					type='submit'
					variant='contained'
				>
					{t("login.login")}
				</LoadingButton>
				<Button
					sx={{backgroundColor: "primary.main"}}
					onClick={() => navigate("/register")}
					variant='contained'
				>
					{t("registerPage.newUser")}
				</Button>
				<Button
					sx={{backgroundColor: "primary.main"}}
					onClick={() => navigate("/business-register")}
					variant='contained'
				>
					{t("registerPage.newVendor")}
				</Button>
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
			</Box>
		</main>
	);
};

export default Login;
