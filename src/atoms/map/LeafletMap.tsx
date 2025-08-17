import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {useEffect} from "react";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import {Box} from "@mui/material";

// Type-safe marker icon setup
const DefaultIcon = L.icon({
	iconUrl: iconUrl,
	iconRetinaUrl: iconRetinaUrl,
	shadowUrl: shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Strict type for coordinates
type LatLngTuple = [number, number];

interface MapControllerProps {
	center: LatLngTuple;
	zoom?: number;
}

function MapController({center, zoom}: MapControllerProps) {
	const map = useMap();


	useEffect(() => {
		map.setView(center, zoom ?? map.getZoom());
	}, [center, zoom, map]);
	return null;
}

interface MapWrapperProps {
	position: LatLngTuple;
	zoom?: number;
}

function MapWrapper({position, zoom = 14}: MapWrapperProps) {
	// Validate coordinates with fallback
	const safePosition: LatLngTuple =
		position &&
		position.length === 2 &&
		!isNaN(position[0]) &&
		!isNaN(position[1]) &&
		Math.abs(position[0]) <= 90 &&
		Math.abs(position[1]) <= 180
			? position
			: [51.505, -0.09]; // Default to London

	return (
		<Box my={20}>
			<MapContainer
				center={safePosition}
				zoom={zoom}
				style={{height: "500px", width: "80%",margin:"auto"}}
			>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={safePosition}>
					<Popup>Business Location</Popup>
				</Marker>
				<MapController center={safePosition} zoom={zoom} />
			</MapContainer>
		</Box>
	);
}

export default MapWrapper;
