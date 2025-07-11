import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}`;

export const subscriptionToPlans = async (vendorId: string, subscriptionData: any) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.patch(
			`${api}/business/vendor/subscribe/${vendorId}`,
			subscriptionData,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		return response.data;
	} catch (error: any) {
		if (error.response) {
			// שגיאה מהשרת עם קוד סטטוס ותגובה
			console.error(
				"Server responded with error:",
				error.response.status,
				error.response.data,
			);
			throw new Error(error.response.data || "Server error");
		} else if (error.request) {
			// הבקשה נשלחה אך לא התקבלה תגובה
			console.error("No response received:", error.request);
			throw new Error("No response from server");
		} else {
			// שגיאה בהגדרת הבקשה
			console.error("Error setting up request:", error.message);
			throw new Error(error.message);
		}
	}
};
