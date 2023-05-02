import { useGeolocated } from 'react-geolocated';
import { useStore } from '@nanostores/react';

export default function GeoLocation() {
	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
		useGeolocated({
			positionOptions: {
				enableHighAccuracy: false,
			},
			userDecisionTimeout: 5000,
		});

	return isGeolocationAvailable ? (
		!isGeolocationEnabled ? (
			<div>Geolocation is not enabled</div>
		) : coords ? (
			<div>
				<table>
					<tbody>
						<tr>
							<td>latitude</td>
							<td>{coords.latitude}</td>
						</tr>
						<tr>
							<td>longitude</td>
							<td>{coords.longitude}</td>
						</tr>
						<tr>
							<td>altitude</td>
							<td>{coords.altitude}</td>
						</tr>
						<tr>
							<td>heading</td>
							<td>{coords.heading}</td>
						</tr>
						<tr>
							<td>speed</td>
							<td>{coords.speed}</td>
						</tr>
					</tbody>
				</table>
			</div>
		) : (
			<div>Getting the location data&hellip; </div>
		)
	) : (
		<div>Your browser does not support Geolocation</div>
	);
}
