import {Box, Typography, CircularProgress} from "@mui/material";
import {FunctionComponent, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

interface VideoAdsCarouselProps {
	title?: string;
	videos: string[];
	durationSeconds?: number;
}

const VideoAdsCarousel: FunctionComponent<VideoAdsCarouselProps> = ({
	videos,
	durationSeconds = 60,
}) => {
	const {t} = useTranslation();
	const [currentIndex, setCurrentIndex] = useState(0);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	// Handle video cycling and visibility
	useEffect(() => {
		if (videos.length <= 1) return;

		const playNextVideo = () => {
			setCurrentIndex((prev) => (prev + 1) % videos.length);
			setIsLoading(true);
		};

		const playInterval = () => {
			intervalRef.current = setInterval(playNextVideo, durationSeconds * 1000);
		};

		playInterval();

		if (!containerRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					if (!intervalRef.current) {
						playInterval();
					}
					videoRef.current
						?.play()
						.catch((e) => console.warn("Autoplay prevented:", e));
				} else {
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
					}
					videoRef.current?.pause();
				}
			},
			{threshold: 0.5},
		);

		observer.observe(containerRef.current);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			observer.disconnect();
		};
	}, [videos.length, durationSeconds]);

	// Improved error handling
	const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
		const error = e.currentTarget.error;
		const errorMessages: Record<number, string> = {
			1: t("ads.videoAds.videoHasBeenPaused"),
			2: t("ads.videoAds.networkError"),
			3: t("ads.videoAds.decodingError"),
			4: t("ads.videoAds.unsupportedFormat"),
		};
		// ${error.code}
		setError(
			error
				? errorMessages[error.code] ||
						t(`ads.videoAds.operationalError ${error.code}`)
				: t("ads.videoAds.playbackFailed"),
		);
		setIsLoading(false);

		// Try to play next video after error
		if (videos.length > 1) {
			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % videos.length);
			}, 3000);
		}
	};

	if (videos.length === 0) {
		return (
			<Box sx={{maxWidth: 700, mx: "auto"}} ref={containerRef}>
				<Box
					sx={{
						position: "relative",
						paddingTop: "56.25%",
						borderRadius: 2,
						overflow: "hidden",
						bgcolor: "background.paper",
						boxShadow: 3,
					}}
				>
					<Typography
						color='text.secondary'
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						{t("ads.noVideo")}
					</Typography>
				</Box>
			</Box>
		);
	}

	return (
		<Box sx={{maxWidth: {xs: "100%", md: "70%"}, mx: "auto"}} ref={containerRef}>
			<Box
				sx={{
					position: "relative",
					paddingTop: "56.25%",
					borderRadius: 2,
					overflow: "hidden",
					bgcolor: "black",
					boxShadow: 3,
				}}
			>
				<video
					crossOrigin='anonymous'
					ref={videoRef}
					key={videos[currentIndex]}
					src={videos[currentIndex]}
					muted
					autoPlay
					playsInline
					controls={true}
					aria-label={t("ads.videoAds.promotionalVideo")}
					preload='auto'
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						objectFit: "contain",
						backgroundColor: "#000",
					}}
					onError={handleError}
					onEnded={() => {
						if (videos.length > 1) {
							setCurrentIndex((prev) => (prev + 1) % videos.length);
						} else {
							videoRef.current
								?.play()
								.catch((e) => console.warn("Replay prevented:", e));
						}
					}}
					onCanPlay={() => {
						setError(null);
						setIsLoading(false);
					}}
					onWaiting={() => setIsLoading(true)}
					onPlaying={() => setIsLoading(false)}
				/>

				{isLoading && !error && (
					<CircularProgress
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							color: "white",
						}}
					/>
				)}

				{error && (
					<Typography
						color='error'
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							bgcolor: "background.paper",
							p: 2,
							borderRadius: 1,
						}}
					>
						{error}
					</Typography>
				)}

				{/* Video progress indicator */}
				{videos.length > 1 && (
					<Box
						sx={{
							position: "absolute",
							bottom: 16,
							left: "50%",
							transform: "translateX(-50%)",
							display: "flex",
							gap: 1,
						}}
					>
						{videos.map((_, index) => (
							<Box
								key={index}
								sx={{
									width: 8,
									height: 8,
									borderRadius: "50%",
									bgcolor:
										index === currentIndex
											? "primary.main"
											: "grey.500",
									transition: "background-color 0.3s",
								}}
							/>
						))}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default VideoAdsCarousel;
