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
	Alert,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MyBookings from "./MyBookings";
import {ErrorOutline, Person} from "@mui/icons-material";
import VendorsAnalyticsDashboard from "./VendorsAnalyticsDashboard";
import {useServiceData} from "../../hooks/useServiceData";
import {subscriptionPlans} from "../../subscribes/subscribtionTypes/subscriptionPlans";
import {subscriptionColor} from "../../subscribes/subscribtionTypes/subscriptionUtils";
import {useTranslation} from "react-i18next";

interface ProfileProps {}

interface UserSubscriptionData {
	planId?: string;
	isSubscribed?: boolean;
	subscriptionDate?: Date | string | null;
	expiryDate?: Date | string | null;
}

interface User {
	_id?: string;
	name?: {
		first?: string;
		last?: string;
	};
	businessName?: string;
	email?: string;
	role?: string;
	profileImage?: {
		url?: string;
	};
	subscriptionData?: UserSubscriptionData;
	vendorId?: string;
}

const Profile: FunctionComponent<ProfileProps> = () => {
	const {user} = useUser() as {user: User | null};
	const {t} = useTranslation();
	const navigate = useNavigate();
	const {planId, loading: serviceLoading} = useServiceData(user?._id || "");

	// Safely get user display name
	const currentUser =
		user?.businessName ||
		`${user?.name?.first || ""} ${user?.name?.last || ""}`.trim() ||
		"غير متوفر";

	// Safely get current plan
	const currentPlan = subscriptionPlans.find(
		(plan) => plan.id === (planId || user?.subscriptionData?.planId),
	);

	// Loading state
	if (serviceLoading) {
		return (
			<Box sx={{display: "flex", justifyContent: "center", mt: 10}}>
				<CircularProgress size={60} />
			</Box>
		);
	}

	// // Error states
	// if (serviceError) {
	// 	return (
	// 		<Box sx={{textAlign: "center", mt: 5, mx: "auto", maxWidth: 500}}>
	// 			<ErrorOutline color='error' sx={{fontSize: 60, mb: 2}} />
	// 			<Typography variant='h5' color='error' gutterBottom>
	// 				حدث خطأ في تحميل بيانات الخدمة
	// 			</Typography>
	// 			<Button
	// 				variant='contained'
	// 				onClick={() => window.location.reload()}
	// 				sx={{mt: 2}}
	// 			>
	// 				إعادة المحاولة
	// 			</Button>
	// 		</Box>
	// 	);
	// }

	if (!user) {
		return (
			<Box sx={{textAlign: "center", mt: 5, mx: "auto", maxWidth: 500}}>
				<Typography variant='h5' gutterBottom>
					{t("login.loginToSeeYours")}
				</Typography>
				<Button
					variant='contained'
					onClick={() => navigate("/login")}
					size='large'
					sx={{mt: 2}}
				>
					{t("login.login")}
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
				{t("navbar.profile")}
			</Typography>

			{user.profileImage?.url && (
				<CardMedia
					component='img'
					image={user.profileImage.url}
					alt={t("afrahna.user.image")}
					sx={{
						maxWidth: 200,
						mx: "auto",
						mb: 3,
						borderRadius: "50%",
						aspectRatio: "1/1",
						objectFit: "cover",
					}}
				/>
			)}

			{user.role === "isVendor" && <VendorsAnalyticsDashboard />}

			<Paper
				elevation={3}
				sx={{
					p: 4,
					mb: 4,
					borderLeft: `4px solid ${subscriptionColor(
						planId || user.subscriptionData?.planId || "free",
					)}`,
				}}
			>
				<Typography
					variant='h4'
					gutterBottom
					sx={{mb: 3, display: "flex", alignItems: "center"}}
				>
					<Person sx={{ml: 1}} /> {t("afrahna.user.info")}
				</Typography>

				<Stack spacing={3} sx={{mb: 3}}>
					<Box>
						<Typography variant='subtitle1' color='text.secondary'>
							{t("afrahna.user.name")}
						</Typography>
						<Typography variant='h6'>{currentUser}</Typography>
					</Box>

					<Box>
						<Typography variant='subtitle1' color='text.secondary'>
							{t("registerPage.email")}
						</Typography>
						<Typography variant='h6'>{user.email || "غير متوفر"}</Typography>
					</Box>

					<Box>
						<Typography variant='subtitle1' color='text.secondary'>
							{t("afrahna.user.userRole")}
						</Typography>
						<Chip
							label={user.role === "customer" ? "مستخدم" : "مزود خدمات"}
							color={user.role === "customer" ? "default" : "primary"}
							sx={{mt: 1}}
						/>
					</Box>

					{currentPlan && (
						<Box>
							<Typography variant='subtitle1' color='text.secondary'>
								{t("afrahna.user.subscriptionPlan")}
							</Typography>
							<Chip
								label={currentPlan.name}
								sx={{
									backgroundColor: subscriptionColor(currentPlan.id),
									color: "white",
									mt: 1,
								}}
							/>
						</Box>
					)}
				</Stack>
			</Paper>

			<Paper elevation={3} sx={{p: 3}}>
				<MyBookings />
			</Paper>
		</Box>
	);
};

export default Profile;
