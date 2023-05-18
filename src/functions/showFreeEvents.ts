import type { EventWithLocation } from '@/types/EventWithLocation';

// filter eventList by free events
export const showFreeEvents = (events: EventWithLocation[], freeEventsOnly: boolean) => {
	const freeEvents = events.filter((event) => event.cost === 0);
	return freeEventsOnly ? freeEvents : events;
};
