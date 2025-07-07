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

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	const navigate = useNavigate();
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
				first: Yup.string().required("الرجاء إدخال الاسم الأول"),
				last: Yup.string().required("الرجاء إدخال الاسم الأخير"),
			}),
			email: Yup.string()
				.email("البريد الإلكتروني غير صالح")
				.required("الرجاء إدخال البريد الإلكتروني"),
			password: Yup.string()
				.min(8, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل")
				.max(30)
				.required("الرجاء إدخال كلمة المرور")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
					"كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم ورمز خاص",
				),
			phone: Yup.string().required("الرجاء إدخال رقم الهاتف"),
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
				successToast("مرحبا بك في منصه افراحنا");
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
						الخلف
					</Button>
				</Box>
				نوع الحساب: مستخدم جديد
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
					سجل الآن واحصل على خدماتنا المميزة
				</Typography>
				<Typography
					variant='h6'
					align='center'
					gutterBottom
					sx={{color: "warning.main", fontWeight: "normal", mt: -1}}
				>
					انضم الان إلى موقعنا واستمتع بخدمات مخصصة لحفلات الزفاف والمناسبات
					الخاصة
				</Typography>
				<div className='row row-cols-md-2 py-2'>
					<div className=' mb-3'>
						<TextField
							label='الاسم الأول'
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
					</div>
					<div>
						<TextField
							label='الاسم الأخير'
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
					</div>
					<div className=' mb-3'>
						<TextField
							label='البريد الإلكتروني'
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
							label='كلمة المرور'
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
							label='رقم الهاتف'
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
							label='المدينة'
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
							label='الشارع'
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
				</div>
				<Button
					loading={formik.isSubmitting}
					sx={{backgroundColor: "success.main", fontSize: "18px"}}
					type='submit'
					variant='contained'
					fullWidth
				>
					التالي
				</Button>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
					mt: 5,
				}}
			>
				<Button
					sx={{backgroundColor: "#0F2D44"}}
					type='button'
					variant='contained'
					onClick={() => navigate("/login")}
				>
					تسجيل الدخول
				</Button>
				<Button
					sx={{backgroundColor: "#0F2D44"}}
					onClick={() => navigate("/register")}
					type='button'
					variant='contained'
				>
					مستخدم جديد
				</Button>
				<Button
					sx={{backgroundColor: "warning.main", fontSize: "18px"}}
					onClick={() => navigate("/business-register")}
					variant='contained'
				>
					التسجيل كمزود خدمات جديد
				</Button>
				<Box display='flex' justifyContent='center' gap={2}>
					<Typography sx={{color: "warning.main"}} variant='body2'>
						<Link to='/privacy-policy'>سياسة الخصوصية</Link>
					</Typography>
					<Typography sx={{color: "warning.main"}} variant='body2'>
						|
					</Typography>
					<Typography sx={{color: "warning.main"}} variant='body2'>
						<Link to='/terms-of-use'>شروط الاستخدام</Link>
					</Typography>
				</Box>
			</Box>
		</main>
	);
};

export default Register;
