import {Container, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useTranslation} from "react-i18next";

interface ReactSlickProps {
	images: {
		url: string;
		alt: string;
		_id: string;
	}[];
}

const ReactSlick: FunctionComponent<ReactSlickProps> = ({images}) => {
	const {t} = useTranslation();
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: false,
		arrows: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					arrows: true,
					dots: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true,
				},
			},
		],
	};

	return (
		<Container sx={{textAlign: "center", mx: "auto", mt: 5}}>
			{images && images.length > 0 ? (
				images.length > 1 ? (
					<Slider {...sliderSettings}>
						{images.map((item) => (
							<div key={item._id}>
								<img
									src={item.url}
									alt={item.alt}
									style={{
										width: "100%",
										height: "auto",
										maxHeight: "500px",
										objectFit: "contain",
										margin: "0 auto",
									}}
								/>
							</div>
						))}
					</Slider>
				) : (
					<img
						src={images?.[0].url}
						alt={images?.[0].alt}
						style={{
							width: "100%",
							height: "auto",
							maxHeight: "500px",
							objectFit: "contain",
						}}
					/>
				)
			) : (
				<Typography
					variant='body1'
					align='center'
					color='textSecondary'
					sx={{mt: 3}}
				>
					{t("booking.gallery.noImages")}
				</Typography>
			)}
		</Container>
	);
};

export default ReactSlick;
