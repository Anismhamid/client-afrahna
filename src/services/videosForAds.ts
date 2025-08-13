import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}/videos`;

export const uploadVideo = async (
	file: File,
	_: (progressEvent: {loaded: number; total: any}) => void,
) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await axios.post(`${api}/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Upload error:", error);
		throw error;
	}
};

export const getAdsVideos = async () => {
	try {
		const response = await axios.get(`${api}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
