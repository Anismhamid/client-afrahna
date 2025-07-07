import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}/vendor`;

export const subscriptionToPlans = async (
	vendorId: string,
	data: {isSubscribed: boolean; planId: string},
) => {
	console.log("API URI:", import.meta.env.VITE_API_URI);
	const token = localStorage.getItem("token");
	try {
		const response = await axios.patch(`${api}/business/${vendorId}`, data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return response.data;
	} catch (error: any) {
		console.log(error.response?.message);
		throw error;
	}
};
