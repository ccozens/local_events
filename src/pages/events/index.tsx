import { Event, Location } from '@prismatypes';
import styles from '@/styles/Form.module.css';
import moreStyles from '@/styles/Custom.module.css';
import prisma from '@prismaclient';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import EventForm from '@/components/forms/EventForm';

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
				<div className={styles.caveats}>
					<h3>Thanks for adding an event!</h3>
					<p>A few caveats before you do:</p>
					<ul>
						<li>
							This form can only accept 1 event at a time - if your
							event has multiple days, or multiple times, please enter
							indivudally and the database will store as a single
							event.
						</li>
						<li>
							The only date format you can enter is a day - I set this
							up thinking of events that run every week.
						</li>
					</ul>
					<p>
						{' '}
						These all simplify data processing and make the database
						more user friendly. Please{' '}
						<span className={styles.contactLink}>
							<Link href="/about">get in touch</Link>
						</span>{' '}
						if you&apos;d like more features (eg, set specific dates
						for events) and I&apos;ll know there&apos;s interest to
						work on them.
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
