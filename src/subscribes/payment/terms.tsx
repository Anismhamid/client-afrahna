import {
	CheckCircle,
	CreditCard,
	Autorenew,
	Security,
	Receipt,
	Help,
} from "@mui/icons-material";

import {useTranslation} from "react-i18next";

export const useTerms = () => {
	const {t} = useTranslation();
	const terms = t("payment.paymentTerms.items", {returnObjects: true}) as {
		title: string;
		content: string;
	}[];

	const icons = [CreditCard, Autorenew, Receipt, Security, CheckCircle, Help];

	return terms.map((term, i) => {
		const IconComponent = icons[i];
		return {
			title: term.title,
			content: term.content,
			icon: IconComponent ? <IconComponent /> : null,
		};
	});
};

// export const terms = [
// 	{
// 		title: "طرق الدفع المقبولة",
// 		icon: <CreditCard />,
// 		content:
// 			"نحن نقبل وسائل الدفع التالية: بطاقات الائتمان (Visa، MasterCard، Mada)، المحافظ الرقمية (Apple Pay، STC Pay)، والتحويل البنكي عند الطلب.",
// 	},
// 	{
// 		title: "الاشتراكات",
// 		icon: <Autorenew />,
// 		content:
// 			"يتم تجديد الاشتراك تلقائيًا في نهاية كل فترة ما لم يتم إلغاؤه قبل 24 ساعة من تاريخ التجديد. يمكن الإلغاء في أي وقت عبر صفحة الحساب.",
// 	},
// 	{
// 		title: "سياسة الاسترداد",
// 		icon: <Receipt />,
// 		content:
// 			"لن يتم استرداد أي مبلغ بعد بدء فترة الاشتراك. يرجى التواصل خلال 7 أيام في حال حدوث خطأ في الدفع. الاسترداد يكون خلال 14 يوم عمل.",
// 	},
// 	{
// 		title: "تأمين معلومات الدفع",
// 		icon: <Security />,
// 		content:
// 			"نستخدم تقنيات تشفير متقدمة (PCI DSS) لضمان أمان معلومات الدفع. لا يتم تخزين بيانات بطاقات الائتمان لدينا ونستخدم بوابات دفع معتمدة.",
// 	},
// 	{
// 		title: "الضرائب والتعديلات",
// 		icon: <CheckCircle />,
// 		content:
// 			"تضاف ضريبة القيمة المضافة (15%) حسب لوائح المملكة. نحتفظ بالحق في تعديل الأسعار مع إخطار مسبق قبل 30 يومًا من التطبيق.",
// 	},
// 	{
// 		title: "الدعم الفني",
// 		icon: <Help />,
// 		content:
// 			"للاستفسارات، راسلنا عبر support@yourdomain.com أو اتصل بنا على 920000000 من الساعة 8 صباحًا حتى 8 مساءً (بتوقيت الرياض).",
// 	},
// ];
