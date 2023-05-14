import { Location } from '@prismatypes';

export type LocationForForm = Omit<Location, 'id' | 'createdAt' | 'updatedAt'> & {
	id?: number | null;
	createdAt?: string | null;
	updatedAt?: string | null;
};