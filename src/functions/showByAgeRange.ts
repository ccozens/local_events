import type { EventWithLocation } from '@/types/EventWithLocation';

export const showByAgeRange = (
	events: EventWithLocation[],
	minAge: number,
	maxAge: number
) => {
	const ageRangeEvents = events.filter(
		(event) =>
			event.minAgeYears === minAge && event.maxAgeYears === maxAge
	);
	return ageRangeEvents;
};
