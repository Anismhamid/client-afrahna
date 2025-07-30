import {Box, Button, TextField, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import {FormikValues, useFormik} from "formik";
import * as yup from "yup";
import {successToast} from "../../atoms/notifications/Toasts";
import {UserMessage} from "../../interfaces/userSchema";
import {useTranslation} from "react-i18next";

interface ContactUsProps {}

const ContactUs: FunctionComponent<ContactUsProps> = () => {
	const {t} = useTranslation();
	const formik: FormikValues = useFormik<UserMessage>({
		initialValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
		validationSchema: yup.object({
			name: yup.string().required(t("contactUs.validation.nameRequired")),
			email: yup
				.string()
				.email(t("contactUs.validation.invalidEmail"))
				.required(t("contactUs.validation.emailRequired")),
			subject: yup.string().required(t("validation.subjectRequired")),
			message: yup
				.string()
				.required(t("contactUs.validation.messageRequired"))
				.max(500, t("contactUs.validation.messageMax")),
		}),
		onSubmit: (values, {resetForm}) => {
			console.log("Form submitted:", values);
			successToast("تم إرسال رسالتك بنجاح!");
			resetForm();
		},
	});

	return (
		<Box component='main' sx={{py: 4}}>
			<Box sx={{maxWidth: "600px", mx: "auto", px: 2}}>
				<Typography variant='h4' textAlign='center' mb={3} fontWeight='bold'>
					{t("contactUs.title")}
				</Typography>

				<Typography
					variant='body1'
					textAlign='center'
					mb={4}
					color='text.secondary'
				>
					{t("contactUs.subtitle")}
				</Typography>

				<Box
					component='form'
					onSubmit={formik.handleSubmit}
					sx={{
						backgroundColor: "background.paper",
						p: 4,
						borderRadius: 2,
						boxShadow: 1,
					}}
				>
					<TextField
						fullWidth
						label={t("contactUs.fields.name")}
						name='name'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
						sx={{mb: 3, textAlign: "right"}}
					/>

					<TextField
						fullWidth
						label={t("contactUs.fields.email")}
						name='email'
						type='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						sx={{mb: 3, textAlign: "right"}}
					/>

					<TextField
						fullWidth
						label={t("contactUs.fields.subject")}
						name='subject'
						value={formik.values.subject}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.subject && Boolean(formik.errors.subject)}
						helperText={formik.touched.subject && formik.errors.subject}
						sx={{mb: 3, textAlign: "right"}}
					/>

					<TextField
						fullWidth
						label={t("contactUs.fields.message")}
						name='message'
						multiline
						rows={4}
						value={formik.values.message}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.message && Boolean(formik.errors.message)}
						helperText={formik.touched.message && formik.errors.message}
						inputProps={{maxLength: 500}}
						sx={{mb: 3, textAlign: "right"}}
					/>

					<Button
						type='submit'
						variant='contained'
						fullWidth
						size='large'
						disabled={formik.isSubmitting}
					>
						{t("contactUs.submit")}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default ContactUs;
