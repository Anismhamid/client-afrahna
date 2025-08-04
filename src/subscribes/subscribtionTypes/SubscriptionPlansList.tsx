import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
	Tooltip,
	Grid,
	Chip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {useTranslation} from "react-i18next";

interface Feature {
	text: string;
	included: boolean;
	tooltip?: string;
}

interface SubscriptionPlan {
	id: string;
	name: string;
	price: string;
	description: string;
	features: Feature[];
	recommended?: boolean;
}

interface Props {
	plans: SubscriptionPlan[];
	selectedPlanId?: string;
	onSelectPlan: (planId: string) => void;
}

export function SubscriptionPlansList({plans, selectedPlanId, onSelectPlan}: Props) {
	const {t, i18n} = useTranslation();

	return (
		<Grid
			container
			spacing={4}
			dir={i18n.dir()}
			justifyContent='center'
			alignItems='stretch'
		>
			{plans.map((plan) => (
				<Grid size={{xs: 12, sm: 6, md: 4}} key={plan.id}>
					<Card
						variant='outlined'
						sx={{
							height: "100%",
							borderColor: plan.recommended ? "primary.main" : "grey.300",
							borderWidth: plan.recommended ? 2 : 1,
							backgroundColor: plan.recommended
								? "rgba(0, 123, 255, 0.05)"
								: "#fff",
							boxShadow: plan.recommended ? 3 : 1,
							borderRadius: 3,
							position: "relative",
						}}
					>
						<CardContent>
							{plan.recommended && (
								<Chip
									label={t("subscription.recommended")}
									color='primary'
									size='small'
									sx={{position: "absolute", top: 16, right: 16}}
								/>
							)}

							<Typography variant='h5' fontWeight='bold' gutterBottom>
								{t(plan.id)}
							</Typography>
							<Typography variant='h6' color='text.secondary' gutterBottom>
								{t(plan.price)}
							</Typography>
							<Typography variant='body2' mb={2}>
								{t(plan.description)}
							</Typography>

							<List dense>
								{plan.features.map((feature, index) => (
									<ListItem key={index} disablePadding>
										<ListItemIcon sx={{minWidth: 32}}>
											{feature.included ? (
												<CheckCircleIcon color='success' />
											) : (
												<Tooltip
													title={
														feature.tooltip
															? t(feature.tooltip)
															: ""
													}
												>
													<CancelIcon color='disabled' />
												</Tooltip>
											)}
										</ListItemIcon>
										<ListItemText primary={t(feature.text)} />
									</ListItem>
								))}
							</List>
							<Button
								fullWidth
								variant={
									selectedPlanId === plan.id ? "contained" : "outlined"
								}
								color='primary'
								sx={{mt: 3}}
								onClick={() => onSelectPlan(plan.id)}
							>
								{selectedPlanId === plan.id
									? t("subscription.selected")
									: t("subscription.selectPlan")}
							</Button>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
