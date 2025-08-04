export interface Feature {
	text: string;
	included: boolean;
	tooltip?: string;
}

export interface SubscriptionPlan {
	id: string;
	name: string;
	price: string;
	description: string;
	features: Feature[];
	recommended?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
	{
		id: "free",
		name: "subscriptionPlans.free.name",
		price: "subscriptionPlans.free.price",
		description: "subscriptionPlans.free.description",
		features: [
			{text: "subscriptionPlans.free.features.pageIntro", included: true},
			{text: "subscriptionPlans.free.features.oneImage", included: true},
			{text: "subscriptionPlans.free.features.oneSubService", included: true},
			{text: "subscriptionPlans.free.features.appearance", included: true},
			{
				text: "subscriptionPlans.free.features.analytics",
				included: false,
				tooltip: "subscriptionPlans.free.features.analyticsTooltip",
			},
			{
				text: "subscriptionPlans.free.features.support",
				included: false,
				tooltip: "subscriptionPlans.free.features.supportTooltip",
			},
		],
	},
	{
		id: "basic",
		name: "subscriptionPlans.basic.name",
		price: "subscriptionPlans.basic.price",
		description: "subscriptionPlans.basic.description",
		features: [
			{
				text: "subscriptionPlans.basic.features.fiveHighQualityImages",
				included: true,
			},
			{text: "subscriptionPlans.basic.features.sixSubServices", included: true},
			{
				text: "subscriptionPlans.basic.features.improvedSearchAppearance",
				included: true,
			},
			{
				text: "subscriptionPlans.basic.features.customerInquiries",
				included: true,
			},
			{text: "subscriptionPlans.basic.features.basicStats", included: true},
			{text: "subscriptionPlans.basic.features.emailSupport", included: true},
			{
				text: "subscriptionPlans.basic.features.bookingSystem",
				included: false,
				tooltip: "subscriptionPlans.basic.features.bookingSystemTooltip",
			},
		],
	},
	{
		id: "gold",
		name: "subscriptionPlans.gold.name",
		price: "subscriptionPlans.gold.price",
		description: "subscriptionPlans.gold.description",
		features: [
			{text: "subscriptionPlans.gold.features.professionalPage", included: true},
			{text: "subscriptionPlans.gold.features.unlimitedImages", included: true},
			{text: "subscriptionPlans.gold.features.upTo40Videos", included: true},
			{
				text: "subscriptionPlans.gold.features.unlimitedSubServices",
				included: true,
			},
			{text: "subscriptionPlans.gold.features.recommendedBadge", included: true},
			{
				text: "subscriptionPlans.gold.features.multipleContactChannels",
				included: true,
			},
			{
				text: "subscriptionPlans.gold.features.advancedAnalytics",
				included: true,
			},
			{
				text: "subscriptionPlans.gold.features.integratedBookingSystem",
				included: true,
			},
			{text: "subscriptionPlans.gold.features.fastSupport", included: true},
			{
				text: "subscriptionPlans.gold.features.instagramTiktokEmbed",
				included: true,
			},
			{
				text: "subscriptionPlans.gold.features.automaticAds",
				included: false,
				tooltip: "subscriptionPlans.gold.features.automaticAdsTooltip",
			},
		],
		recommended: true,
	},
	{
		id: "premium",
		name: "subscriptionPlans.premium.name",
		price: "subscriptionPlans.premium.price",
		description: "subscriptionPlans.premium.description",
		features: [
			{
				text: "subscriptionPlans.premium.features.professionalPage",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.unlimitedImages",
				included: true,
			},
			{text: "subscriptionPlans.premium.features.upTo60Videos", included: true},
			{
				text: "subscriptionPlans.premium.features.unlimitedSubServices",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.recommendedBadge",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.multipleContactChannels",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.advancedAnalytics",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.integratedBookingSystem",
				included: true,
			},
			{text: "subscriptionPlans.premium.features.fastSupport", included: true},
			{
				text: "subscriptionPlans.premium.features.instagramTiktokEmbed",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.automaticAdsHome",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.permanentHomeAppearance",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.customMonthlyReports",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.prioritySupport",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.trustedProviderBadge",
				included: true,
			},
			{
				text: "subscriptionPlans.premium.features.multiAccountManagement",
				included: false,
				tooltip:
					"subscriptionPlans.premium.features.multiAccountManagementTooltip",
			},
		],
	},
	{
		id: "enterprise",
		name: "subscriptionPlans.enterprise.name",
		price: "subscriptionPlans.enterprise.price",
		description: "subscriptionPlans.enterprise.description",
		features: [
			{
				text: "subscriptionPlans.enterprise.features.professionalPage",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.unlimitedImages",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.upTo20Videos",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.unlimitedSubServices",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.recommendedBadge",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.multipleContactChannels",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.advancedAnalytics",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.integratedBookingSystem",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.fastSupport",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.instagramTiktokEmbed",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.automaticAdsHome",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.permanentHomeAppearance",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.customMonthlyReports",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.prioritySupport",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.trustedProviderBadge",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.multiAccountSiteManagement",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.customIntegration",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.dedicatedAccountManager",
				included: true,
			},
			{text: "subscriptionPlans.enterprise.features.support247", included: true},
			{
				text: "subscriptionPlans.enterprise.features.trainingWorkshops",
				included: true,
			},
			{
				text: "subscriptionPlans.enterprise.features.customMarketingStrategies",
				included: true,
			},
		],
	},
];
// [
// 	{
// 		id: "free",
// 		name: "الباقة التجريبية",
// 		price: "مجاني للأبد",
// 		features: [
// 			{text: "صفحة تعريفية", included: true},
// 			{text: "عرض صورة واحده", included: true},
// 			{text: "عرض خدمه فرعيه واحدة", included: true},
// 			{text: "ظهور في دليل الخدمات", included: true},
// 			{
// 				text: "إحصاءات أو تحليلات",
// 				included: false,
// 				tooltip: "متاح فقط في الباقات المدفوعة",
// 			},
// 			{
// 				text: "دعم فني مباشر",
// 				included: false,
// 				tooltip: "متاح فقط في الباقات المدفوعة",
// 			},
// 		],
// 		description: "الحل الأمثل للبدء بعرض خدمتك بشكل أساسي",
// 	},
// 	{
// 		id: "basic",
// 		name: "الباقة الفضية",
// 		price: "59 شيكل/شهر",
// 		features: [
// 			{text: "عرض 5 صور عالية الجودة", included: true},
// 			{text: "عرض 6 خدمات فرعية مفصلة", included: true},
// 			{text: "ظهور محسن في نتائج البحث", included: true},
// 			{text: "استفسارات العملاء عبر الهاتف والبريد", included: true},
// 			{text: "إحصاءات مشاهدات أساسية", included: true},
// 			{text: "دعم عبر البريد خلال أيام العمل", included: true},
// 			// {text: "ربط حسابات التواصل الاجتماعي", included: true},
// 			{
// 				text: "نظام حجز مواعيد",
// 				included: false,
// 				tooltip: "متاح في الباقة الذهبية فما فوق",
// 			},
// 		],
// 		description: "للأعمال الصغيرة التي تريد تطوير وجودها الرقمي",
// 	},
// 	{
// 		id: "gold",
// 		name: "الباقة الذهبية",
// 		price: "99 شيكل/شهر",
// 		features: [
// 			{text: "صفحة احترافية مخصصة مع الشعار", included: true},
// 			{text: "صور غير محدودة", included: true},
// 			{text: "إضافة حتى 40 فيديو", included: true},
// 			{text: "خدمات فرعية غير محدودة", included: true},
// 			{text: "شارة 'موصى به'", included: true},
// 			{text: "قنوات تواصل متعددة", included: true},
// 			{text: "تحليلات متقدمة لأداء الصفحة", included: true},
// 			{text: "نظام إدارة مواعيد متكامل", included: true},
// 			{text: "دعم سريع على الهاتف والبريد", included: true},
// 			{text: "تضمين مقاطع إنستغرام وتيك توك", included: true},
// 			{
// 				text: "إعلانات تلقائية",
// 				included: false,
// 				tooltip: "متاحة في الباقة الماسية",
// 			},
// 		],
// 		recommended: true,
// 		description: "الحل الشامل للعروض الاحترافية والتميز في السوق",
// 	},
// 	{
// 		id: "premium",
// 		name: "الباقة الماسية",
// 		price: "189 شيكل/شهر",
// 		features: [
// 			{text: "صفحة احترافية مخصصة مع الشعار", included: true},
// 			{text: "صور غير محدودة", included: true},
// 			{text: "إضافة حتى 60 فيديو", included: true},
// 			{text: "خدمات فرعية غير محدودة", included: true},
// 			{text: "شارة 'موصى به'", included: true},
// 			{text: "قنوات تواصل متعددة", included: true},
// 			{text: "تحليلات متقدمة لأداء الصفحة", included: true},
// 			{text: "نظام إدارة مواعيد متكامل", included: true},
// 			{text: "دعم سريع على الهاتف والبريد", included: true},
// 			{text: "تضمين مقاطع إنستغرام وتيك توك", included: true},

