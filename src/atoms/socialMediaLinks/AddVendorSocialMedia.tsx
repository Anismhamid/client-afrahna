import {useFormik} from "formik";
import {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";
import * as yup from "yup";
import {addSocialMediaLinks} from "../../services/vendorServices";
import {successToast} from "../notifications/Toasts";
import {Box, Button, CircularProgress, Paper, TextField, Typography} from "@mui/material";

interface AddVendorSocialMedaProps {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	navigate: (path: string) => void;
	refresh: boolean;
	loading: boolean;
	vendorId: string;
}

const AddVendorSocialMeda: FunctionComponent<AddVendorSocialMedaProps> = ({
	setLoading,
	setRefresh,
  navigate,
	refresh = false,
	loading = false,
	vendorId,
}) => {
	const {t} = useTranslation();

	const editSocialMediaLinks = useFormik({
		initialValues: {
			socialMediaLinks: {
				facebook: "",
				instagram: "",
				tikTok: "",
				x: "",
				youtube: "",
			},
		},
		validationSchema: yup.object({
			socialMediaLinks: yup.object({
				facebook: yup.string().url(t("editServices.invalidUrl")),
				instagram: yup.string().url(t("editServices.invalidUrl")),
				tikTok: yup.string().url(t("editServices.invalidUrl")),
				x: yup.string().url(t("editServices.invalidUrl")),
				youtube: yup.string().url(t("editServices.invalidUrl")),
			}),
		}),

		onSubmit: async (values) => {
			try {
				setLoading(true);
				await addSocialMediaLinks(vendorId, values.socialMediaLinks);
				successToast(t("editServices.socialLinksUpdated"));
				setRefresh(!refresh);
			} catch (err) {
				console.error("Failed to update social links:", err);
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<>
			<Paper
				elevation={3}
				sx={{padding: 3, maxWidth: 400, margin: "0 auto", mb: 4}}
			>
				<Typography variant='h6' textAlign='center' gutterBottom>
					{t("editServices.socialMediaLinks")}
				</Typography>

				<Box
					component='form'
					onSubmit={editSocialMediaLinks.handleSubmit}
					sx={{display: "flex", flexDirection: "column", gap: 2}}
				>
					{/* Facebook */}
					<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
						<Typography sx={{width: 100}}>Facebook:</Typography>
						<TextField
							size='small'
							name='socialMediaLinks.facebook'
							value={editSocialMediaLinks.values.socialMediaLinks.facebook}
							onChange={editSocialMediaLinks.handleChange}
							onBlur={editSocialMediaLinks.handleBlur}
							error={
								editSocialMediaLinks.touched.socialMediaLinks?.facebook &&
								Boolean(
									editSocialMediaLinks.errors.socialMediaLinks
										?.facebook,
								)
							}
							helperText={
								editSocialMediaLinks.touched.socialMediaLinks?.facebook &&
								editSocialMediaLinks.errors.socialMediaLinks?.facebook
							}
							placeholder='https://facebook.com/username'
							fullWidth
							variant='outlined'
						/>
					</Box>

					{/* Instagram */}
					<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
						<Typography sx={{width: 100}}>Instagram:</Typography>
						<TextField
							size='small'
							name='socialMediaLinks.instagram'
							value={
								editSocialMediaLinks.values.socialMediaLinks?.instagram
							}
							onChange={editSocialMediaLinks.handleChange}
							onBlur={editSocialMediaLinks.handleBlur}
							error={
								editSocialMediaLinks.touched.socialMediaLinks
									?.instagram &&
								Boolean(
									editSocialMediaLinks.errors.socialMediaLinks
										?.instagram,
								)
							}
							helperText={
								editSocialMediaLinks.touched.socialMediaLinks
									?.instagram &&
								editSocialMediaLinks.errors.socialMediaLinks?.instagram
							}
							placeholder='https://instagram.com/username'
							fullWidth
							variant='outlined'
						/>
					</Box>

					{/* tikTok */}
					<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
						<Typography sx={{width: 100}}>tikTok:</Typography>
						<TextField
							size='small'
							name='socialMediaLinks.tikTok'
							value={editSocialMediaLinks.values.socialMediaLinks.tikTok}
							onChange={editSocialMediaLinks.handleChange}
							onBlur={editSocialMediaLinks.handleBlur}
							error={
								editSocialMediaLinks.touched.socialMediaLinks?.tikTok &&
								Boolean(
									editSocialMediaLinks.errors.socialMediaLinks?.tikTok,
								)
							}
							helperText={
								editSocialMediaLinks.touched.socialMediaLinks?.tikTok &&
								editSocialMediaLinks.errors.socialMediaLinks?.tikTok
							}
							placeholder='https://tikTok.com/username'
							fullWidth
							variant='outlined'
						/>
					</Box>

					{/* X (Twitter) */}
					<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
						<Typography sx={{width: 100}}>X (Twitter):</Typography>
						<TextField
							size='small'
							name='socialMediaLinks.x'
							value={editSocialMediaLinks.values.socialMediaLinks.x}
							onChange={editSocialMediaLinks.handleChange}
							onBlur={editSocialMediaLinks.handleBlur}
							error={
								editSocialMediaLinks.touched.socialMediaLinks?.x &&
								Boolean(editSocialMediaLinks.errors.socialMediaLinks?.x)
							}
							helperText={
								editSocialMediaLinks.touched.socialMediaLinks?.x &&
								editSocialMediaLinks.errors.socialMediaLinks?.x
							}
							placeholder='https://twitter.com/username'
							fullWidth
							variant='outlined'
						/>
					</Box>

					{/* YouTube */}
					<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
						<Typography sx={{width: 100}}>YouTube:</Typography>
						<TextField
							size='small'
							name='socialMediaLinks.youtube'
							value={editSocialMediaLinks.values.socialMediaLinks.youtube}
							onChange={editSocialMediaLinks.handleChange}
							onBlur={editSocialMediaLinks.handleBlur}
							error={
								editSocialMediaLinks.touched.socialMediaLinks?.youtube &&
								Boolean(
									editSocialMediaLinks.errors.socialMediaLinks?.youtube,
								)
							}
							helperText={
								editSocialMediaLinks.touched.socialMediaLinks?.youtube &&
								editSocialMediaLinks.errors.socialMediaLinks?.youtube
							}
							placeholder='https://youtube.com/username'
							fullWidth
							variant='outlined'
						/>
					</Box>

					{/* Submit Button */}
					<Button
						variant='contained'
						sx={{mt: 2, alignSelf: "center"}}
						type='submit'
						disabled={loading}
					>
						{loading ? (
							<CircularProgress size={24} />
						) : (
							t("editServices.saveLinks")
						)}
					</Button>
				</Box>
			</Paper>
			<Button
				size='small'
				variant='contained'
				sx={{mb: 2, position: "sticky", top: 80, left: 20, zIndex: 2}}
				onClick={() => navigate(`/service/${vendorId}`)}
			>
				{t("editServices.myservicesPage")}
			</Button>
		</>
	);
};

export default AddVendorSocialMeda;
