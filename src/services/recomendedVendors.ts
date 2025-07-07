import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}/business/recommended-services`;

export const getRecommendedVendors = async () => {
	try {
		const serviceResponse = await axios.get(api);
		return serviceResponse.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};
