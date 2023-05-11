import LocationEditForm from '@/components/forms/LocationEditForm';
import styles from '@/styles/Form.module.css';
import moreStyles from '@/styles/Custom.module.css';
import { useLocationStore } from '@/store/locationStore';
import { SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import { Location } from '@prismatypes';
import prisma from '@prismaclient';
import { GetStaticProps, GetStaticPaths } from 'next';

export const getStaticProps: GetStaticProps = async () => {
	const locations = await prisma.location.findMany({});
	return {
		props: {
			locations: JSON.parse(JSON.stringify(locations)),
		},
		revalidate: 10,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const events = await prisma.event.findMany({
	});
	const paths = events.map((event) => ({
		params: { id: event.id.toString() },
	}));
	return { paths, fallback: 'blocking' // pre-render at build. {fallback: 'blocking'} server-renders pages on demand if path doesn't exist
	 };
};

export default function Edit() {
	const locationData = useLocationStore((state) => state.location);
	const [successMessage, setSuccessMessage] = useState<ReactNode>('');
	const [showForm, setShowForm] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<ReactNode>('');

	const onSubmit: SubmitHandler<Location> = async (data) => {
		const response = await fetch('/api/locations', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			setTimeout(() => {
				Router.push(`/locations/${locationData.id}`);
			}, 500);
			// send success status and message to the frontend
			setSuccessMessage(
				<p className={moreStyles.successMessage}>
					🎉 Location updated successfully 🎉
				</p>
			),
				setShowForm(false);
			return {
				status: 'success',
				message: 'Location updated successfully',
			};
		} else {
			console.error(response.statusText);
			setErrorMessage(
				<p className={moreStyles.errorMessage}>
					Failed to update location: {response.statusText}.
				</p>
			);
			return {
				status: 'error',
				message: 'Something went wrong. Please try again later.',
			};
		}
	};

	return (
		<div>
			<h1> Editing {locationData.name}</h1>
			{showForm && (
				<LocationEditForm
					locationData={locationData}
					handleSubmitForm={onSubmit}
				/>
			)}
			{successMessage}
			{errorMessage}
		</div>
	);
}
