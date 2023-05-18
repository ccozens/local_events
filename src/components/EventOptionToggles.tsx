import styles from '@/styles/Custom.module.css';
import type { EventWithLocation } from '@/types/EventWithLocation';
interface EventOptionTogglesProps {
	setFreeEventsOnly: (freeEventsOnly: boolean) => void;
	freeEventsOnly: boolean;
    setNoBookingRequired: (noBookingRequired: boolean) => void;
	noBookingRequired: boolean;
	setMinAge: (minAge: number) => void;
    setMaxAge: (maxAge: number) => void;
    setTermOnly: (termOnly: boolean) => void;
	termOnly: boolean;
};


export default function EventOptionToggles(props: EventOptionTogglesProps) {
    const { freeEventsOnly, setFreeEventsOnly, noBookingRequired, setNoBookingRequired, setMinAge, setMaxAge, termOnly, setTermOnly } = props;

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
		setNoBookingRequired(!noBookingRequired);
	};
	const toggleTermTimeEvents = () => {
		setTermOnly(!termOnly);
	};

	const freeOrAll = freeEventsOnly ? 'All events' : 'Free events only';
	const noBookingOrAll = noBookingRequired ? 'All events' : 'No booking required';
	const termOrAll = termOnly ? 'All events' : 'Term time only';

	return (
		<div className={`${styles.eventOptions} ${styles.optionsGrid}`}>
			<button className={styles.optionButton} onClick={toggleFree}>{freeOrAll}</button>
			<button className={styles.optionButton} onClick={toggleBookingRequiredEvents}>
				{noBookingOrAll}
			</button>
			<button className={styles.optionButton} onClick={toggleTermTimeEvents}>
				{termOrAll}
			</button>
			<div className={styles.ageRange}>
				<p>Age range |</p> 
				<div className={styles.option}>
					<label htmlFor="minAge"></label>
					Min years
					<input
						className={styles.optionInput}
						type="number"
						placeholder="min"
                        onChange={minAgeHandler}
					/>
					<label htmlFor="maxAge"></label>
					Max years
					<input
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

/* todo:
1. add onclick filter to free to filter events by cost === 0
2. add onclick filter to no booking required to filter events by booking === false
3. add onchange filter to age range to filter events by age range
4. add max === 12 to minAgeMonths and maxAgeMonths on createEvent
 */
