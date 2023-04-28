import Router from 'next/router';
import { Location } from '@prismatypes';
import styles from '@/styles/EventCard.module.css';
import getTimeDuration from '@/functions/getTimeDuration';
import type { EventWithLocation } from '@/types/EventWithLocation';




export default function EventCard({ event }: { event: EventWithLocation }) {
	const { name, description, startTime, endTime } = event;
	const location: Location = event.location;

	const durationCalc = getTimeDuration(startTime, endTime);
	// display duration to 2 decimal places
	function durationDisplay() {
		if (durationCalc.hours === 1) return `${durationCalc.hours} hour`;
		else {
			return `${durationCalc.hours.toFixed(2)} hours`;
		}
		// durationCalc.hours.toFixed(2);
	}
	return (
		<div
			className={styles.card}
			onClick={() =>
				Router.push('/events/[id]', `/events/${event.id}`)
			}>
			<h3 className={styles.cardTitle}>{name}</h3>
			<div className={styles.cardContent}>
				<p>{description ? description : ''}</p>
				<div className={styles.times}>

				<p>Start time:</p><p> {startTime}</p>
				<p>End time: </p><p>{endTime}</p>
				<p>Length: </p><p>{durationDisplay()}</p>
				<p>Venue: {location.name}</p>
				</div>
				
			</div>
		</div>
	);
}
