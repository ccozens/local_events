import Router from 'next/router';
import { Location } from '@prismatypes';
import styles from '@/styles/EventCard.module.css';
import getTimeDuration from '@/functions/getTimeDuration';
import type { EventWithLocation } from '@/types/EventWithLocation';
import React from 'react';

export default function EventCard({
	event,
}: {
	event: EventWithLocation;
}) {
	const { name, description, day, startTime, endTime } = event;
	const location: Location = event.location;

	const descriptionToDisplay = () => {
		if (description && description.length > 100) {
			return (
				<React.Fragment>
					{description.slice(0, 100)}...
				</React.Fragment>
			);
		}
		if (description && description.length < 100) {
			return description;
		}
		if (!description) {
			return (
				<React.Fragment>No description provided.</React.Fragment>
			);
		}
	};

	const durationCalc = getTimeDuration(startTime, endTime);
	function durationDisplay() {
		if (durationCalc.hours < 0) return 'Invalid time';
		if (durationCalc.hours === 1) return `${durationCalc.hours} hour`;
		if (durationCalc.hours < 1)
			return `${durationCalc.minutes} minutes`;
		if (durationCalc.hours > 1 && durationCalc.minutes === 0) {
			return `${durationCalc.hours} hours`;
		} else {
			return `${durationCalc.hours.toFixed(2)} hours`;
		}
	}
	return (
		<div
			className={styles.card}
			onClick={() =>
				Router.push('/events/[id]', `/events/${event.id}`)
			}>
			<h3 className={styles.cardTitle}>{name}</h3>
			<div className={styles.cardContent}>
				<p>{descriptionToDisplay()}</p>
				<div className={styles.times}>
					<p>Day: </p>
					<p>{day}</p>

					<p>Start time:</p>
					<p> {startTime}</p>
					<p>End time: </p>
					<p>{endTime}</p>
					<p>Length: </p>
					<p>{durationDisplay()}</p>
					<p>
						Venue:
						<br />
						{location.name}
					</p>
				</div>
			</div>
		</div>
	);
}
