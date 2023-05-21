import type { EventWithLocation } from '@/types/EventWithLocation';

// filter eventList by age range
export const showByAgeRange = (
	events: EventWithLocation[],
	minAge: number,
	maxAge: number
) => {
	const ageRangeEvents = events.filter(
		(event) =>
			minAge >= event.minAgeYears && maxAge <= event.maxAgeYears
	);
	return ageRangeEvents;
};
