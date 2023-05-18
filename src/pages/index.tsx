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
import EventOptionToggles from '@/components/EventOptionToggles';
import { eventListFiltered } from '@/functions/eventListFiltered';
import { showFreeEvents } from '@/functions/showFreeEvents';
import { showNoBookingRequiredEvents } from '@/functions/showNoBookingRequiredEvents';
import { toggleTermTimeEvents } from '@/functions/toggleTermTimeEvents';
import { showByAgeRange } from '@/functions/showByAgeRange';

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

	// select by day implementation
	// clickedDay is the day that the user clicked on the DaysOfWeekGrid, propogated via zustand
	const clickedDay = useDayStore((day) => day.day);

	const filteredEvents: EventWithLocation[] = eventListFiltered(
		clickedDay,
		eventList
	);
	// track free event toggle
	const [freeEventsOnly, setFreeEventsOnly] =
		useState<boolean>(false);
	// track no booking required toggle
	const [noBookingRequired, setNoBookingRequired] =
		useState<boolean>(false);
	// track age range input
	const [minAge, setMinAge] = useState<number>(0);
	const [maxAge, setMaxAge] = useState<number>(99);
	// track term state
	const [termOnly, setTermOnly] = useState<boolean>(false);

	const freeEvents = showFreeEvents(filteredEvents);
	const noBookingEvents = showNoBookingRequiredEvents(filteredEvents);
	const ageRangeEvents = showByAgeRange(
		filteredEvents,
		minAge,
		maxAge
	);
	const termTimeEventToggle = toggleTermTimeEvents(
		termOnly,
		filteredEvents
	);

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
						freeEventsOnly={freeEventsOnly}
						setFreeEventsOnly={setFreeEventsOnly}
						noBookingRequired={noBookingRequired}
						setNoBookingRequired={
							setNoBookingRequired
						}
						setMinAge={setMinAge}
						setMaxAge={setMaxAge}
						termOnly={termOnly}	
						setTermOnly={setTermOnly}
					/>
					<div className={styles.eventsGrid}>
						{showEvents(filteredEvents)}
					</div>
				</div>
			</main>
		</div>
	);
}
