import EventForm from '@/components/forms/EventForm';
import styles from '@/styles/Form.module.css';
import moreStyles from '@/styles/Custom.module.css';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import prisma from '@prismaclient';
import { GetStaticProps } from 'next';
import { Event, Location } from '@prismatypes';

// api call to get locations for dropdown
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

export default function Events(props: { locations: Locations }) {
	const [successMessage, setSuccessMessage] = useState<ReactNode>('');
	const [showForm, setShowForm] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<ReactNode>('');

	const onSubmit: SubmitHandler<Event> = async (data) => {
		const response = await fetch('/api/events', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			setTimeout(() => {
				Router.push('/');
			}, 500);
			// send success status and message to the frontend
			setSuccessMessage(
				<p className={moreStyles.successMessage}>
					🎉 Event created successfully 🎉 <br /> Redirecting to home
					page...
				</p>
			),
				setShowForm(false);
		} else {
			const errorData = await response.json();
			setErrorMessage(
				<p className={moreStyles.successMessage}>
					Failed to create event: {errorData.error}
				</p>
			);
		}
	};

	return (
		<div>
			{showForm && (
				<div className={styles.caveats}>
					<h3>Thanks for adding an event!</h3>
					<p>A quick note before you do:</p>
					<ul>
						<li>
							Please check that your event isn&apos;t already listed
							(there&apos;s an event search on the{' '}
							<Link href="/">homepage</Link>), and each event has an
							edit button.
						</li>
						<li>
							Its called weekly events, and currently that&apos;s all
							it supports. If your event has multiple days, or
							multiple times, they need entering separately.
						</li>
					</ul>

					<p>
						Please{' '}
						<span>
							<Link href="/contact">get in touch</Link>
						</span>{' '}
						if you&apos;d like more features.
					</p>
				</div>
			)}
			{showForm && (
				<EventForm
					eventData={undefined}
					handleSubmitForm={onSubmit}
					locations={props.locations}
				/>
			)}
			{successMessage}
			{errorMessage}
		</div>
	);
}
