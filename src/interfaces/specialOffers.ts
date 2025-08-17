export interface ServiceItem {
	_id?: string;
	featureName: string;
	price: number;
}

export interface FormValues {
	_id?: string;
	vendorId?: string;
	createdAt?: Date;
	title: string;
	services: ServiceItem[];
	images: {
		_id?: string;
		url: string;
		alt: string;
		createdAt?: Date;
		updatedAt?: Date;
	}[];
	note: string;
	updatedAt?: Date;
	_v?: number;
}
