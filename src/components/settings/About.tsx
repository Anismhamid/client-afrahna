import {FunctionComponent} from "react";
import {
	Box,
	Typography,
	Container,
	Grid,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemIcon,
	Button,
} from "@mui/material";
import {
	Celebration,
	ConnectWithoutContact,
	Groups,
	Business,
	Search,
	Compare,
	EventAvailable,
	SupportAgent,
} from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {useTranslation} from "react-i18next";
import changeDirection from "../../../locales/directions";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
	const {t} = useTranslation();
	const dir = changeDirection()
	return (
		<main dir={dir}>
			<Box p={4}>
				<Container maxWidth='lg'>
					{/* Hero Section */}
					<Box textAlign='center' mb={6}>
						<Typography
							variant='h2'
							gutterBottom
							sx={{fontWeight: 700, color: "#b5573f"}}
						>
							{t("about.title")}
						</Typography>
						<Typography variant='h5' sx={{color: "#555"}}>
							{t("about.subtitle")}{" "}
						</Typography>
					</Box>

					{/* Vision Section */}
					<Box mb={8}>
						<Typography
							variant='h4'
							gutterBottom
							sx={{fontWeight: 600, color: "#3f51b5"}}
						>
							{t("about.vision.title")}
						</Typography>
						<Typography
							variant='body1'
							paragraph
							sx={{fontSize: "1.1rem", lineHeight: 1.8}}
						>
							{t("about.vision.content")}
						</Typography>
					</Box>

					{/* What We Offer Section */}
					<Box mb={8}>
						<Typography
							variant='h4'
							gutterBottom
							sx={{fontWeight: 600, color: "#3f51b5"}}
						>
							{t("about.offerings.title")}
						</Typography>
						<Typography
							variant='body1'
							paragraph
							sx={{fontSize: "1.1rem", lineHeight: 1.8}}
						>
							{t("about.offerings.content")}
						</Typography>

						<Grid container spacing={4} mt={2}>
							<Grid size={{xs: 12, md: 6}}>
								<Card
									sx={{height: "100%", borderRadius: 3, boxShadow: 3}}
								>
									<CardContent>
										<Typography
											variant='h5'
											gutterBottom
											sx={{fontWeight: 600}}
										>
											{t("about.offerings.categoriesTitle", {
												defaultValue: "Service Categories",
											})}
										</Typography>
										<List>
											{(
												t("about.offerings.categories", {
													returnObjects: true,
												}) as string[]
											).map((item: string, index: number) => (
												<ListItem key={index}>
													<ListItemIcon>
														<Celebration color='primary' />
													</ListItemIcon>
													<Typography>{item}</Typography>
												</ListItem>
											))}
										</List>
									</CardContent>
								</Card>
							</Grid>

							<Grid size={{xs: 12, md: 6}}>
								<Card
									sx={{height: "100%", borderRadius: 3, boxShadow: 3}}
								>
									<CardContent>
										<Typography
											variant='h5'
											gutterBottom
											sx={{fontWeight: 600}}
										>
											{t("about.offerings.advantagesTitle", {
												defaultValue: "Platform Advantages",
											})}{" "}
										</Typography>
										<List>
											{(
												t("about.offerings.advantages", {
													returnObjects: true,
												}) as string[]
											).map((item: string, index: number) => (
												<ListItem key={index}>
													<ListItemIcon>
														<CheckCircleOutlineIcon color='success' />
													</ListItemIcon>
													<Typography>{item}</Typography>
												</ListItem>
											))}
										</List>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Box>

					{/* Who Is It For Section */}
					<Box mb={8}>
						<Typography
							variant='h4'
							gutterBottom
							sx={{fontWeight: 600, color: "#3f51b5"}}
						>
							{t("about.audience.title")}
						</Typography>
						<Grid container spacing={4} mt={2}>
							{(
								t("about.audience.items", {
									returnObjects: true,
								}) as string[]
							).map((item: string, index: number) => (
								<Grid size={{xs: 12, md: 4}} key={index}>
									<Card
										sx={{
											height: "100%",
											borderRadius: 3,
											boxShadow: 3,
										}}
									>
										<CardContent sx={{textAlign: "center"}}>
											{index === 0 && (
												<Groups
													sx={{
														fontSize: 60,
														color: "#b5573f",
														mb: 2,
													}}
												/>
											)}
											{index === 1 && (
												<Business
													sx={{
														fontSize: 60,
														color: "#b5573f",
														mb: 2,
													}}
												/>
											)}
											{index === 2 && (
												<SupportAgent
													sx={{
														fontSize: 60,
														color: "#b5573f",
														mb: 2,
													}}
												/>
											)}
											<Typography
												variant='h5'
												gutterBottom
												sx={{fontWeight: 600}}
											>
												{item.split(" - ")[0]}
											</Typography>
											<Typography>
												{item.split(" - ")[1] || item}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>

					{/* How It Works Section */}
					<Box mb={8}>
						<Typography
							variant='h4'
							gutterBottom
							sx={{fontWeight: 600, color: "#3f51b5"}}
						>
							{t("about.process.title")}
						</Typography>
						<Grid container spacing={4} mt={2}>
							{(
								t("about.process.steps", {
									returnObjects: true,
								}) as string[]
							).map((step: string, index: number) => (
								<Grid size={{xs: 12, md: 3}} key={index}>
									<Card
										sx={{
											height: "100%",
											borderRadius: 3,
											boxShadow: 3,
										}}
									>
										<CardContent sx={{textAlign: "center"}}>
											<Typography
												variant='h3'
												sx={{color: "#3f51b5", mb: 1}}
											>
												{index + 1}
											</Typography>
											{index === 0 && (
												<Search
													sx={{
														fontSize: 50,
														color: "#b5573f",
														mb: 2,
													}}
												/>
											)}
											{index === 1 && (
												<Compare
													sx={{
														fontSize: 50,
														color: "#b5573f",
														mb: 2,
													}}
												/>
											)}
											{index === 2 && (
												<EventAvailable
													sx={{
														fontSize: 50,
														color: "#b5573f",
														mb: 2,
													}}
												/>
											)}
											{index === 3 && (
												<Celebration
													sx={{
														fontSize: 50,
														color: "#b5573f",
														mb: 2,
													}}
												/>
											)}
											<Typography
												variant='h6'
												gutterBottom
												sx={{fontWeight: 600}}
											>
												{step.split(" - ")[0]}
											</Typography>
											<Typography>
												{step.split(" - ")[1] || step}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>

					{/* CTA Section */}
					<Box textAlign='center' mt={6} mb={4}>
						<Typography
							variant='h4'
							gutterBottom
							sx={{fontWeight: 600, color: "#3f51b5"}}
						>
							{t("about.cta.title")}
						</Typography>
						<Typography
							variant='body1'
							paragraph
							sx={{fontSize: "1.1rem", mb: 4}}
						>
							{t("about.cta.content")}
						</Typography>
						<Button
							variant='contained'
							size='large'
							startIcon={<ConnectWithoutContact />}
							sx={{
								backgroundColor: "#b5573f",
								"&:hover": {backgroundColor: "#8c4632"},
								fontSize: "1.1rem",
								padding: "12px 24px",
							}}
						>
							צרו קשר
						</Button>
						<Typography
							variant='h6'
							mt={4}
							sx={{color: "#555", fontWeight: 600}}
						>
							🌐 אפרחנה – הפלטפורמה המובילה לתכנון חתונות ואירועים במזרח
							התיכון!
						</Typography>
					</Box>
				</Container>
			</Box>
		</main>
	);
};

export default About;
