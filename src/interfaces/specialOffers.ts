interface ServiceItem {
	featureName: string;
	price: number;
}

export interface FormValues {
	_id?: string;
	vendorId?: string;
	createdAt?: Date;
	title: string;
	services: ServiceItem[];
	images: Array<{url: string; alt: string}>;
	note: string;
}
