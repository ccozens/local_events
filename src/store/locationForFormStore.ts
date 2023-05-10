import { create } from 'zustand';
import type { LocationForForm } from '@/types/LocationForForm';

interface LocationForFormState {
    locationForForm: LocationForForm;
    setLocationForForm: (locationForForm: LocationForForm) => void;
};

const mockLocationForForm: LocationForForm = {
    id: null,
    name: '',
    address: '',
    website: '',
    phone: '',
    createdAt: null,
    updatedAt: null,
    lat: null,
    lng: null,
};

export const useLocationForFormStore = create<LocationForFormState>((set) => ({
    locationForForm: mockLocationForForm,
    setLocationForForm: (locationForForm ) => set({ locationForForm }),
}))