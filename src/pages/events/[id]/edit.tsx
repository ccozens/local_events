import EventForm from '@/components/forms/EventForm';
import moreStyles from '@/styles/Custom.module.css';
import { useEventStore } from '@/stores/eventStore';
import { SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import { GetStaticProps } from 'next';
import { Event, Location } from '@prismatypes';
import { fetchLocations } from '@/functions/fetchLocations';
import { fetchLocationPaths } from '@/functions/fetchLocationPaths';

export const getStaticProps: GetStaticProps = fetchLocations;
export const getStaticPaths = fetchLocationPaths;

type Locations = Location[];

export default function Edit(props: { locations: Locations }) {
	const eventData = useEventStore((state) => state.event);
	const [successMessage, setSuccessMessage] = useState<ReactNode>('');
	const [showForm, setShowForm] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<ReactNode>('');

	const onSubmit: SubmitHandler<Event> = async (data) => {
		const response = await fetch('/api/events', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			setTimeout(() => {
				Router.push(`/events/${eventData.id}`);
			}, 500);
			// send success status and message to the frontend
			setSuccessMessage(
				<p className={moreStyles.successMessage}>
					🎉 Event updated successfully 🎉
				</p>
			),
				setShowForm(false);
			return {
				status: 'success',
			};
		} else {
			const errorData = await response.json();
			setErrorMessage(
				<p className={moreStyles.successMessage}>
					Failed to create event: {errorData.error}
				</p>
			);
			// send error status and message to the frontend
			return {
				status: 'error',
			};
		}
	};

	return (
		<div>
			{showForm && (
				<EventForm
					eventData={eventData}
					handleSubmitForm={onSubmit}
					locations={props.locations}
				/>
			)}
			{successMessage}
			{errorMessage}
		</div>
	);
}
