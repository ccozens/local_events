import styles from '@/styles/Form.module.css';
import { Location } from '@prismatypes';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { ReactNode } from 'react';
import { GetStaticProps } from 'next';
import prisma from '@prismaclient';

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

export default function CreateLocation(props: {
	locations: Locations;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Location>();
	const [successMessage, setSuccessMessage] = useState<ReactNode>('');
	const [showForm, setShowForm] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	const onSubmit: SubmitHandler<Location> = async (data) => {
		const response = await fetch('/api/createLocation', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			// send success status and message to the frontend
			setSuccessMessage(
				<p className={styles.successMessage}>
					🎉 Location created successfully 🎉 <br /> Redirecting to
					home page...
				</p>
			),
				setShowForm(false);
			return {
				status: 'success',
			};
		} else {
			console.error(response.statusText);
			setError(`Failed to create location: ${response.statusText}`);
		}
	};

	const locationList = props.locations;

	return (
		<div>
			<h1>Create a location</h1>
			{showForm && (
				<form
					className={styles.form}
					onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="name">Location name:</label>
					<input
						className={styles.input}
						type="text"
						placeholder="Location name"
						{...register('name', {
							required: '⚠ Please enter a location name.',
						})}
					/>
					{errors.name && (
						<p className={styles.error}>{errors.name.message}</p>
					)}
					<label htmlFor="address">Address:</label>
					<input
						className={styles.input}
						type="text"
						placeholder="Address"
						{...register('address', {
							required: '⚠ Please enter an address.',
						})}
					/>
					{errors.address && (
						<p className={styles.error}>{errors.address.message}</p>
					)}
					<label htmlFor="website">Website:</label>
					<input
						className={styles.input}
						type="text"
						placeholder="Website (optional)"
						{...register('website')}
					/>
					{errors.website && (
						<p className={styles.error}>{errors.website.message}</p>
					)}
					<input
						type="submit"
						className={`${styles.input} ${styles.submit}`}
					/>
				</form>
			)}
			{successMessage}
			{error && <p className={styles.error}>{error}</p>}
			<div>
				<h1>Locations</h1>
				<div className={styles.eventsGrid}>
					{locationList.map((location: Location) => (
						<div key={location.id}>
							<p>{location.name}</p>
							<p>{location.address}</p>
							<p>{location.website}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
