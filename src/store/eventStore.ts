import { create } from 'zustand';
import { EventWithLocation } from '@/types/EventWithLocation';

interface EventState {
	event: EventWithLocation;
	setEvent: (event: EventWithLocation) => void;
}

const mockEvent: EventWithLocation = {
	id: 1,
	eventId: 1,
	name: 'test event',
	description: 'test description',
	cost: 0,
	minAge: 0,
	maxAge: 0,
	location: {
		id: 1,
		name: 'test location',
		address: 'test address',
		website: 'test website',
		createdAt: new Date(),
		updatedAt: new Date(),
		lat: 0,
		lng: 0,
		phone: 'test phone',
	},
	locationId: 1,
	day: ['Monday'],
	startTime: '00:00',
	endTime: '00:00',
	termTime: false,
	createdAt: new Date(),
	updatedAt: new Date(),
	website: 'test website',
	phone: 'test phone',
	email: 'test email',
};

export const useEventStore = create<EventState>((set) => ({
	event: mockEvent,
	setEvent: (event) => set({ event }),
}));
