import { GetStaticProps, GetStaticPaths } from 'next';
import prisma from '@prismaclient';
import { Location } from '@prismatypes';
import styles from '@/styles/EventPage.module.css';
import moreStyles from '@/styles/Custom.module.css';
import EventMap from '@/components/EventMap';
import type { EventWithLocation } from '@/types/EventWithLocation';
import { useEventStore } from '@/stores/eventStore';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import Modal from '@/components/confirmation/Modal';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async (context) => {
	const eventId = context.params?.id;
	const event = await prisma.event.findUnique({
		where: { id: Number(eventId) },
		include: {
			location: true,
		},
	});

	return {
		props: { event: JSON.parse(JSON.stringify(event)) },
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

export default function EventPage({
	event,
}: {
	event: EventWithLocation;
}) {
	const {
		name,
		description,
		cost,
		termTime,
		minAge,
		maxAge,
		email,
		phone,
		website,
		updatedAt,
	} = event;
	const ageRange = `${minAge} - ${maxAge}`;
	const eventUpdated = new Date(updatedAt).toLocaleDateString(
		'en-GB'
	);
	const websitePresent = website ? (
		<Link
			className={`${styles.eventText} ${styles.eventLink}`}
			href={website}
			target="_blank"
			rel="noreferrer">
			{website}
		</Link>
	) : (
		<p className={styles.eventText}>unknown</p>
	);
	const emailPresent = email ? (
		<Link
			className={`${styles.eventText} ${styles.eventLink}`}
			href={`mailto:${email}`}>
			{email}
		</Link>
	) : (
		<p className={styles.eventText}>unknown</p>
	);
	const phonePresent = phone ? (
		<Link
			className={`${styles.eventText} ${styles.eventLink}`}
			href={`tel:${phone}`}>
			{phone}
		</Link>
	) : (
		<p className={styles.eventText}>unknown</p>
	);

	// location is a linked table and accessed via the nested prisma query above
	const location: Location = event.location;
	const locationName = location.name;
	// const locationLatLng = {
	// 	lat: location.lat,
	// 	lng: location.lng,
	// } as google.maps.LatLngLiteral;

	// state flag for delete message
	const [deleteMessage, setDeleteMessage] = useState<ReactNode>('');
	const [errorMessage, setErrorMessage] = useState<ReactNode>('');
	const [showEvent, setShowEvent] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const toggleModal = () => setShowModal(!showModal);

	// store event details in zustand store and push to edit event page
	const editEvent = (event: EventWithLocation) => {
		// update event store with event details
		useEventStore.setState({
			event: event,
		});
		// push to edit event page
		Router.push(`/events/${event.id}/edit`);
	};

	//  delete event from database
	const deleteEvent = async (id: number): Promise<void> => {
		const response = await fetch(`/api/events/${id}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			setTimeout(() => {
				Router.push('/');
			}, 750);
			setDeleteMessage(
				<p className={moreStyles.successMessage}>
					Event deleted successfully. Redirecting to home page...
				</p>
			),
				setShowEvent(false);
		} else {
			console.error(response.statusText);
			setErrorMessage(
				<p className={moreStyles.successMessage}>
					Failed to delete event: {response.statusText}
				</p>
			);
		}
	};
	return (
		<div>
			{showEvent && (
				<div className={styles.event}>
					<div className={styles.eventContainer}>
						<div className={styles.eventSummary}>
							<div className={styles.eventHead}>
								<h2 className={styles.eventTitle}>{name}</h2>
								<p className={styles.eventText}>{description}</p>
								<p className={styles.eventText}>
									{termTime ? 'Term time only' : 'Runs all year'}
								</p>
							</div>
							<div className={styles.eventGrid}>
								<p className={styles.eventText}>Age range: </p>
								<p className={styles.eventText}>{ageRange}</p>
								<p className={styles.eventText}>Cost: </p>
								<p className={styles.eventText}>
									{cost ? `£${cost}` : 'Free'}
								</p>
								<p className={styles.eventText}>Website: </p>
								{websitePresent}
								<p className={styles.eventText}>Email: </p>
								{emailPresent}
								<p className={styles.eventText}>Phone: </p>
								{phonePresent}
							</div>
						</div>
						<div className={styles.eventSummary}>
							<h3 className={styles.eventHead}>
								Venue: <br />
								{locationName}
							</h3>
							<div className={styles.mapContainer}>
								<EventMap
									name={location.name}
									lat={(location.lat = 52.63367)}
									lng={(location.lng = -1.13222)}
								/>
							</div>
						</div>
					</div>
					<div className={styles.eventFooter}>
						<p className={styles.footerText}>
							Event last updated: {eventUpdated}
						</p>
						<button
							onClick={() => editEvent(event)}
							className={styles.footerButtons}>
							Edit event
						</button>
						<button
							onClick={toggleModal}
							className={styles.footerButtons}>
							Delete event
						</button>
					</div>
				</div>
			)}
			{showModal && (
				<Modal
					showModal={showModal}
					toggleModal={toggleModal}
					name={event.name}
					id={event.id}
					deleteEvent={deleteEvent}
				/>
			)}
			{deleteMessage}
			{errorMessage}
		</div>
	);
}
