import styles from '@/styles/Custom.module.css';

interface ToggleTermTimeEventsProps {
	setHideTermOnly: (hideTermOnly: boolean) => void;
	hideTermOnly: boolean;
}

export default function ToggleTermTimeEvents(
	props: ToggleTermTimeEventsProps
) {
	const { hideTermOnly, setHideTermOnly } = props;

	const toggleTermOnly = () => {
		setHideTermOnly(!hideTermOnly);
	};

	const buttonText = hideTermOnly
		? 'Term only events hidden'
		: 'Hide term only events';

	return (
		<button
			className={`$styles.optionButton} ${
				hideTermOnly ? styles.optionButtonActive : styles.optionButton
			}`}
			onClick={toggleTermOnly}>
			{buttonText}
		</button>
	);
}
