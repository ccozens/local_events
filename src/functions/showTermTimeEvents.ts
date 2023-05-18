import type { EventWithLocation } from '@/types/EventWithLocation';

// filter eventList by term only
export const showTermTimeEvents = (events: EventWithLocation[], termOnly: boolean) => {
	const termTimeEvents = events.filter(
		(event) => event.termTime === true
	);
	return termOnly ? termTimeEvents : events;
};
