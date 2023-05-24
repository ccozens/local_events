import { useForm } from 'react-hook-form';

export type HoneyPot = {
	honeyPot?: string;
};

export const useHoneyPot = () => {
	const { register } = useForm();

	const honeyPotField = (
		<input
			type="text"
			autoComplete="new-password"
			style={{ display: 'none' }}
			{...register('honeyPot')}
		/>
	);

	return { honeyPotField };
};