// 			{text: "إعلانات تلقائية في الصفحة الرئيسية", included: true},
// 			{text: "ظهور دائم في الصفحة الرئيسية", included: true},
// 			{text: "تقارير أداء شهرية مخصصة", included: true},
// 			{text: "دعم فني فوري بأولوية عليا", included: true},
// 			{text: "شهادة 'مزود موثوق' ووسام تميز", included: true},
// 			{
// 				text: "إدارة متعددة للحسابات",
// 				included: false,
// 				tooltip: "متاحة في باقة المؤسسات",
// 			},
// 		],
// 		description: "للأعمال الرائدة التي تريد التميز والظهور الدائم",
// 	},
// 	{
// 		id: "enterprise",
// 		name: "باقة المؤسسات والوكالات 🌐",
// 		price: "تواصل معنا",
// 		features: [
// 			{text: "صفحة احترافية مخصصة مع الشعار", included: true},
// 			{text: "صور غير محدودة", included: true},
// 			{text: "إضافة حتى 20 فيديو", included: true},
// 			{text: "خدمات فرعية غير محدودة", included: true},
// 			{text: "شارة 'موصى به'", included: true},
// 			{text: "قنوات تواصل متعددة", included: true},
// 			{text: "تحليلات متقدمة لأداء الصفحة", included: true},
// 			{text: "نظام إدارة مواعيد متكامل", included: true},
// 			{text: "دعم سريع على الهاتف والبريد", included: true},
// 			{text: "تضمين مقاطع إنستغرام وتيك توك", included: true},

// 			{text: "إعلانات تلقائية في الصفحة الرئيسية", included: true},
// 			{text: "ظهور دائم في الصفحة الرئيسية", included: true},
// 			{text: "تقارير أداء شهرية مخصصة", included: true},
// 			{text: "دعم فني فوري بأولوية عليا", included: true},
// 			{text: "شهادة 'مزود موثوق' ووسام تميز", included: true},
// 			{text: "إدارة متعددة للحسابات والمواقع", included: true},
// 			{text: "تكامل مخصص مع أنظمة خارجية", included: true},
// 			{text: "مدير حساب مخصص", included: true},
// 			{text: "دعم فني مباشر 24/7", included: true},
// 			{text: "تدريب وورش عمل للفريق", included: true},
// 			{text: "استراتيجيات تسويق مخصصة", included: true},
// 		],
// 		description: "حلول متكاملة للشركات الكبيرة والوكالات",
// 	},
// ];
