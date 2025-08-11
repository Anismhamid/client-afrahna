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

export interface VendorService {
	businessName: string;
	email: string;
	phone: string;
	category: string;
	images: {url: string; alt: string}[];
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
	address: {city: string; street: string};
	availableDates: Date[];
	services: Service[];
	vendorId: string;
	planId?: string;
	maxBookingsPerDay: number;
	allowOverlappingBookings: boolean;
	bookingDurationInHours: number;
	bookingType: "single" | "multiple";
	workingHours: WorkingHoursType;
}

interface ServiceData {
	service: VendorService | null;
	unavailableDates: Date[];
	vendorId: string;
	visibleServices: Service[];
	loading: boolean;
	error: Error | null;
	businessAddress: {lat: number; lng: number};
	SubscriptionData: SubscriptionData | null;
	vendorProfile: VendorDataResponse | null;
}

const initialServiceData: ServiceData = {
	service: null,
	unavailableDates: [],
	vendorId: "",
	visibleServices: [],
	loading: true,
	error: null,
	businessAddress: {lat: 0, lng: 0},
	SubscriptionData: null,
	vendorProfile: null,
};

export const useServiceData = (vendorId: string): ServiceData => {
	const [data, setData] = useState<ServiceData>(initialServiceData);

	useEffect(() => {
		if (!vendorId) {
			setData({
				...initialServiceData,
				loading: false,
				error: new Error("Vendor ID is required"),
			});
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
					getVendorData(vendorId).catch(() => {}),
					getVendorSubscriptionPlan(vendorId).catch(() => null),
				]);

				// تحقق من وجود بيانات الخدمة
				const businessData =
					Array.isArray(rawBusinessData) && rawBusinessData.length > 0
						? rawBusinessData[0]
						: rawBusinessData;

				if (!businessData) {
					throw new Error("No service data found for this vendor");
				}

				// العنوان مع fallback آمن
				const businessAddress = {
					city: businessData.address?.city || "",
					street: businessData.address?.street || "",
				};

				// بيانات الملف الشخصي للبائع
				const vendorProfile = Array.isArray(vendorProfileData)
					? vendorProfileData[0]
					: vendorProfileData;

				if (!vendorProfile) {
					throw new Error("Vendor profile not found");
				}

				// بيانات الاشتراك
				const subscriptionData = subscriptionResponse;

				// الحصول على الإحداثيات مع fallback
				const coordinates = await getCoordinates(
					businessAddress.city,
					businessAddress.street,
				).catch(() => ({lat: 0, lng: 0}));

				// الخدمات المرئية حسب خطة الاشتراك
				const visibleServices = getVisibleServices(
					subscriptionData?.planId || "free",
					Array.isArray(businessData.services) ? businessData.services : [],
				);

				// تحويل التواريخ غير المتاحة مع فحص صلاحية التاريخ
				const parsedUnavailableDates = (
					unavailableData?.unavailableDates || []
				).map((date: string | Date) => {
					const parsedDate = new Date(date);
					return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
				});

				setData({
					service: {
						...businessData,
						address: businessAddress,
					},
					unavailableDates: parsedUnavailableDates,
					vendorId,
					visibleServices,
					loading: false,
					error: null,
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
