import { fetchEvents } from '@/functions/fetchEvents';
import { GetStaticProps } from 'next';
import styles from '@/styles/Home.module.css';
import type { ReactElement } from 'react';
import EventCard from '@/components/EventCard';
import type { EventWithLocation } from '@/types/EventWithLocation';
import DaysOfWeekGrid from '@/components/DaysOfWeekGrid';
import { useDayStore } from '@/stores/dayStore';
import EventsSearch from '@/components/EventsSearch';
import { useState } from 'react';
import { currentDayName, tomorrowDayName } from '@/functions/days';
import EventOptionToggles from '@/components/EventOptionToggles';
// import { eventListFiltered } from '@/functions/eventListFiltered';

export const getStaticProps: GetStaticProps = fetchEvents;

export default function Home(props: {
	events: EventWithLocation[];
}): ReactElement {
	const eventList = props.events;

	// search implementation
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


		const eventListFiltered = (day: string): EventWithLocation[] =>
		eventList.filter((event) => {
			if (day === 'All' || day === 'all') {
				return event;
			}
			if (day === 'today' || day === 'Today') {
				return event.day.includes(today);
			}
			if (day === 'tomorrow' || day === 'Tomorrow') {
				return event.day.includes(tomorrow);
			}
			const eventsOnDay = event.day.includes(day);
			if (eventsOnDay) {
				return event;
			}
		});


	// select by day implementation
	// clickedDay is the day that the user clicked on the DaysOfWeekGrid, propogated via zustand
	const clickedDay = useDayStore((day) => day.day);
	// today and tomorrow
	const today = currentDayName();
	const tomorrow = tomorrowDayName();


		const filteredEvents: EventWithLocation[] = eventListFiltered(clickedDay);

	// filter eventList by free events
	const showFreeEvents = () => {
		const freeEvents = eventList.filter((event) => event.cost === 0);
		return freeEvents;
	};

	// filter eventList by no booking required events
	const showNoBookingRequiredEvents = () => {
		const noBookingRequiredEvents = eventList.filter(
			(event) => event.bookingRequired === false
		);
		return noBookingRequiredEvents;
	};

	// filter eventList by age range
	const [minAge, setMinAge] = useState<number>(0);
	const [maxAge, setMaxAge] = useState<number>(99);
	const showByAgeRange = () => {
		const ageRange = eventList.filter(
			(event) =>
				event.minAgeYears === minAge && event.maxAgeYears === maxAge
		);
		return ageRange;
	};

	const showEvents = (eventsToChoose: EventWithLocation[]) =>
		eventsToChoose.length === 0 ? (
			<p>No events listed for {clickedDay}</p>
		) : (
			eventsToChoose.map((event: EventWithLocation) => (
				<div key={event.id}>
					<EventCard event={event} />
				</div>
			))
		);

	// days of week heading
	const heading =
		clickedDay === 'today' || clickedDay === 'Today'
			? `Today's events`
			: clickedDay === 'tomorrow' || clickedDay === 'Tomorrow'
			? `Tomorrow's events`
			: clickedDay === 'All' || clickedDay === 'all'
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
					<DaysOfWeekGrid />
					<h1>{heading}</h1>
					<EventOptionToggles
						showFreeEvents={showFreeEvents}
						showNoBookingRequiredEvents={showNoBookingRequiredEvents}
						setMinAge={setMinAge}
						setMaxAge={setMaxAge}
					/>
					<div className={styles.eventsGrid}>
						{showEvents(filteredEvents)}
					</div>
				</div>
			</main>
		</div>
	);
}
