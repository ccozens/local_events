import { GetServerSideProps } from 'next';
import prisma from '@prismaclient';
import { Event } from '@prismatypes';
import styles from '@/styles/EventPage.module.css';
import EventMap from '@/components/EventMap';
import GeoLocation from '@/components/GeoLocation';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (
	context
) => {
	const eventId = context.params?.id;
	const event = await prisma.event.findUnique({
		where: { id: Number(eventId) },
		// include: {
		//
		// },
	});

	return {
		props: { event: JSON.parse(JSON.stringify(event)) },
	};
};

type LocationProps = {
	label: string;
	lat: number;
	lng: number;
};

export default function EventPage({ event }: { event: Event }) {
	const {
		name,
		description,
		cost,
		termTime,
		email,
		phone,
		website,
		updatedAt,
	} = event;
	const ageRange = `${event.minAge} - ${event.maxAge}`;
	const eventUpdated = new Date(updatedAt).toLocaleDateString(
		'en-GB'
	);

	const braunstoneLeisureCentre = {
		label: 'Braunstone Leisure Centre',
		lat: 52.631370843015894,
		lng: -1.17763457645657,
	};

	const dmuPool = {
		label: 'Queen Elizabeth II Diamond Jubilee Leisure Centre',
		lat: 52.629,
		lng: -1.14,
	};

	const [location, setLocation] = useState(dmuPool);

	return (
		<div className={styles.event}>
			<div className={styles.eventContainer}>
				<div className={styles.eventSummary}>
					<div className={styles.eventHead}>
						<p className={styles.eventTitle}>{name}</p>
						<p className={styles.eventText}>{description}</p>
						{/* <p className={styles.eventText}> {location}</p> */}
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
						<p className={styles.eventText}>
							{website ? `${website}` : ''}
						</p>
						<p className={styles.eventText}>Email: </p>
						<p className={styles.eventText}>
							{email ? `${email}` : ''}
						</p>
						<p className={styles.eventText}>Phone: </p>
						<p className={styles.eventText}>
							{phone ? `${phone}` : ''}
						</p>
					</div>
				</div>
				<div className={styles.eventSummary}>
					<p className={styles.eventHead}>{location.label}</p>
					<EventMap location={location} />
				</div>
			</div>
			<div className={styles.eventFooter}>
				<p className={styles.footerText}>
					Event last updated: {eventUpdated}
				</p>
				<p className={styles.footerButtons}>Edit event</p>
				<p className={styles.footerButtons}>Delete event</p>
			</div>
		</div>
	);
}
