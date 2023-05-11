import styles from '@/styles/Locations.module.css';
import moreStyles from '@/styles/Custom.module.css';
import { Location } from '@prismatypes';
import { useState } from 'react';
import { ReactNode } from 'react';
import { GetStaticProps } from 'next';
import prisma from '@prismaclient';
import LocationForm from '@/components/forms/LocationForm';
import Link from 'next/link';
import { useLocationForFormStore } from '@/store/locationForFormStore';
import type { LocationForForm } from '@/types/LocationForForm';

// list locations
export const getStaticProps: GetStaticProps = async () => {
	const locations = await prisma.location.findMany({
		// no args = return all
		orderBy: [
			{
				name: 'asc',
			},
		],
	});
	return {
		props: { locations: JSON.parse(JSON.stringify(locations)) },
		revalidate: 10,
	};
};
type Locations = Location[];

export default function Locations(props: { locations: Locations }) {
	const [successMessage, setSuccessMessage] = useState<ReactNode>('');
	const [error, setError] = useState<ReactNode>('');
	const [showForm, setShowForm] = useState<boolean>(false);

	const locationList = props.locations;

	// get the location data from the form store
	const data = useLocationForFormStore(
		(savedLocation) => savedLocation.locationForForm
	);

	// send location data to API
	const submitNewLocation = async (data: LocationForForm) => {
		const response = await fetch('/api/locations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			// show user success message for 5 seconds
			setTimeout(() => {
				setSuccessMessage('');

			}, 5000);
			// reset store using reset function
			useLocationForFormStore.getState().reset();

			return {
				status: 'success',
			};
		} else {
			console.error(response.statusText);
			setTimeout(() => {
				setError('');
			}, 5000);
			return {
				status: 'error',
			};
		}
	};
	
	// fire off the submitNewLocation function when the button is clicked
	const onClick = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) => {
			event.preventDefault();
			// define timer to clear success/error messages

		// send data to API
		const response = await submitNewLocation(data);
		if (response.status === 'success') {
			setSuccessMessage(
				<p className={moreStyles.successMessage}>
					🎉 Location created successfully 🎉
				</p>
			);
		} else {
			setError(
				<p className={moreStyles.errorMessage}>
					⚠ Error creating location. Please try again.
				</p>
			);
		}
		setShowForm(false);
	};

	return (
		<div>
			{showForm ? (
				<div>
					<h2>Create a location</h2>
					<LocationForm onClick={onClick} showForm={showForm} />
				</div>
			) : (
				<button
					className={`${styles.input} ${styles.submit} ${styles.locationButton}`}
					onClick={() => setShowForm(true)}>
					Add Location
				</button>
			)}
			{successMessage}
			{error}
			<div>
				<h2>Current locations</h2>
				<div className={styles.locationContainer}>
					{locationList.map((location: Location) => (
						<div key={location.id}>
							<Link
								className={`${styles.listedLocation} ${styles.suggestion}`}
								href={`locations/${location.id}`}>
								{location.name}
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
