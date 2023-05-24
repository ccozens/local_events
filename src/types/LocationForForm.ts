import { Location } from '@prismatypes';

type StringOrUndefined<T> = {
	[P in keyof T]: T[P] | undefined;
};

// map id, createdAt, updatedAt to string or null and all other fields to string or undefined
export type LocationForForm = Omit<
	StringOrUndefined<Location>,
	'id' | 'createdAt' | 'updatedAt'
> & {
	id?: number | null;
	createdAt?: string | null;
	updatedAt?: string | null;
	honeyPot?: string;
};
