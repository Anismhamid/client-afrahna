import {Box, IconButton, Tooltip} from "@mui/material";
import {Instagram, Facebook, Twitter, YouTube} from "@mui/icons-material";

interface SocialMediaLinksProps {
	facebook?: string;
	instagram?: string;
	tikTok?: string;
	twitter?: string;
	youtube?: string;
	color?:
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning"
		| "inherit";
	size?: "small" | "medium" | "large";
	iconSize?: number;
	spacing?: number;
	mt?: number;
}

export default function SocialMediaLinks({
	facebook,
	instagram,
	tikTok,
	twitter,
	youtube,
	color = "primary",
	size = "large",
	iconSize,
	spacing = 4,
	mt = 4,
	...props
}: SocialMediaLinksProps) {
	// Size mapping for icons
	const sizeMap = {
		small: iconSize || 24,
		medium: iconSize || 32,
		large: iconSize || 40,
	};
	const platformColors: Record<string, string> = {
		Facebook: "#1877F2",
		Instagram: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
		Twitter: "#1DA1F2",
		YouTube: "#FF0000",
		TikTok: "#010101", // أو gradient إذا تحب
	};

	const platforms = [
		{name: "Facebook", url: facebook, icon: <Facebook fontSize='inherit' />},
		{name: "Instagram", url: instagram, icon: <Instagram fontSize='inherit' />},
		{name: "Twitter", url: twitter, icon: <Twitter fontSize='inherit' />},
		{name: "YouTube", url: youtube, icon: <YouTube fontSize='inherit' />},
	];
	return (
		<Box
			display='flex'
			justifyContent='space-evenly'
			gap={spacing}
			mt={mt}
			{...props}
		>
			{platforms.map(
				({name, url, icon}) =>
					url && (
						<Tooltip key={name} title={name} arrow>
							<IconButton
								component='a'
								href={url}
								target='_blank'
								rel='noopener noreferrer'
								color={color}
								size={size}
								aria-label={name}
								sx={{
									width: sizeMap[size] + 10,
									height: sizeMap[size] + 10,
									borderRadius: "50%",
									background: platformColors[name] || "gray",
									"& svg": {
										fontSize: sizeMap[size],
										color: "white",
									},
								}}
							>
								{icon}
							</IconButton>
						</Tooltip>
					),
			)}
			{tikTok && (
				<Tooltip title='TikTok' arrow>
					<IconButton
						component='a'
						href={tikTok}
						target='_blank'
						rel='noopener noreferrer'
						color={color}
						size={size}
						aria-label='TikTok'
						sx={{
							width: sizeMap[size] + 10,
							height: sizeMap[size] + 10,
							padding: 1,
							borderRadius: "50%",
							bgcolor: platformColors["TikTok"],
						}}
					>
						<img
							src='/tiktok-brands-solid-full.svg'
							alt='TikTok'
							width={sizeMap[size]}
							height={sizeMap[size]}
						/>
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
}
