import {useState, useEffect} from "react";
import {getCoordinates} from "../atoms/map/OpenStreetMap";
import {getVisibleServices} from "../subscribes/subscribtionTypes/subscriptionUtils";
import {VendorDataResponse, SubscriptionData} from "../interfaces/userSchema";
import {getVendorSubscriptionPlan} from "../services/usersServices";
import {getVendorData} from "../services/vendorServices";
import {getServiceByVendorId, getUnavailableDates} from "../services/vendorsServices";

interface Service {
	id?: string;
	featureName: string;
	price: number;
}

interface WorkingHoursType {
	sunday: {from: string; to: string; closed: false};
	monday: {from: string; to: string; closed: false};
	tuesday: {from: string; to: string; closed: false};
	wednesday: {from: string; to: string; closed: false};
	thursday: {from: string; to: string; closed: false};
	friday: {from: string; to: string; closed: false};
	saturday: {from: string; to: string; closed: false};
}

const defaultWorkingHours: WorkingHoursType = {
	sunday: {from: "", to: "", closed: false},
	monday: {from: "", to: "", closed: false},
	tuesday: {from: "", to: "", closed: false},
	wednesday: {from: "", to: "", closed: false},
	thursday: {from: "", to: "", closed: false},
	friday: {from: "", to: "", closed: false},
	saturday: {from: "", to: "", closed: false},
};

export interface VendorService {
	businessName: string;
	email: string;
	phone: string;
	category: string;
	images: {url: string; alt: string}[];
	description: string;
	priceType: string;
	price: {min: number; max: number};
	address: {city: string; street: string};
	availableDates: Date[];
	services: Service[];
	vendorId: string;
	planeId?: string;
	maxBookingsPerDay: number;
	allowOverlappingBookings: boolean;
	bookingDurationInHours: number;
	bookingType: "single" | "multiple";
	workingHours: WorkingHoursType;
	//  Record<string, {from: string; to: string; closed: boolean}>;
}

interface ServiceData {
	service: VendorService;
	unavailableDates: Date[];
	vendorId: string;
	visibleServices: Service[];
	loading: boolean;
	error: Error | null;
	planId: string;
	businessAddress: {lat: number; lng: number};
	SubscriptionData: SubscriptionData;
	vendorProfile: VendorDataResponse | null;
}

const initialServiceData: ServiceData = {
	service: {
		businessName: "",
		email: "",
		phone: "",
		category: "",
		images: [],
		description: "",
		priceType: "",
		price: {min: 0, max: 0},
		address: {city: "", street: ""},
		availableDates: [],
		services: [],
		vendorId: "",
		maxBookingsPerDay: 0,
		allowOverlappingBookings: false,
		bookingDurationInHours: 1,
		bookingType: "single",
		workingHours: defaultWorkingHours,
	},
	unavailableDates: [],
	vendorId: "",
	visibleServices: [],
	loading: true,
	error: null,
	planId: "free",
	businessAddress: {lat: 0, lng: 0},
	SubscriptionData: {
		isSubscribed: false,
		planId: "free",
		recommendedServices: false,
	},
	vendorProfile: null,
};

export const useServiceData = (vendorId: string): ServiceData => {
	const [data, setData] = useState<ServiceData>(initialServiceData);

	useEffect(() => {
		if (!vendorId) {
			setData((prev) => ({
				...prev,
				loading: false,
				error: new Error("Vendor ID is required"),
			}));
			return;
		}

		const loadData = async () => {
			try {
				setData((prev) => ({...prev, loading: true, error: null}));

				const [
					rawBusinessData,
					unavailableData,
					vendorProfileData,
					subscriptionResponse,
				] = await Promise.all([
					getServiceByVendorId(vendorId).catch(() => null),
					getUnavailableDates(vendorId).catch(() => ({unavailableDates: []})),
					getVendorData(vendorId).catch(() => null),
					getVendorSubscriptionPlan(vendorId).catch(() => ({
						subscriptionData: {planId: "free", isSubscribed: false},
					})),
				]);

				// Normalize in case response is array
				const businessData =
					Array.isArray(rawBusinessData) && rawBusinessData.length > 0
						? rawBusinessData[0]
						: rawBusinessData;

				if (
					!businessData ||
					typeof businessData !== "object" ||
					!businessData.vendorId
				) {
					throw new Error("No service data found for this vendor");
				}

				// Normalize address data
				const businessAddress = {
					city: businessData.address?.city || "",
					street: businessData.address?.street || "",
				};

				// Handle vendor profile data
				const vendorProfile = Array.isArray(vendorProfileData)
					? vendorProfileData[0]
					: vendorProfileData;

				if (!vendorProfile) {
					throw new Error("Vendor profile not found");
				}

				// Merge subscription data
				const subscriptionData: SubscriptionData = {
					isSubscribed: false,
					planId: "free",
					recommendedServices: false,
					...(subscriptionResponse?.subscriptionData || {}),
					...(vendorProfile?.subscriptionData || {}),
				};

				const effectivePlanId = subscriptionData.planId || "free";

				// Get coordinates with fallback
				const coordinates = await getCoordinates(
					businessAddress.city,
					businessAddress.street,
				).catch(() => ({lat: 0, lng: 0}));

				// Handle visible services
				const visibleServices = getVisibleServices(
					effectivePlanId,
					businessData.services || [],
				);

				// Parse unavailable dates safely
				const parsedUnavailableDates = (
					unavailableData?.unavailableDates || []
				).map((date: string | Date) => {
					const parsedDate = new Date(date);
					return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
				});

				setData({
					service: {
						...initialServiceData.service,
						...businessData,
						address: businessAddress,
					},
					unavailableDates: parsedUnavailableDates,
					vendorId,
					visibleServices,
					loading: false,
					error: null,
					planId: effectivePlanId,
					businessAddress: coordinates,
					SubscriptionData: subscriptionData,
					vendorProfile,
				});
			} catch (error: any) {
				console.error("Error fetching service data:", error);
				setData({
					...initialServiceData,
					loading: false,
					error: error instanceof Error ? error : new Error("Unknown error"),
					vendorId,
				});
			}
		};

		loadData();
	}, [vendorId]);

	return data;
};
