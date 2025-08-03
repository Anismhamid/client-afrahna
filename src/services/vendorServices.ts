import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}`;

// create new service for spicific vendor
export const addVendorService = async (
	vendorId: string,
	data: {featureName: string; price: number},
) => {
	try {
		const service = await axios.post(`${api}/services/${vendorId}`, data, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return service.data;
	} catch (error) {
		console.log(error);
	}
};

// gell all services for spicific vendor
export const getVendorData = async (vendorId: string) => {
	try {
		const service = await axios.get(`${api}/services/vendor/${vendorId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return service.data;
	} catch (error) {
		console.log(error);
	}
};

// update spicific vendor data
export const updateVendorServices = async (vendorId: string, newService: any) => {
	try {
		const service = await axios.put(`${api}/services/${vendorId}`, newService, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return service.data;
	} catch (error) {
		console.log(error);
	}
};

// remove exist service from spicific vendor
export const removeVendorService = async (vendorId: string, serviceId: string) => {
	try {
		const service = await axios.delete(`${api}/services/${vendorId}/${serviceId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return service.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getAllVendors = async () => {
	try {
		const response = await axios.get(`${api}/business/vendors`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// get vendor by id fo admin
export const getVendorbyId = async (vendorId: string) => {
	try {
		const response = await axios.get(`${api}/business/vendors/${vendorId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// שירות API
export const addSocialMediaLinks = async (
	vendorId:string,
	socialMediaLinks: {
		facebook: string;
		instagram: string;
		tikTok: string;
		x: string;
		youtube: string;
	},
) => {
	try {
		const token = localStorage.getItem("token");
		if (!token) throw new Error("No token available");

		const response = await axios.put(
			`${api}/services/social-links/${vendorId}`,
			{socialMediaLinks},
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
