import {FunctionComponent} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../components/pages/Home";
import About from "../components/settings/About";
import Register from "../components/settings/Register";
import BusinessRegister from "../components/settings/BusinessRegister";
import MainCoffeeKiosks from "../components/pages/vendorsPages/MainCoffeeKiosks";
import MainCosmatics from "../components/pages/vendorsPages/MainCosmatics";
import MainDabkePlatforms from "../components/pages/vendorsPages/MainDabkePlatforms";
import MainCooks from "../components/pages/vendorsPages/MainCooks";
import MainPhotography from "../components/pages/vendorsPages/MainPhotography";
import MainPastry from "../components/pages/vendorsPages/MainPastry";
import MainRestaurants from "../components/pages/vendorsPages/MainRestaurants";
import MainWaiters from "../components/pages/vendorsPages/MainWaiters";
import MainSterio from "../components/pages/vendorsPages/MainSterio";
import MainWeddingHalls from "../components/pages/vendorsPages/MainWeddingHalls";
import MainHalsDecoration from "../components/pages/vendorsPages/MainHalsDecoration";
import MainCarsDecoration from "../components/pages/vendorsPages/MainCarsDecoration";
import MainFrezzer from "../components/pages/vendorsPages/MainFrezzer";
import Pnf from "../components/settings/Pnf";
import SingleServicePage from "../components/pages/BookingPage";
import Login from "../components/settings/Login";
import Profile from "../components/pages/Profile";
import EditServices from "../components/editVendorPriofileAndServices/EditServices";
import MyBookings from "../components/pages/MyBookings";
import ContactUs from "../components/settings/ContactUs";
import SubscriptionPage from "../subscribes/SubscriptionPage";
import PaymentTerms from "../subscribes/payment/PaymentTerms";
import TermsOfUse from "../components/settings/TermsOfUse";
import PrivacyPolicy from "../components/settings/PrivacyPolicy";
import RecommendedServices from "../components/serviceView/RecommendedVendors";
import MainFruitDecorationPage from "../components/pages/vendorsPages/MainFruitDecorationPage";
import MainInvitationCardsPage from "../components/pages/vendorsPages/MainInvitationCardsPage";
import MainKidsEntertainmentPage from "../components/pages/vendorsPages/MainKidsEntertainmentPage";
import MainLuxuryCarsPage from "../components/pages/vendorsPages/MainLuxuryCarsPage";
import MainNutsPage from "../components/pages/vendorsPages/MainNutsPage";
import MainReligiousBandsPage from "../components/pages/vendorsPages/MainReligiousBandsPage";
import MainWeddingGiftsPage from "../components/pages/vendorsPages/MainWeddingGiftsPage";
import UsersTable from "../components/settings/adminManagement/UsersTable";
import VendorsTable from "../components/settings/adminManagement/VendorsTable";
import MainChairs from "../components/pages/vendorsPages/MainChairses";
import MainFireworksPage from "../components/pages/vendorsPages/MainFireworksPage";
import SpecialOffers from "../components/pages/specialOffers/SpecialOffers";

interface AppRoutesProps {}

const AppRoutes: FunctionComponent<AppRoutesProps> = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/about' element={<About />} />
			<Route path='/login' element={<Login />} />
			<Route path='/contact' element={<ContactUs />} />
			<Route path='/register' element={<Register />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/business-register' element={<BusinessRegister />} />
			<Route path='/My-bookings' element={<MyBookings />} />
			<Route path='/service/:vendorId' element={<SingleServicePage />} />
			<Route path='/vendors/:vendorId' element={<EditServices />} />
			<Route path='/subscribtion' element={<SubscriptionPage />} />
			<Route path='/privacy-policy' element={<PrivacyPolicy />} />
			<Route path='/payment-terms' element={<PaymentTerms />} />
			<Route path='/terms-of-use' element={<TermsOfUse />} />
			<Route path='/privacy-policy' element={<PrivacyPolicy />} />
			<Route path='/recommended-services' element={<RecommendedServices />} />
			<Route path='/manage/users' element={<UsersTable />} />
			<Route path='/manage/vendors' element={<VendorsTable />} />

			{/* chairses rent */}
			<Route path='/chairs' element={<MainChairs />} />

			{/* cosmatics */}
			<Route path='/cosmatics' element={<MainCosmatics />} />

			{/* CoffeeKiosks */}
			<Route path='/coffee-kiosks' element={<MainCoffeeKiosks />} />

			{/* dabkePlatforms */}
			<Route path='/dabke-platforms' element={<MainDabkePlatforms />} />

			{/* cooks */}
			<Route path='/cooks' element={<MainCooks />} />

			{/* pastry */}
			<Route path='/pastry' element={<MainPastry />} />

			{/* photography */}
			<Route path='/photography' element={<MainPhotography />} />

			{/* restaurants */}
			<Route path='/restaurants' element={<MainRestaurants />} />

			{/* stereo */}
			<Route path='/sterio' element={<MainSterio />} />

			{/* waiters */}
			<Route path='/waiters' element={<MainWaiters />} />

			{/* weddingHalls */}
			<Route path='/wedding-halls' element={<MainWeddingHalls />} />

			{/* hals decoration */}
			<Route path='/hals-decoration' element={<MainHalsDecoration />} />

			{/* cars decoration */}
			<Route path='/cars-decoration' element={<MainCarsDecoration />} />

			{/* Frezzers */}
			<Route path='/frezzer' element={<MainFrezzer />} />

			{/* FireworksPage */}
			<Route path='/fireworks' element={<MainFireworksPage />} />

			{/* Fruit Decoration */}
			<Route path='/fruit-decoration' element={<MainFruitDecorationPage />} />

			{/* Invitation Cards */}
			<Route path='/invitation-cards' element={<MainInvitationCardsPage />} />

			{/* Kids Entertainment */}
			<Route path='/Kids-entertainment' element={<MainKidsEntertainmentPage />} />

			{/* Luxury Cars */}
			<Route path='/luxury-cars' element={<MainLuxuryCarsPage />} />

			{/* Nuts */}
			<Route path='/nuts' element={<MainNutsPage />} />

			{/* Religious Bands */}
			<Route path='/religious-bands' element={<MainReligiousBandsPage />} />

			{/* Wedding Gifts */}
			<Route path='/wedding-gifts' element={<MainWeddingGiftsPage />} />

			{/* SpecialOffers */}
			<Route path='/specialOffers' element={<SpecialOffers />} />

			<Route path='*' element={<Pnf />} />
		</Routes>
	);
};

export default AppRoutes;
