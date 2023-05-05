import EventForm from '@/components/forms/EventForm';
import styles from '@/styles/Form.module.css';
import moreStyles from '@/styles/Custom.module.css';
import { useEventStore } from '@/store/eventStore';
import { SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import prisma from '@prismaclient';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Event, Location } from '@prismatypes';

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = Array.from({ length: 20 }, (_, i) => ({
		params: { id: (i + 1).toString() },
	}));
	return {
		paths: paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async () => {
	const locations = await prisma.location.findMany({});
	return {
		props: {
			locations: JSON.parse(JSON.stringify(locations)),
		},
		revalidate: 10,
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
		<div className={styles.form}>
			<h1>Editing {eventData.name}</h1>
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
