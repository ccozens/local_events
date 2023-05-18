import type { EventWithLocation } from '@/types/EventWithLocation';

export // filter eventList by booking required events
const showNoBookingRequiredEvents = (
	events: EventWithLocation[],
	noBookingRequiredOnly: boolean
) => {
	const noBookingRequiredEvents = events.filter(
		(event) => event.bookingRequired === false
	);
	return noBookingRequiredOnly ? noBookingRequiredEvents : events;
};
