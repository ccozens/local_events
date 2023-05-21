import type { EventWithLocation } from '@/types/EventWithLocation';

// filter eventList by term only
export const hideTermTimeEvents = (
	events: EventWithLocation[],
	termOnly: boolean
) => {
	const termTimeEvents = events.filter(
		(event) => event.termTime === false
	);
	return termOnly ? termTimeEvents : events;
};
