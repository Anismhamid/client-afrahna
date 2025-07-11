// Base interfaces for reusability
interface Name {
	first: string;
	last: string;
}

interface Address {
	city: string;
	street: string;
	_id?: string;
}

interface ProfileImage {
	url: string;
	public_id?: string;
}

export interface SubscriptionData {
	isSubscribed: boolean;
	planId?: string;
	subscriptionDate?: Date | null;
	expiryDate?: Date | null;
	recommendedServices: boolean;
}

// Main interfaces
export interface JwtPayload {
	_id: string;
	name: Name;
	phone: string;
	email: string;
	role: string;
	profileImage: ProfileImage;
	businessName: string;
	category: string;
	vendorId?: string;
	subscriptionData: SubscriptionData;
}

export interface LoginSchema {
	email: string;
	password: string;
}

export interface UserSchema {
	name: Name;
	email: string;
	password: string;
	phone: string;
	address: Address;
}

export interface BusinessUserSchema extends Omit<UserSchema, "name"> {
	businessName: string;
	category: string;
	subscribtionData: SubscriptionData;
}

export interface UserMessage {
	name: string;
	email: string;
	subject: string;
	message: string;
	createdAt?: Date; // Optional as it may be added by the server
}

export interface VendorDataResponse {
	_id: string;
	businessName: string;
	phone: string;
	email: string;
	role: string;
	pictures: {
		url: string;
		alt: string;
	}[];
	address: Address;
	profileImage: ProfileImage;
	vendorId?: string;
	category: string;
	createdAt: Date;
	updatedAt: Date;
	subscribtionData: SubscriptionData;
}

// Additional utility types
export type UserRole = "admin" | "isVendor" | "customer";

export interface PaginatedVendorResponse {
	data: VendorDataResponse[];
	total: number;
	page: number;
	limit: number;
}

// For form validation
export interface LoginFormValues extends LoginSchema {
	rememberMe?: boolean;
}

export interface BusinessRegistrationFormValues extends BusinessUserSchema {
	confirmPassword: string;
	termsAccepted: boolean;
}
