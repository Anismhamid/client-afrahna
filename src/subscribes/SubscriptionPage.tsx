import {Box, Typography, Button, Paper, Tooltip, Chip, Divider} from "@mui/material";
import {useFormik} from "formik";
import {FunctionComponent, useState} from "react";
import * as Yup from "yup";
import PaymentForm from "./payment/PaymentForm";
import {errorToast, successToast} from "../atoms/notifications/Toasts";
import {useUser} from "../contextApi/useUserData";
import {subscriptionToPlans} from "../services/subscription";
import {useNavigate} from "react-router-dom";
import {JwtPayload} from "../interfaces/userSchema";
import {CheckCircleOutline, HighlightOff, Star} from "@mui/icons-material";
import {subscriptionPlans} from "./subscribtionTypes/subscriptionPlans";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SubscriptionPageProps {}

const SubscriptionPage: FunctionComponent<SubscriptionPageProps> = () => {
	const [selectedPlanId, setSelectedPlanId] = useState<string>("");
	const navigate = useNavigate();
	const {user, setUser} = useUser();

	const formik = useFormik({
		initialValues: {
			cardNumber: "",
			expiryDate: "",
			cvv: "",
			cardHolderName: "",
			saveCard: false,
		},
		validationSchema: Yup.object().shape({
			cardNumber: Yup.string()
				.required("رقم البطاقة مطلوب")
				.matches(/^(\d{4}\s){3}\d{4}$/, "رقم البطاقة غير صالح"),
			expiryDate: Yup.string()
				.required("تاريخ الانتهاء مطلوب")
				.matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "تاريخ انتهاء غير صالح"),
			cvv: Yup.string()
				.required("CVV مطلوب")
				.matches(/^\d{3}$/, "CVV غير صالح"),
			cardHolderName: Yup.string().required("اسم حامل البطاقة مطلوب"),
		}),
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: async (_) => {
			if (!user?._id) {
				errorToast("يجب تسجيل الدخول لإتمام عملية الاشتراك");
				return;
			}

			if (!selectedPlanId) {
				errorToast("الرجاء اختيار باقة اشتراك قبل الدفع");
				return;
			}


			try {
				const sub = await subscriptionToPlans(user._id, {
					isSubscribed: true,
					planId: selectedPlanId,
					subscriptionDate: new Date().toISOString(),
					expiryDate: new Date(
						Date.now() + 30 * 24 * 60 * 60 * 1000,
					).toISOString(),
					recommendedServices: false,
				});

				if (sub.token) {
					localStorage.setItem("token", sub.token);
					setUser(() => sub.token as JwtPayload);
					successToast(
						`تم الاشتراك بنجاح في الباقة ${
							subscriptionPlans.find((p) => p.id === selectedPlanId)?.name
						}`,
					);
					navigate("/profile");
				}
			} catch (error) {
				console.error("Error:", error);
				errorToast("حدث خطأ أثناء عملية الدفع");
			}
		},
	});

	return (
		<Box
			sx={{
				py: 4,
				px: 2,
				maxWidth: 1200,
				mx: "auto",
				display: "flex",
				flexDirection: "column",
				gap: 4,
			}}
		>
			<Typography
				variant='h3'
				gutterBottom
				align='center'
				sx={{fontWeight: "bold", mb: 4, color: "primary.main"}}
			>
				خطط اشتراك منصة أفراحنا
			</Typography>

			<Typography variant='h6' align='center' sx={{mb: 4, color: "text.secondary"}}>
				اختر الباقة المناسبة لاحتياجاتك واستمتع بمزايا حصرية
			</Typography>

			{/* Subscription Plans Section */}
			<Box>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						gap: 3,
						mb: 4,
					}}
				>
					{subscriptionPlans.map((plan) => {
						const isSelected = selectedPlanId === plan.id;
						const isRecommended = plan.recommended;
						const hasCertification = plan.features.some((f) =>
							f.text.includes("شهادة 'مزود موثوق'"),
						);

						return (
							<Paper
								key={plan.id}
								elevation={isRecommended ? 6 : 3}
								sx={{
									p: 3,
									border: isRecommended
										? "2px solid #FFD700"
										: "1px solid #e0e0e0",
									position: "relative",
									borderRadius: 3,
									flex: "1 1 100%",
									maxWidth: {xs: "100%", sm: "48%", md: "30%"},
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									transition: "transform 0.3s, box-shadow 0.3s",
									transform: isSelected ? "translateY(-8px)" : "none",
									boxShadow: isSelected
										? "0 8px 20px rgba(0,0,0,0.15)"
										: "none",
									backgroundColor: "background.paper",
								}}
							>
								{isRecommended && (
									<Chip
										icon={<Star />}
										label='الأكثر اختياراً'
										color='warning'
										sx={{
											position: "absolute",
											top: -16,
											right: 20,
											fontWeight: "bold",
										}}
									/>
								)}

								<Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 2,
										}}
									>
										<Box>
											<Typography
												variant='h5'
												sx={{
													fontWeight: "bold",
													color: isRecommended
														? "warning.main"
														: "primary.main",
												}}
											>
												{plan.name}
											</Typography>
											<Typography
												variant='h4'
												sx={{fontWeight: "bold", my: 1}}
											>
												{plan.price}
												{!plan.price.includes("مجاني") &&
													!plan.price.includes("تواصل") && (
														<Typography
															component='span'
															variant='body2'
															color='text.secondary'
														>
															/شهرياً
														</Typography>
													)}
											</Typography>
										</Box>
										{hasCertification && (
											<>
												<Typography display={"block"}>
													متميز
												</Typography>
												<img
													src='/special.png'
													alt='وسام متميز'
													style={{
														width: 50,
														height: 50,
														backdropFilter:
															"box-shadow:1px 1px 10px red",
													}}
												/>
											</>
										)}
									</Box>

									<Typography
										variant='body1'
										color='text.secondary'
										sx={{mb: 2}}
									>
										{plan.description}
									</Typography>

									<Divider sx={{my: 2}} />

									<Box component='ul' sx={{pl: 0}}>
										{plan.features.map((feature, index) => (
											<Box
												component='li'
												key={index}
												sx={{
													display: "flex",
													alignItems: "flex-start",
													py: 1,
													gap: 1.5,
												}}
											>
												{feature.included ? (
													<CheckCircleOutline
														color='success'
														fontSize='small'
													/>
												) : (
													<HighlightOff
														color='error'
														fontSize='small'
													/>
												)}

												<Tooltip
													title={feature.tooltip || ""}
													arrow
													disableHoverListener={
														!feature.tooltip
													}
												>
													<Typography
														variant='body1'
														sx={{
															flexGrow: 1,
															color: feature.included
																? "text.primary"
																: "text.disabled",
															...(!feature.included && {
																textDecoration:
																	"line-through",
															}),
														}}
													>
														{feature.text}
													</Typography>
												</Tooltip>
											</Box>
										))}
									</Box>
								</Box>

								<Button
									variant={isSelected ? "contained" : "outlined"}
									fullWidth
									size='large'
									sx={{
										mt: 3,
										backgroundColor: isSelected
											? "primary.default"
											: "transparent",
										color: isSelected
											? "warning.main"
											: "primary.main",
										fontWeight: "bold",
										py: 1.5,
										"&:hover": {
											backgroundColor: isSelected
												? "primary.dark"
												: "action.hover",
										},
									}}
									onClick={() => {
										setSelectedPlanId(isSelected ? "" : plan.id);
										if (plan.id === "free") {
											navigate("/");
										}
									}}
								>
									{isSelected
										? "الباقة المختارة اضغط للالغاء"
										: "اختر هذه الباقة المميزة"}
								</Button>
							</Paper>
						);
					})}
				</Box>
			</Box>

			{/* Payment Information Section - Only shown when a plan is selected */}
			{selectedPlanId &&
				!subscriptionPlans
					.find((p) => p.id === selectedPlanId)
					?.price.includes("مجاني") && (
					<>
						<Typography variant='h5' sx={{fontWeight: "bold", mb: 2}}>
							معلومات الدفع
						</Typography>
						<PaymentForm formik={formik} />
					</>
				)}
		</Box>
	);
};

export default SubscriptionPage;
