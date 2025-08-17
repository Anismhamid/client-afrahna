// 🎨 צבע רקע לפי מזהה המנוי
export const subscriptionColor = (planId: string): string => {
	const colors: Record<string, string> = {
		free: "#94a3b8",
		basic: "#60a5fa", // silver
		gold: "#f59e0b", // gold
		premium: "linear-gradient(135deg, #a855f7, #d946ef)", // purple
		enterprise: "#1e40af", // blue
	};

	return colors[planId] ?? "#00000029";
};


// how many services are displayed per plan
export const getVisibleServices = (
	planId: string,
	services: {
		id?: string;
		featureName: string;
		price: number;
	}[],
) => {
	const visibleCount: Record<string, number | "all"> = {
		free: 1,
		basic: 6,
		gold: 13,
		premium: "all",
		enterprise: "all",
	};

	const limit = visibleCount[planId] ?? 1;

	return limit === "all" ? services : services.slice(0, limit);
};
