import Navbar from "./components/settings/Navbar";
import {BrowserRouter as Router} from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from "stylis";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import {createTheme, PaletteMode, ThemeProvider} from "@mui/material/styles";
import {Toaster} from "react-hot-toast";
import "../locales/i18n";

import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/settings/Footer";
import {CssBaseline} from "@mui/material";
import {useMemo, useState} from "react";
import Theme from "./atoms/Theme";

const cacheRtl = createCache({
	key: "muirtl",
	stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
	const getInitialMode = (): PaletteMode => {
		const stored = localStorage.getItem("theme");
		return stored === "light" ? "light" : "dark";
	};
	const [mode, setMode] = useState<PaletteMode>(getInitialMode());

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					...(mode === "light"
						? {
								primary: {main: "#002b57"},
								background: {default: "#fcf2ec"},
						  }
						: {
								primary: {main: "#ffffff"},
								background: {default: "#040f18"},
						  }),
				},
				direction: "rtl",
			}),
		[mode],
	);
	return (
		<Router>
			<Navbar />
			<ThemeProvider theme={theme}>
				<Theme mode={mode} setMode={setMode} />
				<CssBaseline />
				<Toaster position='top-center' reverseOrder={false} />
				<CacheProvider value={cacheRtl}>
					<AppRoutes />
				</CacheProvider>
				<Footer />
			</ThemeProvider>
		</Router>
	);
}

export default App;
