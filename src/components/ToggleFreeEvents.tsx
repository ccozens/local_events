import styles from '@/styles/Custom.module.css';

interface ToggleFreeEventsProps {
	setFreeEventsOnly: (freeEventsOnly: boolean) => void;
	freeEventsOnly: boolean;
}

export default function ToggleFreeEvents(
	props: ToggleFreeEventsProps
) {
	const { freeEventsOnly, setFreeEventsOnly } = props;

	const toggleFree = () => {
		setFreeEventsOnly(!freeEventsOnly);
	};

	const buttonText = freeEventsOnly
		? 'Showing free events'
		: 'Show free events only';

	return (
		<button
			className={`$styles.optionButton} ${
				freeEventsOnly
					? styles.optionButtonActive
					: styles.optionButton
			}`}
			onClick={toggleFree}>
			{buttonText}
		</button>
	);
}
