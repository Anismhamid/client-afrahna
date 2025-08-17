import * as yup from "yup";

export const specialOffersFormikInitialValues = {
	title: "",
	services: [{featureName: "", price: 0}],
	images: [{url: "", alt: ""}],
	note: "",
};

export const specialOffersValidationSchema = yup.object({
	title: yup.string().required("Title is required"),
	services: yup.array().of(
		yup.object({
			featureName: yup.string().required("Feature name is required"),
			price: yup
				.number()
				.required("Price is required")
				.min(0, "Price must be >= 0"),
		}),
	),
	images: yup.array().of(
		yup
			.object({
				url: yup.string().url("Invalid URL").nullable(),
				alt: yup.string(),
			}),
	),
	note: yup.string(),
});
