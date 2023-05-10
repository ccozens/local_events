import styles from '@/styles/Form.module.css';
import moreStyles from '@/styles/Custom.module.css';
import { Location } from '@prismatypes';
import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { ReactNode } from 'react';
import { GetStaticProps } from 'next';
import prisma from '@prismaclient';
import LocationFormTest from '@/components/forms/LocationForm_old';
import Link from 'next/link';

// list locations
export const getStaticProps: GetStaticProps = async () => {
	const locations = await prisma.location.findMany({
		// no args = return all
	});
	return {
		props: { locations: JSON.parse(JSON.stringify(locations)) },
		revalidate: 10,
	};
};
type Locations = Location[];

export default function Locations(props: { locations: Locations }) {
	const [successMessage, setSuccessMessage] = useState<ReactNode>('');
	const [showForm, setShowForm] = useState<boolean>(true);
	const [error, setError] = useState<ReactNode>('');

	const onSubmit: SubmitHandler<Location> = async (data) => {
		const response = await fetch('/api/locations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			// send success status and message to the frontend
			setSuccessMessage(
				<p className={moreStyles.successMessage}>
					🎉 Location created successfully 🎉
				</p>
			),
				setShowForm(false);
			return {
				status: 'success',
			};
		} else {
			console.error(response.statusText);
			setError(
				<p className={moreStyles.successMessage}>
					Failed to create location: {response.statusText}
				</p>
			);
		}
	};

	const locationList = props.locations;

	return (
		<div>
			<h1>Create a location</h1>
			{showForm && <LocationFormTest handleSubmitForm={onSubmit} />}
			{successMessage}
			{error}
			<div>
				<h1>Locations</h1>
				<div className={styles.eventsGrid}>
					{locationList.map((location: Location) => (
						<div key={location.id}>
							<Link href={`locations/${location.id}`}>
								{location.name}
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
