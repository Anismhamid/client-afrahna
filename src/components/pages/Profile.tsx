import {FunctionComponent} from "react";
import {useUser} from "../../contextApi/useUserData";
import {
	Box,
	Button,
	Divider,
	Typography,
	CircularProgress,
	Paper,
	Chip,
	Stack,
	CardMedia,
	// CardMedia,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MyBookings from "./MyBookings";
import {ErrorOutline, Person} from "@mui/icons-material";
import VendorsAnalyticsDashboard from "./VendorsAnalyticsDashboard";
import {useServiceData} from "../../hooks/useServiceData";
// import {subscriptionPlans} from "../../subscribes/subscribtionTypes/subscriptionPlans";
import {subscriptionColor} from "../../subscribes/subscribtionTypes/subscriptionUtils";
// import SubscriptionInfo from "../../subscribes/SubscriptionInfo";
// import ProfileImage from "../../atoms/UploadImage";
import { subscriptionPlans } from "../../subscribes/subscribtionTypes/subscriptionPlans";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const {user} = useUser();
	console.log(user);
	
	const navigate = useNavigate();
	const {planId, loading: serviceLoading} = useServiceData(user?._id || "");

	const currentUser =
		user?.businessName ||
		`${user?.name?.first || ""} ${user?.name?.last || ""}`.trim();
	const currentPlan = subscriptionPlans.find(
		(plan) => plan.id === (planId || user?.subscriptionData.planId),
	);

	if (serviceLoading) {
		return (
			<Box sx={{display: "flex", justifyContent: "center", mt: 10}}>
				<CircularProgress size={60} />
			</Box>
		);
	}

	if (!user) {
		return (
			<Box sx={{textAlign: "center", mt: 5, mx: "auto", maxWidth: 500}}>
				<ErrorOutline color='error' sx={{fontSize: 60, mb: 2}} />
				<Typography variant='h5' color='error' gutterBottom>
					حدث خطأ في تحميل بيانات المستخدم
				</Typography>
				<Button
					variant='contained'
					onClick={() => window.location.reload()}
					sx={{mt: 2}}
				>
					إعادة المحاولة
				</Button>
			</Box>
		);
	}

	if (!user) {
		return (
			<Box sx={{textAlign: "center", mt: 5, mx: "auto", maxWidth: 500}}>
				<Typography variant='h5' gutterBottom>
					يجب تسجيل الدخول لرؤية الملف الشخصي
				</Typography>
				<Button
					variant='contained'
					onClick={() => navigate("/login")}
					size='large'
					sx={{mt: 2}}
				>
					تسجيل الدخول
				</Button>
			</Box>
		);
	}

	return (
		<Box component='main' sx={{maxWidth: 1200, mx: "auto", p: 2}}>
			<Typography
				variant='h3'
				align='center'
				gutterBottom
				sx={{mb: 4, fontWeight: "bold"}}
			>
				الملف الشخصي
			</Typography>

			<CardMedia
				component='img'
				image={user.profileImage?.url}
				alt='صورة الكرسي'
				sx={{maxWidth: 200, mx: "auto", mb: 3}}
			/>

			{/* <ProfileImage /> */}

			{user.role === "isVendor" && <VendorsAnalyticsDashboard />}

			<Paper
				elevation={3}
				sx={{
					p: 4,
					mb: 4,
					borderLeft: `4px solid ${subscriptionColor(
						planId || user.subscriptionData.planId || "free",
					)}`,
				}}
			>
				<Typography
					variant='h4'
					gutterBottom
					sx={{mb: 3, display: "flex", alignItems: "center"}}
				>
					<Person sx={{ml: 1}} /> معلومات شخصية
				</Typography>

				<Stack spacing={3} sx={{mb: 3}}>
					<Box>
						<Typography variant='subtitle1' color='text.secondary'>
							الاسم
						</Typography>
						<Typography variant='h6'>{currentUser || "غير متوفر"}</Typography>
					</Box>

					<Box>
						<Typography variant='subtitle1' color='text.secondary'>
							البريد الإلكتروني
						</Typography>
						<Typography variant='h6'>{user.email || "غير متوفر"}</Typography>
					</Box>

					<Box>
						<Typography variant='subtitle1' color='text.secondary'>
							نوع الحساب
						</Typography>
						<Chip
							label={user.role === "customer" ? "مستخدم" : "مزود خدمات"}
							color={user.role === "customer" ? "default" : "primary"}
							sx={{mt: 1}}
						/>
					</Box>
				</Stack>
			</Paper>

			{/* // <Paper elevation={3} sx={{p: 4, mb: 4}}>
			// 	<Typography variant='h4' gutterBottom sx={{mb: 3}}>
			// 		معلومات الاشتراك
			// 	</Typography>

			// 	<Stack spacing={3} sx={{mb: 4}}>
			// 		<Box>
			// 			<Typography variant='subtitle1' color='text.secondary'>
			// 				الخطة الحالية
			// 			</Typography>
			// 			<Chip
			// 				label={planId || user.planId || "free"}
			// 				sx={{
			// 					backgroundColor: subscriptionColor(
			// 						planId || user.planId || "free",
			// 					),
			// 					color: "white",
			// 					fontSize: "1rem",
			// 					p: 2,
			// 					mt: 1,
			// 				}}
			// 			/>
			// 		</Box>

			// 		<Box>
			// 			<Typography variant='subtitle1' color='text.secondary'>
			// 				تاريخ الاشتراك
			// 			</Typography>

			// 			<Typography variant='h6'>
			// 				{user.subscriptionDate
			// 					? new Date(user.subscriptionDate).toLocaleDateString(
			// 							"he-IL",
			// 					  )
			// 					: "لم تقم بالاشتراك بعد"}
			// 			</Typography>
			// 		</Box>

			// 		<Box>
			// 			<Typography variant='subtitle1' color='text.secondary'>
			// 				تاريخ الانتهاء
			// 			</Typography>
			// 			<Typography variant='h6'>
			// 				{user.expiryDate
			// 					? new Date(user.expiryDate).toLocaleDateString(
			// 							"he-IL",
			// 					  )
			// 					: "غير متوفر"}
			// 			</Typography>
			// 		</Box>
			// 	</Stack>

			// 	{currentPlan && (
			// 		<Paper elevation={2} sx={{p: 3, backgroundColor: "action.hover"}}>
			// 			<Typography variant='h5' align='center' gutterBottom>
			// 				{currentPlan.name}
			// 			</Typography>
			// 			<Typography
			// 				variant='h6'
			// 				align='center'
			// 				gutterBottom
			// 				sx={{mb: 3}}
			// 			>
			// 				السعر: {currentPlan.price}
			// 			</Typography>

			// 			<Stack spacing={2}>
			// 				{currentPlan.features.map((feature, index) => (
			// 					<Box
			// 						key={index}
			// 						sx={{display: "flex", alignItems: "center"}}
			// 					>
			// 						<CheckCircleOutline
			// 							color='success'
			// 							sx={{ml: 1}}
			// 						/>
			// 						<Typography variant='body1'>
			// 							{feature.text}
			// 						</Typography>
			// 					</Box>
			// 				))}
			// 			</Stack>
			// 		</Paper>
			// 	)}

			// 	{user.role === "isVendor" && (
			// 		<Button
			// 			startIcon={<Upgrade />}
			// 			variant='contained'
			// 			fullWidth
			// 			sx={{mt: 3}}
			// 			onClick={() => navigate("/subscribtion")}
			// 		>
			// 			{user.isSubscribed ? "ترقية الاشتراك" : "اشترك الآن"}
			// 		</Button>
			// 	)}
			// </Paper> */}
			{/* {(user.isSubscribed || planId) && (
				)} */}
			{/* <SubscriptionInfo vendorId={user.vendorId as string} /> */}

			<Paper elevation={3} sx={{p: 3}}>
				<Typography textAlign={"center"} variant='h4' gutterBottom sx={{mb: 2}}>
					الحجوزات
				</Typography>
				<Divider sx={{mb: 3}} />
				<MyBookings />
			</Paper>
		</Box>
	);
};

export default Profile;
