// import { EventWithLocation } from '../../src/types/EventWithLocation';

import { Event, Location } from '.prisma/client/index.d';

export interface EventWithLocation extends Event {
	location: Location;
}

export const mockEvent: EventWithLocation = {
    id: 1,
    eventId: 123,
    name: 'Example Event',
    description: 'This is an example event',
    cost: 10,
    donation: false,
    familyGroup: true,
    siblingDiscount: true,
    minAgeMonths: 0,
    minAgeYears: 3,
    maxAgeMonths: 11,
    maxAgeYears: 8,
    day: ['Monday'],
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    termTime: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    website: 'https://example.com',
    phone: '0234567890',
    bookingRequired: true,
    email: 'example@example.com',
    locationId: 1,
    location: {
      id: 1,
      name: 'Example Location',
      address: '123 Main St',
      website: 'https://examplelocation.com',
      phone: '+1234567890',
      lat: 123.456,
      lng: 789.012,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  