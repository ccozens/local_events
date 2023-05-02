import React, { useState } from 'react';
import {
	GoogleMap,
	LoadScript,
	MarkerF,
} from '@react-google-maps/api';
const containerStyle = {
	width: '300px',
	minWidth: '232px',
	aspectRatio: '1/1',
	borderRadius: '8px',
	border: '10px solid #F7E1A1;',
	margin: '1rem auto',
};

type LocationProps = {
	label: string;
	lat: number;
	lng: number;
};

function EventMap({ location }: { location: LocationProps }) {
	const localGoogleMapsApiKey =
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

	// open google maps window if short click (ie not id user panning around by click and drag)
	const [clickTime, setClickTime] = React.useState(0);
	const onMapMouseDown = () => {
		setClickTime(Date.now());
	};

	const onMapClick = React.useCallback(
		(e: React.SyntheticEvent) => {
			// do nothing on mouse down
			e.preventDefault();
			// if mousedown duration is less than 100ms, open google maps
			const duration = Date.now() - clickTime;
			if (duration < 100) {
				window.open(
					`https://maps.google.com?q=${location.label}`,
					'_blank'
				);
			}
		},
		[clickTime, location]
	);

	return (
		<div
			className="eventMap"
			onMouseDown={onMapMouseDown}
			onMouseUp={onMapClick}>
			<LoadScript googleMapsApiKey={localGoogleMapsApiKey}>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={location}
					zoom={14}>
					<MarkerF position={location} />
				</GoogleMap>
			</LoadScript>
		</div>
	);
}

export default React.memo(EventMap);
