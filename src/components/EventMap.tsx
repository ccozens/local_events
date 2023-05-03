import React, { useState, useEffect } from 'react';
import {
	GoogleMap,
	LoadScript,
	MarkerF,
} from '@react-google-maps/api';
import { Location } from '@prismatypes';
import { geocodingRequest } from '@/functions/geocodingRequest';


function EventMap({ location }: { location: Location }) {
	const localGoogleMapsApiKey =
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

	//  set initial state fot locationDetails
	const [locationDetails, setLocationDetails] = useState({
		name: location.name,
		latlng: { lat: 0, lng: 0 },
	});

	// update locationDetails once get latlng for location promise resolves
	useEffect(() => {
		geocodingRequest(locationDetails.name).then((location) => {
			setLocationDetails((prevLocationDetails) => ({
				...prevLocationDetails,
				latlng: location || { lat: 0, lng: 0 },
			}));
		});
	}, [locationDetails.name]);

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
					`https://maps.google.com?q=${location}`,
					'_blank'
				);
			}
		},
		[clickTime, location]
	);

	const onMapError = () => {
		return <div>Map cannot be loaded right now, sorry.</div>;
	};
	return (
		<div
			className="eventMap"
			onMouseDown={onMapMouseDown}
			onMouseUp={onMapClick}
			onError={onMapError}>
			<LoadScript googleMapsApiKey={localGoogleMapsApiKey}>
				{locationDetails.latlng.lat !== 0 && (
					<GoogleMap
						mapContainerStyle={{
							width: 'clamp(232px, 100%, 400px)',
							aspectRatio: '1/1',
							borderRadius: '8px',
							border: '1px solid #F7E1A1',
							margin: '1rem auto',
						}}
						center={locationDetails.latlng}
						zoom={14}>
						<MarkerF position={locationDetails.latlng} />
					</GoogleMap>
				)}
			</LoadScript>
		</div>
	);
}

export default React.memo(EventMap);
