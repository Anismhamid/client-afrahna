import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {TransitionProps} from "@mui/material/transitions";
import {TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {addVendorService} from "../services/vendorServices";
import {errorToast, successToast} from "./notifications/Toasts";
import {forwardRef, FunctionComponent, ReactElement, Ref} from "react";
import {useTranslation} from "react-i18next";
import changeDirection from "../../locales/directions";

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement<unknown, string>;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction='right' ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
	handleClose: () => void;
	open: boolean;
	userId: string;
	refresh: () => void;
}

const AlertDialogSlide: FunctionComponent<AlertDialogSlideProps> = ({
	handleClose,
	open = false,
	userId,
	refresh,
}) => {
	const {t} = useTranslation();

	const formik = useFormik({
		initialValues: {
			featureName: "",
			price: 0,
		},
		validationSchema: yup.object({
			featureName: yup
				.string()
				.required(t("addNewService.validation.nameRequired")),
			price: yup
				.number()
				.required(t("addNewService.validation.priceRequired"))
				.positive(),
		}),
		onSubmit: (values) => {
			addVendorService(userId, {
				featureName: values.featureName,
				price: values.price,
			})
				.then(() => {
					successToast(t("addNewService.toasts.success"));
					handleClose();
					formik.resetForm();
					refresh();
				})
				.catch((err) => {
					errorToast(err.message || t("addNewService.toasts.error"));
				});
		},
	});

	const dir = changeDirection();

	return (
		<Dialog
			dir={dir}
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby='alert-dialog-slide-description'
		>
			<DialogTitle>{t("addNewService.dialogTitle")}</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						{t("addNewService.description")}
					</DialogContentText>
					<TextField
						fullWidth
						autoFocus
						label={t("addNewService.labels.featureName")}
						name='featureName'
						variant='outlined'
						value={formik.values.featureName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.featureName &&
							Boolean(formik.errors.featureName)
						}
						helperText={
							formik.touched.featureName && formik.errors.featureName
						}
						sx={{
							textAlign: "right",
						}}
					/>
					<TextField
						fullWidth
						label={t("addNewService.labels.price")}
						name='price'
						type='number'
						variant='outlined'
						value={formik.values.price}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.price && Boolean(formik.errors.price)}
						helperText={formik.touched.price && formik.errors.price}
						sx={{textAlign: "right", mt: 2}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						{t("addNewService.buttons.close")}
					</Button>
					<Button
						type='submit'
						variant='contained'
						disabled={formik.isSubmitting}
					>
						<Button onClick={handleClose}>
							{formik.isSubmitting
								? t("addNewService.buttons.adding")
								: t("addNewService.buttons.add")}{" "}
						</Button>
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AlertDialogSlide;
