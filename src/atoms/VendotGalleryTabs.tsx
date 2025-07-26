import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	SyntheticEvent,
	useState,
} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {useTranslation} from "react-i18next";

interface VendorGalleryTabsProps {
	vendorId: string;
	openGalleries: Dispatch<SetStateAction<boolean>>;
	setGalleryType: Dispatch<SetStateAction<"main" | "photos" | "videos" | "contact">>;
}

const VendorGalleryTabs: FunctionComponent<VendorGalleryTabsProps> = ({
	openGalleries,
	setGalleryType,
}) => {
	const [value, setValue] = useState("1");
	// const navigate = useNavigate();

	const {t} = useTranslation();
	const handleChange = (e: SyntheticEvent, newValue: string) => {
		e.preventDefault();
		setValue(newValue);
	};

	return (
		<Box sx={{width: "100%", typography: "body1"}}>
			<TabContext value={value}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "divider",
						display: "flex",
						justifyContent: "space-around",
					}}
				>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						<Tab
							onClick={() => {
								openGalleries(true);
								setGalleryType("main");
							}}
							label={t("afrahna.main")}
							value='1'
						/>
						<Tab
							onClick={() => {
								openGalleries(true);
								setGalleryType("videos");
							}}
							label={t("afrahna.vedios")}
							value='2'
						/>
						<Tab
							onClick={() => {
								openGalleries(true);
								setGalleryType("photos");
							}}
							label={t("afrahna.images")}
							value='3'
						/>
						<Tab
							onClick={() => {
								openGalleries(true);
								setGalleryType("contact");
							}}
							label={t("afrahna.contactInfo")}
							value='4'
						/>
					</TabList>
				</Box>
			</TabContext>
		</Box>
	);
};

export default VendorGalleryTabs;
