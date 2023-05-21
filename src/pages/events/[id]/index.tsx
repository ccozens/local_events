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
import { ageRangeCalc } from '@/functions/ageRangeCalc';
import { fetchEventPaths } from '@/functions/fetchEventPaths';

export const getStaticPaths: GetStaticPaths = fetchEventPaths;

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

export default function EventPage({
	event,
}: {
	event: EventWithLocation;
}) {
	const {
		name,
		description,
		cost,
		donation,
		familyGroup,
		siblingDiscount,
		termTime,
		minAgeMonths,
		maxAgeMonths,
		minAgeYears,
		maxAgeYears,
		email,
		phone,
		bookingRequired,
		website,
		updatedAt,
	} = event;
	const ageRange = ageRangeCalc(
		minAgeMonths,
		maxAgeMonths,
		minAgeYears,
		maxAgeYears
	);
	const eventUpdated = new Date(updatedAt).toLocaleDateString(
		'en-GB'
	);

	const termTimeTernary = termTime
		? 'Term time only'
		: 'Runs all year';

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

	const bookingRequiredPresent = bookingRequired ? (
		<p className={`${styles.eventText} ${styles.eventSpan}`}>
			Booking required
		</p>
	) : (
		<p className={`${styles.eventText} ${styles.eventSpan}`}>
			No booking required
		</p>
	);

	const donationPresent = donation ? (
		<p className={`${styles.eventText} ${styles.eventSpan}`}>
			This is a suggested donation
		</p>
	) : null;

	const familyGroupPresent = familyGroup ? (
		<p className={`${styles.eventText} ${styles.eventSpan}`}>
			Cost is for a family group
		</p>
	) : null;

	const siblingDiscountPresent = siblingDiscount ? (
		<p className={`${styles.eventText} ${styles.eventSpan}`}>
			Sibling discount available
		</p>
	) : null;

	// location is a linked table and accessed via the nested prisma query above
	const location: Location = event.location;
	const locationName = location.name;

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
			const errorData = await response.json();
			setErrorMessage(
				<p className={moreStyles.successMessage}>
					Failed to delete event: {errorData.error}
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
								<p className={styles.eventText}>{termTimeTernary}</p>
							</div>
							<div className={styles.eventGrid}>
								<p className={styles.eventText}>Age range: </p>
								<p className={styles.eventText}>{ageRange}</p>
								<p className={styles.eventText}>Cost: </p>
								<p className={styles.eventText}>
									{cost ? `£${cost}` : 'Free'}
								</p>

								{donationPresent}
								{siblingDiscountPresent}
								{familyGroupPresent}
								{bookingRequiredPresent}
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
