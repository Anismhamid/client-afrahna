export interface JwtPayload {
	_id: string;
	name: {
		first: string;
		last: string;
	};
	phone: string;
	email: string;
	role: string;
	profileImage: {
		url: string;
		public_id?: string;
	};
	businessName: string;
	category: string;
	vendorId?: string;
	subscriptionData: {
		isSubscribed?: boolean;
		planId?: string;
		subscriptionDate?: Date;
		expiryDate?: Date;
		recommendedServices: boolean;
	};
}

export interface LoginSchema {
	email: string;
	password: string;
}

export interface UserSchema {
	name: {
		first: string;
		last: string;
	};
	email: string;
	password: string;
	phone: string;
	address: {
		city: string;
		street: string;
	};
}

export interface BusinessUserSchema {
	businessName: string;
	phone: string;
	email: string;
	password: string;
	address: {
		city: string;
		street: string;
	};
	category: string;
}

export interface usersMessages {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface VendorDataResponse {
	_id: string;
	businessName: string;
	phone: string;
	email: string;
	role: string;
	pictures: {url: string; alt: string}[];
	address: {
		city: string;
		street: string;
		_id: string;
	};
	profileImage: {
		url: string;
		public_id?: string;
	};
	vendorId?: string;
	category: string;
	createdAt: Date;
	updatedAt: Date;
	subscriptionData: {
		isSubscribed: boolean;
		planId: string;
		subscriptionDate: Date | null;
		expiryDate: Date | null;
		recommendedServices: boolean;
	};
}
