import {FunctionComponent, useState} from "react";
import {uploadVideo} from "../../services/videosForAds";
import {
	Box,
	Button,
	Typography,
	Alert,
	LinearProgress,
	IconButton,
	CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_FILE_TYPES = ["video/mp4", "video/webm", "video/ogg"];

/**
 * Video upload component
 * @returns A form for uploading videos to the database
 */
const VideoUpload: FunctionComponent = () => {
	const [file, setFile] = useState<File | null>(null);
	const [message, setMessage] = useState<{
		text: string;
		severity: "success" | "error" | "info";
	} | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;

		const selectedFile = e.target.files[0];

		// Reset previous state
		setMessage(null);
		setUploadProgress(0);

		// Validate file
		if (selectedFile.size > MAX_FILE_SIZE) {
			setMessage({text: "File is too large (max 100MB)", severity: "error"});
			return;
		}

		if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
			setMessage({
				text: `Only ${ALLOWED_FILE_TYPES.map((t) => t.split("/")[1]).join(
					", ",
				)} files are allowed`,
				severity: "error",
			});
			return;
		}

		setFile(selectedFile);
		setMessage({text: "File selected and ready for upload", severity: "info"});
	};

	const handleUpload = async () => {
		if (!file) return;

		setIsUploading(true);
		setUploadProgress(0);
		setMessage(null);

		try {
			const data = await uploadVideo(file, (progressEvent: { loaded: number; total: any; }) => {
				const progress = Math.round(
					(progressEvent.loaded * 100) / (progressEvent.total || 1),
				);
				setUploadProgress(progress);
			});

			setMessage({
				text: `Upload successful! File ID: ${data.fileId}`,
				severity: "success",
			});
			setFile(null);
		} catch (error) {
			setMessage({
				text: error instanceof Error ? error.message : "Upload failed",
				severity: "error",
			});
		} finally {
			setIsUploading(false);
			setUploadProgress(0);
		}
	};

	const handleCancel = () => {
		setFile(null);
		setMessage(null);
		setUploadProgress(0);
	};

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				gap: 2,
				p: 3,
				border: "1px dashed",
				borderColor: "divider",
				borderRadius: 2,
			}}
		>
			<Typography variant='h6' component='h2' gutterBottom>
				Upload Video
			</Typography>

			<Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
				<Button
					component='label'
					variant='contained'
					color='primary'
					startIcon={<CloudUploadIcon />}
					disabled={isUploading}
				>
					Select Video
					<VisuallyHiddenInput
						type='file'
						accept={ALLOWED_FILE_TYPES.join(",")}
						onChange={handleChange}
					/>
				</Button>

				<Button
					variant='contained'
					color='success'
					startIcon={
						isUploading ? (
							<CircularProgress size={20} color='inherit' />
						) : null
					}
					onClick={handleUpload}
					disabled={!file || isUploading}
				>
					{isUploading ? "Uploading..." : "Upload Video"}
				</Button>

				{file && (
					<Button
						variant='outlined'
						color='error'
						onClick={handleCancel}
						disabled={isUploading}
					>
						Cancel
					</Button>
				)}
			</Box>

			{file && (
				<Box sx={{mt: 2}}>
					<Typography variant='body1' gutterBottom>
						Selected file: <strong>{file.name}</strong>
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
					</Typography>
				</Box>
			)}

			{isUploading && (
				<Box sx={{width: "100%", mt: 2}}>
					<LinearProgress variant='determinate' value={uploadProgress} />
					<Typography variant='body2' textAlign='center' mt={1}>
						{uploadProgress}% uploaded
					</Typography>
				</Box>
			)}

			{message && (
				<Alert
					severity={message.severity}
					sx={{mt: 2}}
					action={
						<IconButton size='small' onClick={() => setMessage(null)}>
							<CloseIcon fontSize='small' />
						</IconButton>
					}
				>
					{message.text}
				</Alert>
			)}
		</Box>
	);
};

export default VideoUpload;
