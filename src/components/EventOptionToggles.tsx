import styles from '@/styles/Custom.module.css';
import ToggleFreeEvents from './ToggleFreeEvents';
import ToggleBookedRequired from './ToggleBookingRequired';
import ToggleTermTimeEvents from './ToggleTermTimeEvents';
import ToggleAgeRangeEvents from './ToggleAgeRangeEvents';

interface EventOptionTogglesProps {
	setFreeEventsOnly: (freeEventsOnly: boolean) => void;
	freeEventsOnly: boolean;
	setNoBookingRequiredOnly: (noBookingRequiredOnly: boolean) => void;
	noBookingRequiredOnly: boolean;
	setHideTermOnly: (hideTermOnly: boolean) => void;
	hideTermOnly: boolean;
	setMinAge: (minAge: number) => void;
	setMaxAge: (maxAge: number) => void;
}

export default function EventOptionToggles(
	props: EventOptionTogglesProps
) {
	const {
		freeEventsOnly,
		setFreeEventsOnly,
		noBookingRequiredOnly,
		setNoBookingRequiredOnly,
		setMinAge,
		setMaxAge,
		hideTermOnly,
		setHideTermOnly,
	} = props;


	return (
		<div className={`${styles.eventOptions} ${styles.optionsGrid}`}>
			<ToggleFreeEvents
				freeEventsOnly={freeEventsOnly}
				setFreeEventsOnly={setFreeEventsOnly}
			/>
			<ToggleBookedRequired
				noBookingRequiredOnly={noBookingRequiredOnly}
				setNoBookingRequiredOnly={setNoBookingRequiredOnly}
			/>
			<ToggleTermTimeEvents
				hideTermOnly={hideTermOnly}
				setHideTermOnly={setHideTermOnly}
			/>
			<ToggleAgeRangeEvents
				setMinAge={setMinAge}
				setMaxAge={setMaxAge}
			/>

		</div>
	);
}
