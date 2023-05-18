import type { EventWithLocation } from '@/types/EventWithLocation';
import { currentDayName, tomorrowDayName } from '@/functions/days';

// today and tomorrow
const today = currentDayName();
const tomorrow = tomorrowDayName();

// filter eventList by day
export const eventListFiltered = (
	day: string,
	eventList: EventWithLocation[]
): EventWithLocation[] =>
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
