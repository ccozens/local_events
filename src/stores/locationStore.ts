import { create } from 'zustand';
import { Location } from '@prismatypes';

interface LocationState {
	location: Location;
	setLocation: (location: Location) => void;
}

const mockLocation: Location = {
	id: 1, 
	name: 'test location',
	address: 'test address',
	website: 'test website',
	phone: '',
	lat: null,
	lng: null,
	createdAt: new Date(),
	updatedAt: new Date(),
};

export const useLocationStore = create<LocationState>((set) => ({
	location: mockLocation,
	setLocation: (location) => set({ location }),
}));
