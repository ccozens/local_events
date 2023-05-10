import usePlacesAutocomplete, {
	getDetails,
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete';
import { useJsApiLoader } from '@react-google-maps/api';
import styles from '@/styles/Locations.module.css';
import type { LocationForForm } from '@/types/LocationForForm';
import { useLocationForFormStore } from '@/store/locationForFormStore';
import Link from 'next/link';
interface PlacesAutocompleteProps {
	setSelected: (location: LocationForForm) => void;
}

const PlacesAutocomplete = ({
	setSelected,
}: PlacesAutocompleteProps) => {
	// call usePlacesAutocomplete to get the value, setValue, and suggestions
	const {
		ready, // is it ready after loading script
		value,
		setValue, // use typing
		suggestions: { status, data }, // suggestions from google
		clearSuggestions, // clear suggestions after one chosen
	} = usePlacesAutocomplete();

	const handleSelect = async (address: string) => {
		setValue(address, false);
		clearSuggestions();
		const placeId = data[0].place_id;
		const results = (await getDetails({
			placeId,
		})) as google.maps.places.PlaceResult;
		// Get latitude and longitude via utility functions
		const latlng = await getGeocode({ address }).then((results) => {
			const { lat, lng } = getLatLng(results[0]);
			return { lat, lng };
		});

		setSelected({
			name: results.name,
			address: results.formatted_address,
			website: results.website,
			phone: results.formatted_phone_number,
			lat: latlng.lat,
			lng: latlng.lng,
		});
	};

	return (
		<div>
			<label className={styles.label}>Location search</label>
			<input
				className={styles.input}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				placeholder="Search an address"
			/>
			{status === 'OK' && (
				<ul>
					{data.map(({ place_id, description }) => (
						<li
							className={styles.suggestion}
							key={place_id}
							onClick={() => handleSelect(description)}>
							{description}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};


export default function PlacesSearch() {
	const localGoogleMapsApiKey =
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: localGoogleMapsApiKey,
		libraries: ['places'],
	});

	const [locationForForm, setLocationForForm] =
		useLocationForFormStore((state) => [
			state.locationForForm,
			state.setLocationForForm,
		]);

	const selectedToRender = [
		['Name', locationForForm?.name],
		['Address', locationForForm?.address],
		['Website', locationForForm?.website],
		['Phone', locationForForm?.phone],
	];

	if (!isLoaded) return <div>Loading...</div>;

	const listStyle = {
		listStyleType: 'none',
		color: 'white',
	};

	return (
		<div className="places-container">
			<PlacesAutocomplete setSelected={setLocationForForm} />
			{locationForForm.name !== '' &&
				selectedToRender.map((element, idx) =>
					element[0] && element[0] !== 'Website' ? (
						<div key={idx}>
							<p className={styles.label}>{element[0]} : </p>
							<p className={`${styles.input} ${styles.output}`}>
								{element[1]}
							</p>
						</div>
					) : (
						<div key={idx}>
							<p className={styles.label}>{element[0]} : </p>
							<Link
								className={`${styles.input} ${styles.output} ${styles.suggestionLink}`}
								href={element[1] || ''}
								target="_blank">
								{element[1]}
							</Link>
						</div>
					)
				)}
			{loadError && (
				<div>
					Location search box cannot be loaded right now, sorry.
				</div>
			)}
		</div>
	);
}
