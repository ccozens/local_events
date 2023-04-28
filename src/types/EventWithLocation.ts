import { Event, Location } from '@prismatypes';

export interface EventWithLocation extends Event {
	location: Location;
}