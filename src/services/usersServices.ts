import axios from "axios";
import {BusinessUserSchema, LoginSchema, UserSchema} from "../interfaces/userSchema";

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
export const newBusinessRegisterUser = async (userData: BusinessUserSchema) => {
	try {
		const response = await axios.post(`${api}/business`, userData, {
			headers: {"Content-Type": "application/json"},
		});
		return response.data;
	} catch (error) {
		console.log(error);
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

export const getVendorSubscriptionPlan = async (vendorId: string) => {
  try {
    const response = await axios.get(
		`${api}/business/vendor/vendorSubscriptionData/${vendorId}`,
	);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          planId: "free",
          isSubscribed: false,
          recommendedServices: false
        };
      }
    }
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
