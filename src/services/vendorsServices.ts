import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}`;

export const getAllService = async () => {
	try {
		const allService = await axios.get(`${api}/services`);
		return allService.data;
	} catch (error) {
		console.log(error);
	}
};

export const getServiceByVendorId = async (vendorId: string) => {
	try {
		const res = await axios.get(`${api}/services/vendor/${vendorId}`);

		// הגנה: אם מחזיר מערך ריק, מחזיר null
		if (Array.isArray(res.data) && res.data.length === 0) {
			return null;
		}

		return res.data;
	} catch (error) {
		console.error("Error in getServiceByVendorId:", error);
		return null;
	}
};

export const getServiceByCategories = async (category: string) => {
	try {
		console.log(category);

		const services = await axios.get(`${api}/services/by-category/${category}`);
		return services.data;
	} catch (error) {
		console.log(error);
	}
};

export const getUnavailableDates = async (
	vendorId: string,
): Promise<{
	unavailableDates: string[];
}> => {
	try {
		const response = await axios.get(`${api}/bookings/${vendorId}`);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch unavailable dates:", error);
		return {
			unavailableDates: [],
		};
	}
};

// Add vendor pictures
export const addVendorPicture = async (
	vendorId: string,
	image: {url: string; alt: string},
) => {
	try {
		const res = await axios.post(`${api}/services/picture/${vendorId}`, image, {
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
