import styles from '@/styles/Custom.module.css';

interface ToggleAgeRangeEventsProps {
	setMinAge: (minAge: number) => void;
	setMaxAge: (maxAge: number) => void;
}

export default function ToggleAgeRangeEvents(
	props: ToggleAgeRangeEventsProps
) {
	const { setMinAge, setMaxAge } = props;

	const minAgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMinAge(Number(e.target.value));
	};
	const maxAgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMaxAge(Number(e.target.value));
	};

	
	return (
		<div className={styles.ageRange}>
			<p>Age range</p>
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
	);
}
