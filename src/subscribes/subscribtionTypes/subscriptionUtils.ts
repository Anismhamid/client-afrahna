// 🎨 צבע רקע לפי מזהה המנוי
export const subscriptionColor = (planId: string): string => {
	const colors: Record<string, string> = {
		free: "#00000029",
		basic: "silver-bg",
		gold: "gold-bg",
		premium: "premium-bg",
		enterprise: "enterprise-bg",
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
