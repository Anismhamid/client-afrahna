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
		const vendor = await axios.get(`${api}/services/vendor/${vendorId}`);
		return vendor.data;
	} catch (error) {
		console.log(error);
	}
};

export const getServiceByCategories = async (category: string) => {
	try {
		const allHalls = await axios.get(`${api}/services/by-category/${category}`);
		return allHalls.data;
	} catch (error) {
		console.log(error);
	}
};

// get Spicific Halls decoration for vendors
// export const getHalsDecorationForSpicificUser = async (userId: string) => {
// 	try {
// 		const spicificHals = await axios.get(`${api}/services/${userId}`, {
// 			headers: {Authorization: localStorage.getItem("token")},
// 		});
// 		return spicificHals.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

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
		const res = await axios.post(
			`${api}/services/picture/${vendorId}`,
			image,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("token"),
				},
			},
		);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};


