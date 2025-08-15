// hooks/useFadeInOnScroll.ts
import {useEffect, RefObject, useState} from "react";

export const useFadeInOnScroll = (
	ref: RefObject<HTMLElement | null>,
	threshold = 0.1,
) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(element); // observe once
				}
			},
			{threshold},
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [ref, threshold]);

	return visible;
};
