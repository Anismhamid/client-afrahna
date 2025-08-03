export interface Address {
	city: string;
	street: string;
	lat?: number;
	lng?: number;
}

export interface Services {
	businessName: string;
	email: string;
	phone: string;
	category: string;
	images?: {url: string; alt: string; _id?: string}[];
	socialMediaLinks: {
		facebook: string;
		instagram: string;
		tikTok: string;
		x: string;
		youtube: string;
	};
	description: string;
	priceType: string;
	price: {min: number; max: number};
	address: Address;
	availableDates: Date[];
	services: {
		id?: string;
		featureName: string;
		price: number;
	}[];
	vendorId: string;
	_id?: string;
	planeId?: string;
	maxBookingsPerDay: number;
	allowOverlappingBookings: boolean;
	bookingDurationInHours: number;
	bookingType: string;
	workingHours: {
		sunday: {from: string; to: string; closed: boolean};
		monday: {from: string; to: string; closed: boolean};
		tuesday: {from: string; to: string; closed: boolean};
		wednesday: {from: string; to: string; closed: boolean};
		thursday: {from: string; to: string; closed: boolean};
		friday: {from?: string; to?: string; closed: boolean};
		saturday: {from?: string; to?: string; closed: boolean};
	};
}

export const vendorsServicesInitionalData = {
	businessName: "",
	email: "",
	phone: "",
	category: "",
	images: [],
		socialMediaLinks: {
		facebook: "",
		instagram: "",
		tikTok: "",
		x: "",
		youtube: "",
	},
	description: "",
	priceType: "",
	price: {
		min: 0,
		max: 0,
	},
	address: {
		city: "",
		street: "",
	},
	availableDates: [],
	services: [],
	vendorId: "",
	maxBookingsPerDay: 1,
	allowOverlappingBookings: false,
	bookingDurationInHours: 1,
	bookingType: "daily",
	workingHours: {
		sunday: {from: "", to: "", closed: false},
		monday: {from: "", to: "", closed: false},
		tuesday: {from: "", to: "", closed: false},
		wednesday: {from: "", to: "", closed: false},
		thursday: {from: "", to: "", closed: false},
		friday: {from: "", to: "", closed: false},
		saturday: {from: "", to: "", closed: false},
	},
	planeId: "",
};
