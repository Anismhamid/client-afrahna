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

export const getVendorSubscriptionPlan = async (): Promise<SubscriptionData> => {
	try {
		const response = await axios.get(
			`${api}/business/vendor/vendorSubscriptionData`,
			{headers: {Authorization: localStorage.getItem("token")}},
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				return {
					planId: "free",
					isSubscribed: false,
					recommendedServices: false,
					subscriptionDate: null,
					expiryDate: null,
				};
			}
		}
		console.log(error);

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
