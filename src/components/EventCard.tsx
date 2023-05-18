import Router from 'next/router';
import { Location } from '@prismatypes';
import styles from '@/styles/EventCard.module.css';
import { descriptionToDisplay } from '@/functions/descriptionDisplay';
import { durationCalc } from '@/functions/durationCalc';
import { durationDisplay } from '@/functions/durationDisplay';
import type { EventWithLocation } from '@/types/EventWithLocation';

export default function EventCard({
	event,
}: {
	event: EventWithLocation;
}) {
	const { name, description, day, startTime, endTime } = event;
	const location: Location = event.location;

	const displayedDescription = descriptionToDisplay(description);
	const duration = durationCalc(startTime, endTime);
	const displayedDuration = durationDisplay(duration);

	return (
		<div
			className={styles.card}
			onClick={() =>
				Router.push('/events/[id]', `/events/${event.id}`)
			}>
			<h3 className={styles.cardTitle}>{name}</h3>
			<div className={styles.cardContent}>
				<p>{displayedDescription}</p>
				<div className={styles.times}>
					<p>Day: </p>
					<p>{day}</p>
					<p>Start time:</p>
					<p> {startTime}</p>
					<p>End time: </p>
					<p>{endTime}</p>
					<p>Length: </p>
					<p>{displayedDuration}</p>
					<p>Venue: </p>
					<p>{location.name}</p>
				</div>
			</div>
		</div>
	);
}
