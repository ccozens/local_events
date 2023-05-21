import styles from '@/styles/Custom.module.css';

interface ToggleBookedRequiredProps {
	setNoBookingRequiredOnly: (noBookingRequiredOnly: boolean) => void;
	noBookingRequiredOnly: boolean;
}

export default function ToggleBookedRequired(
	props: ToggleBookedRequiredProps
) {
	const { noBookingRequiredOnly, setNoBookingRequiredOnly } = props;

	const toggleNoBooking = () => {
		setNoBookingRequiredOnly(!noBookingRequiredOnly);
	};

	const buttonText = noBookingRequiredOnly
		? 'Hiding events that require booking'
		: 'Hide events that require booking';

	return (
		<button
			className={`$styles.optionButton} ${
				noBookingRequiredOnly ? styles.optionButtonActive : styles.optionButton
			}`}
			onClick={toggleNoBooking}>
			{buttonText}
		</button>
	);
}
