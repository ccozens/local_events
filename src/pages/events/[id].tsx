import { GetServerSideProps } from 'next';
import prisma from '@prismaclient';
import { Location } from '@prismatypes';
import styles from '@/styles/EventPage.module.css';
import EventMap from '@/components/EventMap';
import { geocodingRequest } from '@/functions/geocodingRequest';
import type { EventWithLocation } from '@/types/EventWithLocation';

export const getServerSideProps: GetServerSideProps = async (
	context
) => {
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

	// location is a linked table and accessed via the nested prisma query above
	const location: Location = event.location;
	const locationName = location.name;
	const locationAddress = location.address;
	if (locationAddress) geocodingRequest(locationAddress);

	return (
		<div className={styles.event}>
			<div className={styles.eventContainer}>
				<div className={styles.eventSummary}>
					<div className={styles.eventHead}>
						<p className={styles.eventTitle}>{name}</p>
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
					<p className={styles.eventHead}>
						Event venue: {locationName}
					</p>
					<div className={styles.mapContainer}>
						<EventMap location={location} />
					</div>
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
