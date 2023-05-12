import { GetStaticProps } from 'next';
import styles from '@/styles/Home.module.css';
import type { ReactElement } from 'react';
import prisma from '@prismaclient';
import EventCard from '@/components/EventCard';
import type { EventWithLocation } from '@/types/EventWithLocation';
import DaysOfWeekGrid from '@/components/DaysOfWeekGrid';
import { useDayStore } from '@/store/dayStore';
import EventsSearch from '@/components/EventsSearch';
import { useState } from 'react';

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

export default function Home(props: {
	events: EventWithLocation[];
}): ReactElement {
	const eventList = props.events;

	// get list of event names and set as items for the combobox
	const eventNames = eventList.map((event) => {
		return event.name;
	});

	// show event card for the selected event when item is selected from combobox
	const [selectedEvent, setSelectedEvent] = useState<string>('');
	const handleSelect = (eventName: string) => {
		setSelectedEvent(eventName);
	};

	// find the event that matches the selected event
	const foundEvent = eventList.find(
		(event) => event.name === selectedEvent
	);
	// show the event card for the selected event
	const showSelectedEvent =
		foundEvent !== undefined ? (
			<EventCard event={foundEvent} />
		) : null;

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

	const showEvents =
		eventListFiltered(clickedDay).length === 0 ? (
			<p>No events listed for {clickedDay}</p>
		) : (
			eventListFiltered(clickedDay).map(
				(event: EventWithLocation) => (
					<div key={event.id}>
						<EventCard event={event} />
					</div>
				)
			)
		);

	const heading =
		clickedDay === 'All'
			? `${clickedDay} events`
			: `Events on ${clickedDay}s`;

	return (
		<div>
			<main className={styles.main}>
				<div className={styles.home}>
					<EventsSearch
						eventList={eventList}
						handleSelect={handleSelect}
					/>
					{showSelectedEvent}
					<h1>{heading}</h1>

					<DaysOfWeekGrid />
					<div className={styles.eventsGrid}>{showEvents}</div>
				</div>
			</main>
		</div>
	);
}
