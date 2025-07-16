import {
	Coffee,
	Spa,
	Celebration,
	DirectionsCar,
	Cake,
	Kitchen,
	Festival,
	CameraAlt,
	Speaker,
	Restaurant,
	RoomService,
	MeetingRoom,
	Flatware,
	Chair,
	LocalFireDepartment,
	Brush,
	ChildCare,
	DirectionsCarFilled,
	EmojiEvents,
	LocalFlorist,
	RestaurantMenu,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export const mainMenu = [
	{
		label: "menu.hals",
		icon: <MeetingRoom fontSize='medium' color='warning' />,
		link: "/wedding-halls",
	},
	{
		label: "menu.hallsDecoration",
		icon: <Celebration fontSize='medium' color='warning' />,
		link: "/hals-decoration",
	},
	{
		label: "menu.carDecoration",
		icon: <DirectionsCar fontSize='medium' color='warning' />,
		link: "/cars-decoration",
	},
	{
		label: "menu.coffeeKiosks",
		icon: <Coffee fontSize='medium' color='warning' />,
		link: "/coffee-kiosks",
	},
	{
		label: "menu.beautySalons",
		icon: <Spa fontSize='medium' color='warning' />,
		link: "/cosmatics",
	},
	{
		label: "menu.chairs",
		icon: <Chair fontSize='medium' color='warning' />,
		link: "/chairs",
	},
	{
		label: "menu.pastry",
		icon: <Cake fontSize='medium' color='warning' />,
		link: "/pastry",
	},
	{
		label: "menu.frezzer",
		icon: <Kitchen fontSize='medium' color='warning' />,
		link: "/frezzer",
	},
	{
		label: "menu.dabkePlatforms",
		icon: <Festival fontSize='medium' color='warning' />,
		link: "/dabke-platforms",
	},
	{
		label: "menu.photography",
		icon: <CameraAlt fontSize='medium' color='warning' />,
		link: "/photography",
	},
	{
		label: "menu.sterio",
		icon: <Speaker fontSize='medium' color='warning' />,
		link: "/sterio",
	},
	{
		label: "menu.cooks",
		icon: <Restaurant fontSize='medium' color='warning' />,
		link: "/cooks",
	},
	{
		label: "menu.restaurants",
		icon: <Flatware fontSize='medium' color='warning' />,
		link: "/restaurants",
	},
	{
		label: "menu.waiters",
		icon: <RoomService fontSize='medium' color='warning' />,
		link: "/Waiters",
	},
	{
		label: "menu.fireworks",
		icon: <LocalFireDepartment fontSize='medium' color='warning' />,
		link: "/fireworks",
	},
	{
		label: "menu.invitationCards",
		icon: <Brush fontSize='medium' color='warning' />,
		link: "/invitation-cards",
	},
	{
		label: "menu.nuts",
		icon: <RestaurantMenu fontSize='medium' color='warning' />,
		link: "/nuts",
	},
	{
		label: "menu.religiousBands",
		icon: <EmojiEvents fontSize='medium' color='warning' />,
		link: "/religious-bands",
	},
	{
		label: "menu.kidsEntertainment",
		icon: <ChildCare fontSize='medium' color='warning' />,
		link: "/kids-entertainment",
	},
	{
		label: "menu.fruitDecoration",
		icon: <LocalFlorist fontSize='medium' color='warning' />,
		link: "/fruit-decoration",
	},
	{
		label: "menu.weddingGifts",
		icon: <EmojiEvents fontSize='medium' color='warning' />,
		link: "/wedding-gifts",
	},
	{
		label: "menu.luxuryCars",
		icon: <DirectionsCarFilled fontSize='medium' color='warning' />,
		link: "/luxury-cars",
	},
];


export const navbarItems = [
	{
		text: "navbar.home",
		icon: <HomeIcon sx={{fontSize: 30}} color='error' />,
		path: "/",
	},
	{
		text: "navbar.about",
		icon: <InfoIcon sx={{fontSize: 30}} color='warning' />,
		path: "/about",
	},
	{
		text: "navbar.contact",
		icon: <ContactMailIcon sx={{fontSize: 30}} color='success' />,
		path: "/contact",
	},
];