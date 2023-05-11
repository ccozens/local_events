import { GetStaticProps, GetStaticPaths } from 'next';
import styles from '@/styles/Home.module.css';
import type { ReactElement } from 'react';
import prisma from '@prismaclient';
import EventCard from '@/components/EventCard';
import type { EventWithLocation } from '@/types/EventWithLocation';
import DaysOfWeekGrid from '@/components/DaysOfWeekGrid';
import { useDayStore } from '@/store/dayStore';

export const getStaticProps: GetStaticProps = async () => {
	const events = await prisma.event.findMany({
		// sort by day, start time, name
		orderBy: [
			{
				// this will sort alphabeitcally, but want to sort by day of week. Amend when have implemented day of week. Maybe https://fymmot.github.io/inclusive-dates/
				day: 'asc',
			},
			{
				startTime: 'asc',
			},
			{
				name: 'asc',
			},
		],
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

export const getStaticPaths: GetStaticPaths = async () => {
	const events = await prisma.event.findMany({
	});
	const paths = events.map((event) => ({
		params: { id: event.id.toString() },
	}));
	return { paths, fallback: 'blocking' // pre-render at build. {fallback: 'blocking'} server-renders pages on demand if path doesn't exist
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

	const heading = clickedDay === 'All' ? `${clickedDay} events` : `Events on ${clickedDay}s`;

	return (
		<div>
			<main className={styles.main}>
				<div className={styles.home}>
					<h1>{heading}</h1>
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
