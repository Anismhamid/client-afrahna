import axios from "axios";

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
