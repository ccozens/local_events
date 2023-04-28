import React from 'react';
import {
	GoogleMap,
	LoadScript,
	Marker,
} from '@react-google-maps/api';
const containerStyle = {
	width: '400px',
	height: '400px',
};
const westernPark = {
	lat: 52.63304433542604,
	lng: -1.1752956903540588,
};

const braunstoneLeisureCentre = {
	lat: 52.631370843015894,
	lng: -1.17763457645657,
};

function EventMap() {
	const localGoogleMapsApiKey =
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

	return (
		<div>
			{' '}
			map?
			<LoadScript googleMapsApiKey={localGoogleMapsApiKey}>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={westernPark}
					zoom={12}>
					{}
				</GoogleMap>
				<Marker
					label="Braunstone Leisure Centre"
					position={braunstoneLeisureCentre}
				/>
			</LoadScript>
		</div>
	);
}

export default React.memo(EventMap);
