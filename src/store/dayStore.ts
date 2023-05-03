import { create } from 'zustand';

interface DayState {
	day: string;
	setDay: (day: string) => void;
}

export const useDayStore = create<DayState>((set) => ({
	day: 'All',
	setDay: (day) => set({ day }),
}));
