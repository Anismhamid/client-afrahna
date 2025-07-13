import axios from "axios";

export const getCoordinates = async (
	city: string,
	street: string,
): Promise<{lat: number; lng: number}> => {
	const addressQuery = [street, city, "Israel"].filter(Boolean).join(", ");

	try {
		const response = await axios.get("https://nominatim.openstreetmap.org/search", {
			params: {
				format: "json",
				q: addressQuery,
				countrycodes: "il",
				"accept-language": "ar",
			},
		});

		const data = response.data;

		if (data.length > 0) {
			return {
				lat: parseFloat(data[0].lat),
				lng: parseFloat(data[0].lon),
			};
		}

		// ניסיון חוזר עם שם עיר בלבד
		const fallbackResponse = await axios.get(
			"https://nominatim.openstreetmap.org/search",
			{
				params: {
					format: "json",
					q: `${city}, Israel`,
					countrycodes: "il",
					"accept-language": "he",
				},
			},
		);

		const fallbackData = fallbackResponse.data;

		if (fallbackData.length > 0) {
			return {
				lat: parseFloat(fallbackData[0].lat),
				lng: parseFloat(fallbackData[0].lon),
			};
		}

		throw new Error("Location not found");
	} catch (error) {
		console.error("Geocoding error:", error);
		throw error;
	}
};
