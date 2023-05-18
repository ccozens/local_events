import { useDayStore } from '@/stores/dayStore';
import styles from '@/styles/Custom.module.css';

const daysOfWeek = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

export const DaysOfWeekElements = daysOfWeek.map((day, index) => {
	return (
		<option key={index} value={day}>
			{day}
		</option>
	);
});



const dayClickHandler = (
	event: React.MouseEvent<HTMLButtonElement>
) => {
	// update day store on click
	const day = event.currentTarget.dataset.day;
	useDayStore.setState({ day: day });
};


export const daysOfWeekGrid = daysOfWeek.map((day, index) => {
	return (
		<button
			className={styles.optionButton}
			key={index}
			data-day={day}
			onClick={dayClickHandler}>
			{day.slice(0, 3)}
		</button>
	);
});

const dayOptions = ['All', 'Today', 'Tomorrow'];

export const dayOptionsGrid = dayOptions.map((option, index) => {
	return (
		<button
			className={styles.optionButton}
			key={index}
			data-day={option}
			onClick={dayClickHandler}>
			{option}
		</button>
	);
});
