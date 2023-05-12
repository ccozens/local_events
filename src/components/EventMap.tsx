import React from 'react';
import {
	GoogleMap,
	MarkerF,
	useJsApiLoader,
} from '@react-google-maps/api';

interface EventMapsProps {
	name: string;
	// latlng: google.maps.LatLngLiteral
	lat: number;
	lng: number;
}

// function EventMap({ latlng, name }: EventMapsProps) {
function EventMap({ lat, lng, name }: EventMapsProps) {

	const localGoogleMapsApiKey =
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: localGoogleMapsApiKey,
		libraries: ['places']
	});
	
	const latlng = { lat: lat, lng: lng } as google.maps.LatLngLiteral;

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
					`https://maps.google.com?q=${name}`,
					'_blank'
				);
			}
		},
		[clickTime, name]
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
			{isLoaded && latlng.lat && (
				<GoogleMap
					mapContainerStyle={{
						width: 'clamp(232px, 100%, 400px)',
						aspectRatio: '1/1',
						borderRadius: '8px',
						border: '1px solid #F7E1A1',
						margin: '1rem auto',
					}}
					center={latlng}
					zoom={14}>
					<MarkerF position={latlng} />
				</GoogleMap>
			)}
			{loadError && <div>Map cannot be loaded right now, sorry.</div>}
		</div>
	);
}

export default React.memo(EventMap);
