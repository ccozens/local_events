import EventForm from '@/components/forms/EventForm';
import moreStyles from '@/styles/Custom.module.css';
import { useEventStore } from '@/stores/eventStore';
import { SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import prisma from '@prismaclient';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Event, Location } from '@prismatypes';

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
	const events = await prisma.event.findMany({});
	const paths = events.map((event) => ({
		params: { id: event.id.toString() },
	}));
	return {
		paths,
		fallback: 'blocking', // pre-render at build. {fallback: 'blocking'} server-renders pages on demand if path doesn't exist
	};
};
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
			console.error(response.statusText);
			setErrorMessage(
				<p className={moreStyles.successMessage}>
					Failed to create event: {response.statusText}
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
