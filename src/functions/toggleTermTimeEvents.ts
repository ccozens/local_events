import type { EventWithLocation } from '@/types/EventWithLocation';

// filter eventList by free events
export const toggleTermTimeEvents = (
	termOnly: boolean,
	events: EventWithLocation[]
) => {
	const outOfTermEvents = events.filter(
		(event) => event.termTime === false
	);
	return termOnly ? events : outOfTermEvents;
};
