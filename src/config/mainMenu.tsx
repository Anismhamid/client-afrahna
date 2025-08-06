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
		category: "فاعات",
		icon: <MeetingRoom fontSize='medium' color='warning' />,
		link: "/wedding-halls",
	},
	{
		label: "menu.hallsDecoration",
		category: "ديكور القاعات",
		icon: <Celebration fontSize='medium' color='warning' />,
		link: "/hals-decoration",
	},
	{
		label: "menu.carDecoration",
		category: "تزيين سيارات",
		icon: <DirectionsCar fontSize='medium' color='warning' />,
		link: "/cars-decoration",
	},
	{
		label: "menu.coffeeKiosks",
		category: "كيوسكات قهوة",
		icon: <Coffee fontSize='medium' color='warning' />,
		link: "/coffee-kiosks",
	},
	{
		label: "menu.beautySalons",
		category: "صالونات تجميل",
		icon: <Spa fontSize='medium' color='warning' />,
		link: "/cosmatics",
	},
	{
		label: "menu.chairs",
		category: "تأجير كراسي",
		icon: <Chair fontSize='medium' color='warning' />,
		link: "/chairs",
	},
	{
		label: "menu.pastry",
		category: "حلويات",
		icon: <Cake fontSize='medium' color='warning' />,
		link: "/pastry",
	},
	{
		label: "menu.frezzer",
		category: "تأجير برادات",
		icon: <Kitchen fontSize='medium' color='warning' />,
		link: "/frezzer",
	},
	{
		label: "menu.dabkePlatforms",
		category: "منصات دبكه",
		icon: <Festival fontSize='medium' color='warning' />,
		link: "/dabke-platforms",
	},
	{
		label: "menu.photography",
		category: "مصورين",
		icon: <CameraAlt fontSize='medium' color='warning' />,
		link: "/photography",
	},
	{
		label: "menu.sterio",
		category: "ستيريو",
		icon: <Speaker fontSize='medium' color='warning' />,
		link: "/sterio",
	},
	{
		label: "menu.cooks",
		category: "طباخين",
		icon: <Restaurant fontSize='medium' color='warning' />,
		link: "/cooks",
	},
	{
		label: "menu.restaurants",
		category: "مطاعم للاعراس",
		icon: <Flatware fontSize='medium' color='warning' />,
		link: "/restaurants",
	},
	{
		label: "menu.waiters",
		category: "نادلين",
		icon: <RoomService fontSize='medium' color='warning' />,
		link: "/Waiters",
	},
	{
		label: "menu.fireworks",
		category: "العاب ناريه",
		icon: <LocalFireDepartment fontSize='medium' color='warning' />,
		link: "/fireworks",
	},
	{
		label: "menu.invitationCards",
		category: "بطاقات دعوة",
		icon: <Brush fontSize='medium' color='warning' />,
		link: "/invitation-cards",
	},
	{
		label: "menu.nuts",
		category: "مكسرات",
		icon: <RestaurantMenu fontSize='medium' color='warning' />,
		link: "/nuts",
	},
	{
		label: "menu.religiousBands",
		category: "فرق دينية",
		icon: <EmojiEvents fontSize='medium' color='warning' />,
		link: "/religious-bands",
	},
	{
		label: "menu.kidsEntertainment",
		category: "الهاء الاطفال",
		icon: <ChildCare fontSize='medium' color='warning' />,
		link: "/kids-entertainment",
	},
	{
		label: "menu.fruitDecoration",
		category: "تزيين فاكهة",
		icon: <LocalFlorist fontSize='medium' color='warning' />,
		link: "/fruit-decoration",
	},
	{
		label: "menu.weddingGifts",
		category: "تنسيق هدايا للعرسان",
		icon: <EmojiEvents fontSize='medium' color='warning' />,
		link: "/wedding-gifts",
	},
	{
		label: "menu.luxuryCars",
		category: "تأجير سيارات فخمة",
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
