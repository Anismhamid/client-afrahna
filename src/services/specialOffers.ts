import axios from "axios";
import {FormValues} from "../interfaces/specialOffers";

const api = `${import.meta.env.VITE_API_URI}/special-offers`;

interface OfferPost {}

export const createNewOffer = async (offerPost: OfferPost) => {
	try {
		const res = await axios.post(api, offerPost, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getAllOffers = async () => {
	try {
		const res = await axios.get(api);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getSpecialOfferById = async (offerId: string) => {
	try {
		const res = await axios.get(`${api}/${offerId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getVendorSpecialOffers = async (offerId: string) => {
	try {
		const res = await axios.get(`${api}/vendors/${offerId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateSpecialOfferById = async (offerId: string, newUpdate: FormValues) => {
	try {
		const res = await axios.put(`${api}/${offerId}`, newUpdate, {
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteAnSpecialOffer = async (offerId: string) => {
	try {
		const res = await axios.delete(`${api}/${offerId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
