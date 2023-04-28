import Router from 'next/router';
import { Event } from '@prismatypes';
import styles from '@/styles/EventCard.module.css';

export default function EventCard({ event }: { event: Event }) {
	const { name, description, id } = event;
	return (
		<div
			className={styles.card}
			onClick={() =>
				Router.push('/events/[id]', `/events/${event.id}`)
			}>
			<h3 className={styles.cardTitle}>{name}</h3>
			<div className={styles.cardContent}>
				<p>{description ? description : ''}</p>
				<p>{id}</p>
				<p>Start</p>
				<p>End</p>
				<p>last edited (time and person)</p>
				<p>click to update</p>
			</div>
		</div>
	);
}
