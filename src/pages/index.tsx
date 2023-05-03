import { GetStaticProps } from 'next';
import styles from '@/styles/Home.module.css';
import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import prisma from '@prismaclient';
import EventCard from '@/components/EventCard';
import type { EventWithLocation } from '@/types/EventWithLocation';
import DaysOfWeekGrid from '@/components/DaysOfWeekGrid';
import { useDayStore } from '@/store/dayStore';

export const getStaticProps: GetStaticProps = async () => {
	const events = await prisma.event.findMany({
		// include linked location
		include: {
			location: true,
		},
	});
	return {
		props: { events: JSON.parse(JSON.stringify(events)) },
		revalidate: 10,
	};
};

export default function Home(props: {
	events: EventWithLocation[];
}): ReactElement {
	const eventList = props.events;
	// clickedDay is the day that the user clicked on the DaysOfWeekGrid, propogated via zustand
	const clickedDay = useDayStore((day) => day.day);

	// filter eventList by day
	const eventListFiltered = (day: string): EventWithLocation[] =>
		eventList.filter((event) => {
			if (day === 'All' || day === 'all') {
				return event;
			}
			const eventsOnDay = event.day.includes(day);
			if (eventsOnDay) {
				return event;
			}
		});

	const title = clickedDay === 'All' ? `${clickedDay} events` : `Events on ${clickedDay}s`;

	return (
		<div>
			<main className={styles.main}>
				<div className={styles.home}>
					<h1>{title}</h1>
					<DaysOfWeekGrid />
					<div className={styles.eventsGrid}>
						{eventListFiltered(clickedDay).length === 0 ? (
							<p>No events listed for {clickedDay}</p>
						) : (
							eventListFiltered(clickedDay).map(
								(event: EventWithLocation) => (
									<div key={event.id}>
										<EventCard event={event} />
									</div>
								)
							)
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
