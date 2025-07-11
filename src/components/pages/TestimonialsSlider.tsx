import {Box, Container, Typography, Avatar, Paper, useTheme} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";

import "swiper/swiper-bundle.css";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import {useTranslation} from "react-i18next";

interface Testimonial {
	name: string;
	feedback: string;
	avatar: string;
	rating: number;
	date: string;
}

const testimonials: Testimonial[] = [
	{
		name: "ليلى من القدس",
		feedback:
			"منصة أفراحنا سهلت عليّ كل التحضيرات! قدرت ألاقي مصورة رائعة وقاعة مناسبة خلال يومين فقط. الخدمة كانت ممتازة والتواصل مع مزودي الخدمة كان سلسًا.",
		avatar: "/avatars/user1.jpg",
		rating: 5,
		date: "15 يناير 2023",
	},
	{
		name: "محمود من رام الله",
		feedback:
			"الدعم الفني كان سريع ومفيد جدًا، وتم حل مشكلة الحجز خلال دقائق. شكراً على الاحترافية. أنصح الجميع باستخدام هذه المنصة لتخطيط حفلاتهم.",
		avatar: "/avatars/user2.jpg",
		rating: 4,
		date: "2 مارس 2023",
	},
	{
		name: "نسرين من الخليل",
		feedback:
			"تعاملت مع طباخ رائع من خلال المنصة، وكان كل شيء جاهز وممتاز في يوم الفرح! الأسعار كانت مناسبة والجودة فاقت التوقعات.",
		avatar: "/avatars/user3.jpg",
		rating: 5,
		date: "28 نوفمبر 2022",
	},
	{
		name: "أحمد من نابلس",
		feedback:
			"تجربة رائعة مع منصة أفراحنا، ساعدتني في العثور على أفضل الديكورات لزفافي. فريق العمل كان محترفًا ويستحق التقدير.",
		avatar: "/avatars/user4.jpg",
		rating: 5,
		date: "10 مايو 2023",
	},
];

const TestimonialsSlider = () => {
	const theme = useTheme();
	const {t} = useTranslation();
	const renderStars = (rating: number) => {
		return (
			<Box sx={{display: "flex", justifyContent: "center", mb: 1}}>
				{[...Array(5)].map((_, i) =>
					i < rating ? (
						<StarIcon key={i} color='primary' fontSize='small' />
					) : (
						<StarBorderIcon key={i} color='primary' fontSize='small' />
					),
				)}
			</Box>
		);
	};

	return (
		<Box
			sx={{
				py: 3,
				mt: 20,
			}}
		>
			<Container maxWidth='lg'>
				<Typography
					variant='h3'
					align='center'
					gutterBottom
					color='primary'
					sx={{
						textAlign: "center",
						fontWeight: "bold",
						color: theme.palette.primary.main,
						mt: 10,
					}}
				>
					{t("testimonials.title")}
				</Typography>
				<HorizontalDevider />
				<Swiper
					modules={[Pagination, Autoplay]}
					spaceBetween={30}
					slidesPerView={1}
					autoplay={{
						delay: 6000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						bulletClass: "swiper-pagination-bullet",
						bulletActiveClass: "swiper-pagination-bullet-active",
					}}
					breakpoints={{
						600: {
							slidesPerView: 1,
						},
						900: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
					}}
					style={{
						paddingBottom: 40, // Space for pagination
					}}
				>
					{testimonials.map((testimonial, index) => (
						<SwiperSlide key={index}>
							<Paper
								elevation={0}
								sx={{
									p: 4,
									textAlign: "center",
									borderRadius: 3,
									height: "100%",
									display: "flex",
									flexDirection: "column",
									backgroundColor:
										theme.palette.mode === "dark"
											? theme.palette.background.paper
											: theme.palette.common.white,
									border: `1px solid ${theme.palette.divider}`,
									transition: "transform 0.3s, box-shadow 0.3s",
									"&:hover": {
										transform: "translateY(-5px)",
										boxShadow: theme.shadows[4],
									},
								}}
							>
								<Avatar
									src={testimonial.avatar}
									alt={testimonial.name}
									sx={{
										width: 80,
										height: 80,
										mx: "auto",
										mb: 2,
										border: `3px solid ${theme.palette.primary.main}`,
									}}
								/>
								{renderStars(testimonial.rating)}
								<Typography
									variant='body1'
									sx={{mb: 3, fontStyle: "italic"}}
								>
									"{testimonial.feedback}"
								</Typography>
								<Box sx={{mt: "auto"}}>
									<Typography variant='subtitle1' fontWeight='bold'>
										{testimonial.name}
									</Typography>
									<Typography variant='caption' color='text.secondary'>
										{testimonial.date}
									</Typography>
								</Box>
							</Paper>
						</SwiperSlide>
					))}
				</Swiper>
			</Container>
		</Box>
	);
};

export default TestimonialsSlider;
