import type { EventWithLocation } from '@/types/EventWithLocation';

export // filter eventList by no booking required events
const showNoBookingRequiredEvents = (events: EventWithLocation[]) => {
	const noBookingRequiredEvents = events.filter(
		(event) => event.bookingRequired === false
	);
	return noBookingRequiredEvents;
};
