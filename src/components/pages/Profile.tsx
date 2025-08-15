import {FunctionComponent, useEffect} from "react";
import {useUser} from "../../contextApi/useUserData";
import {
	Box,
	Typography,
	CircularProgress,
	Paper,
	Chip,
	Stack,
	CardMedia,
	Button,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MyBookings from "./MyBookings";
import {Person} from "@mui/icons-material";
import VendorsAnalyticsDashboard from "./VendorsAnalyticsDashboard";
import {useServiceData} from "../../hooks/useServiceData";
import {subscriptionPlans} from "../../subscribes/subscribtionTypes/subscriptionPlans";
import {subscriptionColor} from "../../subscribes/subscribtionTypes/subscriptionUtils";
import {useTranslation} from "react-i18next";
import {SubscriptionData} from "../../interfaces/userSchema";

interface ProfileProps {}

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
	subscriptionData?: SubscriptionData;
	vendorId?: string;
}

const Profile: FunctionComponent<ProfileProps> = () => {
	const {user} = useUser() as {user: User | null};
	const {t} = useTranslation();
	const navigate = useNavigate();
	const {SubscriptionData, loading: serviceLoading} = useServiceData(user?._id || "");

	// Safely get user display name
	const currentUser =
		user?.businessName ||
		`${user?.name?.first || ""} ${user?.name?.last || ""}`.trim() ||
		"غير متوفر";

	// Safely get current plan
	const currentPlan = subscriptionPlans.find(
		(plan) => plan.id === (SubscriptionData?.planId || "free"),
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
			{/* 
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
			)} */}

			{user.role === "isVendor" && user?.subscriptionData?.planId !== "free" && (
				<VendorsAnalyticsDashboard />
			)}

			<Paper
				elevation={3}
				sx={{
					p: 4,
					mb: 4,
					borderLeft: `4px solid ${subscriptionColor(
						SubscriptionData?.planId || "free",
					)},
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
						<Box display={"flex"} gap={5}>
							<Box>
								<Typography variant='subtitle1' color='text.secondary'>
									{t("afrahna.user.subscriptionPlan")}
								</Typography>
								<Chip
									label={SubscriptionData?.planId || "free"}
									sx={{
										backgroundColor: subscriptionColor(
											SubscriptionData?.planId || "free",
										),
										color: "main.primary",
										mt: 1,
									}}
								/>
							</Box>
							<Box>
								<Typography variant='subtitle1' color='text.secondary'>
									{t("afrahna.user.subscriptionDate")}
								</Typography>
								<Chip
									label={
										SubscriptionData?.subscriptionDate
											? new Date(
													SubscriptionData.subscriptionDate,
											  ).toLocaleDateString()
											: t("afrahna.user.noSubscriptionDate")
									}
									sx={{
										backgroundColor: subscriptionColor(
											SubscriptionData?.planId || "free",
										),
										color: "main.primary",
										mt: 1,
									}}
								/>
							</Box>

							<Box>
								<Typography variant='subtitle1' color='text.secondary'>
									{t("afrahna.user.expiryDate")}
								</Typography>
								<Chip
									label={
										SubscriptionData?.expiryDate
											? new Date(
													SubscriptionData?.expiryDate,
											  ).toLocaleDateString()
											: t("afrahna.user.noSubscriptionDate")
									}
									sx={{
										color: "main.primary",
										mt: 1,
									}}
								/>
							</Box>
							<Box>
								<Typography variant='subtitle1' color='text.secondary'>
									{t("afrahna.user.recommendedServices")}
								</Typography>
								<Chip
									label={
										SubscriptionData?.recommendedServices
											? SubscriptionData?.recommendedServices
											: t("afrahna.user.noSubscriptionDate")
									}
									sx={{
										color: "main.primary",
										mt: 1,
									}}
								/>
							</Box>
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
