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
			`${api}/business/vendor/vendorSubscriptionData/${vendorId}`,
		);
		const subscriptionData = {
			planId: response.data?.planId || "free",
			isSubscribed: response.data?.isSubscribed || false,
			subscriptionDate: response.data?.subscriptionDate || null,
			expiryDate: response.data?.expiryDate || null,
			recommendedServices: response.data?.recommendedServices || false,
		};

		return subscriptionData;
	} catch (error) {
		console.log(error,vendorId);
		
		return {
			planId: "free",
			isSubscribed: false,
			subscriptionDate: null,
			expiryDate: null,
			recommendedServices: false,
		};
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
