import styles from '@/styles/Custom.module.css';
interface EventOptionTogglesProps {
	setFreeEventsOnly: (freeEventsOnly: boolean) => void;
	freeEventsOnly: boolean;
	setNoBookingRequiredOnly: (noBookingRequiredOnly: boolean) => void;
	noBookingRequiredOnly: boolean;
	setMinAge: (minAge: number) => void;
	setMaxAge: (maxAge: number) => void;
	setTermOnly: (termOnly: boolean) => void;
	termOnly: boolean;
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
		termOnly,
		setTermOnly,
	} = props;

	const minAgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMinAge(Number(e.target.value));
	};
	const maxAgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMaxAge(Number(e.target.value));
	};

	const toggleFree = () => {
		setFreeEventsOnly(!freeEventsOnly);
	};
	const toggleBookingRequiredEvents = () => {
		setNoBookingRequiredOnly(!noBookingRequiredOnly);
	};
	const toggleTermTimeEvents = () => {
		setTermOnly(!termOnly);
	};

	const freeOrAll = freeEventsOnly
		? 'All events'
		: 'Free events only';
	const noBookingOrAll = noBookingRequiredOnly
		? 'All events'
		: 'No booking required';
	const termOrAll = termOnly ? 'All year' : 'Term time only';

	return (
		<div className={`${styles.eventOptions} ${styles.optionsGrid}`}>
			<button className={styles.optionButton} onClick={toggleFree}>
				{freeOrAll}
			</button>
			<button
				className={styles.optionButton}
				onClick={toggleBookingRequiredEvents}>
				{noBookingOrAll}
			</button>
			<button
				className={styles.optionButton}
				onClick={toggleTermTimeEvents}>
				{termOrAll}
			</button>
			<div className={styles.ageRange}>
				<p>Age range |</p>
				<div className={styles.option}>
					<label htmlFor="minAge">Min years</label>
					<input
						name="minimum age in years"
						className={styles.optionInput}
						type="number"
						placeholder="min"
						onChange={minAgeHandler}
					/>
					<label htmlFor="maxAge">Max years</label>
					<input
						name="maximum age in years"
						className={styles.optionInput}
						type="number"
						placeholder="max"
						onChange={maxAgeHandler}
					/>
				</div>
			</div>
		</div>
	);
}
