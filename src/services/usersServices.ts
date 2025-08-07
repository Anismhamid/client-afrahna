import axios from "axios";
import {
	BusinessUserSchema,
	LoginSchema,
	SubscriptionData,
	UserSchema,
} from "../interfaces/userSchema";

const api = `${import.meta.env.VITE_API_URI}`;

// Register customers
export const registerNewUser = async (userData: UserSchema) => {
	try {
		const response = await axios.post(`${api}/users`, userData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error: any) {
		console.log(error);
	}
};

// Register business users
export const newBusinessRegisterUser = async (
	userData: BusinessUserSchema,
): Promise<string> => {
	try {
		const response = await axios.post(`${api}/business`, userData, {
			headers: {"Content-Type": "application/json"},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error;
		} else {
			throw new Error("An unexpected error occurred");
		}
	}
};

// Login
export const userLogin = async (userData: LoginSchema) => {
	const response = await axios.post(`${api}/users/login`, userData, {
		headers: {"Content-Type": "application/json"},
	});
	return response.data;
};

// getUserById
export const getUserById = async (userId: string) => {
	const data = await axios.get(`${api}/users/for-vendors/${userId}`, {
		headers: {Authorization: localStorage.getItem("token")},
	});
	return data.data;
};

export const getVendorSubscriptionPlan = async (
	vendorId: string,
): Promise<SubscriptionData> => {
	try {
		const response = await axios.get(
			`${api}/business/vendorSubscriptionData/${vendorId}`,
			{headers: {Authorization: localStorage.getItem("token")}},
		);
		const subscriptionData = {
			planId: response.data.subscriptionData?.planId || "free",
			isSubscribed: response.data.subscriptionData?.isSubscribed || false,
			subscriptionDate: response.data.subscriptionData?.subscriptionDate || null,
			expiryDate: response.data.subscriptionData?.expiryDate || null,
			recommendedServices:
				response.data.subscriptionData?.recommendedServices || false,
		};
		console.log(subscriptionData);

		return subscriptionData;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return {
				planId: "free",
				isSubscribed: false,
				subscriptionDate: null,
				expiryDate: null,
				recommendedServices: false,
			};
		}
		console.error("Error fetching vendor subscription:", error);
		throw error;
	}
};

export const getAllUsers = async () => {
	try {
		const response = await axios.get(`${api}/users/customers`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
