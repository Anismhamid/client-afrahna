interface ServicePageConfig {
	category: string;
	pageTitle: string;
	metaDescription: string;
	introText: string;
	subCategories?: string[];
	featuredImage?: {
		url: string;
		alt: string;
	};
}

export const servicePagesConfig: Record<string, ServicePageConfig> = {
	hals: {
		category: "قاعات",
		pageTitle: "services.hals.pageTitle",
		metaDescription: "services.hals.metaDescription",
		introText: "services.hals.introText",
	},
	halsDecoration: {
		category: "تزيين قاعات",
		pageTitle: "services.halsDecoration.pageTitle",
		metaDescription: "services.halsDecoration.metaDescription",
		introText: "services.halsDecoration.introText",
	},
	carsDecoration: {
		category: "تزيين سيارات",
		pageTitle: "services.carsDecoration.pageTitle",
		metaDescription: "services.carsDecoration.metaDescription",
		introText: "services.carsDecoration.introText",
	},
	coffeeKiosks: {
		category: "كيوسكات قهوة",
		pageTitle: "services.coffeeKiosks.pageTitle",
		metaDescription: "services.coffeeKiosks.metaDescription",
		introText: "services.coffeeKiosks.introText",
	},
	chairs: {
		category: "كراسي",
		pageTitle: "services.chairs.pageTitle",
		metaDescription: "services.chairs.metaDescription",
		introText: "services.chairs.introText",
	},
	cosmatics: {
		category: "صالونات تجميل",
		pageTitle: "services.cosmatics.category",
		metaDescription: "services.cosmatics.metaDescription",
		introText: "services.cosmatics.introText",
	},
	pastry: {
		category: "حلويات",
		pageTitle: "services.pastry.category",
		metaDescription: "services.pastry.metaDescription",
		introText: "services.pastry.introText",
	},
	frezzer: {
		category: "تأجير برادات",
		pageTitle: "services.frezzer.category",
		metaDescription: "services.frezzer.metaDescription",
		introText: "services.frezzer.introText",
	},
	photography: {
		category: "تصوير",
		pageTitle: "services.photography.category",
		metaDescription: "services.photography.metaDescription",
		introText: "services.photography.introText",
	},
	stereo: {
		category: "ستيريو",
		pageTitle: "services.stereo.category",
		metaDescription: "services.stereo.metaDescription",
		introText: "services.stereo.introText",
	},
	coocks: {
		category: "طباخين",
		pageTitle: "services.coocks.category",
		metaDescription: "services.coocks.metaDescription",
		introText: "services.coocks.introText",
	},
	restaurants: {
		category: "مطاعم للاعراس",
		pageTitle: "services.restaurants.category",
		metaDescription: "services.restaurants.metaDescription",
		introText: "services.restaurants.introText",
	},
	witress: {
		category: "نادلين",
		pageTitle: "services.witress.category",
		metaDescription: "services.witress.metaDescription",
		introText: "services.witress.introText",
	},
	fireWorks: {
		category: "العاب نارية",
		pageTitle: "services.fireWorks.category",
		metaDescription: "services.fireWorks.metaDescription",
		introText: "services.fireWorks.introText",
	},
	invitationCards: {
		category: "بطاقات دعوة",
		pageTitle: "services.invitationCards.category",
		metaDescription: "services.invitationCards.metaDescription",
		introText: "services.invitationCards.introText",
	},
	nuts: {
		category: "مكسرات",
		pageTitle: "services.nuts.category",
		metaDescription: "services.nuts.metaDescription",
		introText: "services.nuts.introText",
	},
	religiousband: {
		category: "فرق دينية",
		pageTitle: "services.religiousband.category",
		metaDescription: "services.religiousband.metaDescription",
		introText: "services.religiousband.introText",
	},
	kidsEntertainment: {
		category: "الهاء الاولاد",
		pageTitle: "services.kidsEntertainment.category",
		metaDescription: "services.kidsEntertainment.metaDescription",
		introText: "services.kidsEntertainment.introText",
	},
	fruitDecoration: {
		category: "services.fruitDecoration.category",
		pageTitle: "services.fruitDecoration.category",
		metaDescription: "services.fruitDecoration.metaDescription",
		introText: "services.fruitDecoration.introText",
	},
	weddinggifts: {
		category: "services.weddinggifts.category",
		pageTitle: "services.weddinggifts.category",
		metaDescription: "services.weddinggifts.metaDescription",
		introText: "services.weddinggifts.introText",
	},
	luxuryCars: {
		category: "services.luxuryCars.category",
		pageTitle: "services.luxuryCars.category",
		metaDescription: "services.luxuryCars.metaDescription",
		introText: "services.luxuryCars.introText",
	},
	dapkaPlatform: {
		category: "services.dapkaPlatform.category",
		pageTitle: "services.dapkaPlatform.category",
		metaDescription: "services.dapkaPlatform.metaDescription",
		introText: "services.dapkaPlatform.introText",
	},
};

export type ServiceKey = keyof typeof servicePagesConfig;
