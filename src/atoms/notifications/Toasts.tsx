import {Button} from "@mui/material";
import toast from "react-hot-toast";

const baseStyle = {
	fontFamily: "Cairo, sans-serif",
	fontSize: "16px",
	padding: "16px 24px",
	borderRadius: "12px",
	boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

export const successToast = (msg: string) =>
	toast.success(msg, {
		duration: 5000,
		position: "top-center",

		// Styling
		style: {
			...baseStyle,
			background: "#e0f7e9",
			color: "#065f46",
			border: "2px solid #34d399",
		},
		icon: "🎉",
		iconTheme: {
			primary: "#10b981",
			secondary: "#ffffff",
		},

		// Aria
		ariaProps: {
			role: "status",
			"aria-live": "polite",
		},

		// Additional Configuration
		removeDelay: 1000,
	});

export const errorToast = (msg: string) =>
	toast.error(msg, {
		duration: 2000,
		position: "top-center",
		style: {
			...baseStyle,
			background: "#fef2f2",
			color: "#991b1b",
			border: "2px solid #f87171",
		},
		icon: "⚠️",
		iconTheme: {
			primary: "#dc2626",
			secondary: "#ffffff",
		},
	});

export const customToast = (msg: string, navigate: (path: string) => void) => {
	const handleToast = (id: string) => {
		navigate("/login");
		toast.dismiss(id);
	};

	return toast.custom(
		(t) => (
			<div
				className={`rounded-2 text-light ${
					t.visible ? "animate-enter" : "animate-leave"
				} max-w-md w-full bg-dark shadow-lg rounded pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
			>
				<div className='flex-1 w-0 p-4'>
					<div className='flex items-center'>
						<div className='ml-3 flex-1'>
							<p className='mt-1 text-sm text-gray-500'>{msg}</p>
						</div>
					</div>
				</div>
				<div className='flex border-l border-gray-200 text-center m-auto'>
					<Button
						variant='contained'
						sx={{
							my: 1,
							mx: "auto",
							textAlign: "center",
						}}
						onClick={() => handleToast(t.id)}
					>
						سجل الدخول الان
					</Button>
				</div>
			</div>
		),
		{duration: 2000},
	);
};
