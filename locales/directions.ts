const changeDirection = (): "ltr" | "rtl" => {
	const currentLanguage = localStorage.getItem("i18nextLng");
	if (currentLanguage === "ar" || currentLanguage === "he") return "rtl";
	return "ltr";
};
export default changeDirection;
