import axios from "axios";
import {BookingData} from "../interfaces/booking";

const api = `${import.meta.env.VITE_API_URI}/bookings`;

// create new book
export const newbooking = async ({
	date,
	services,
	businessName,
	note,
	vendorId,
}: {
	date: string;
	services: {featureName: string; price: number}[];
	businessName: string;
	note: string;
	vendorId: string;
}): Promise<BookingData[] | null> => {
	try {
		const token = localStorage.getItem("token");

		const response = await axios.post(
			api,
			{
				date,
				services,
				businessName,
				note,
				vendorId,
			},
			{
				headers: {
					Authorization: token,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const myBookings = async (userId: string): Promise<BookingData[]> => {
	try {
		const myBooks = await axios.get(`${api}/my-books/${userId}`);
		return myBooks.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getVendorsBooks = async (vendorId: string): Promise<BookingData[]> => {
	try {
		const vendorsBooks = await axios.get(`${api}/vendor/${vendorId}`);
		return vendorsBooks.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const deleteBookById = async (bookId: string) => {
	try {
		const res = await axios.delete(`${api}/${bookId}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteCustomerBookById = async (bookId: string) => {
	try {
		const res = await axios.delete(`${api}/customer/${bookId}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
