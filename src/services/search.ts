// import axios from "axios";

// const api = `${import.meta.env.VITE_API_URI}/search`;


// interface SearchParams {
// 	q?: string;
// 	category?: string;
// 	location?: string;
// 	price?: string; // "100-500", "300+"
// 	page?: number;
// 	limit?: number;
// }

// interface SearchResult<T> {
// 	success: boolean;
// 	count: number;
// 	total: number;
// 	page: number;
// 	pages: number;
// 	data: T[];
// }

// export const searchServices = async (
// 	params: SearchParams,
// ): Promise<SearchResult<any>> => {
// 	try {
// 		const response = await axios.get<SearchResult<any>>(`${api}/search-service`, {
// 			params,
// 		});
// 		return response.data;
// 	} catch (error: any) {
// 		console.error("API search error:", error);
// 		throw new Error(error.response?.data?.message || "comming soon");
// 	}
// };
