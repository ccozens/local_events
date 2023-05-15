import { useDayStore } from '@/stores/dayStore';

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

const dayLink = {
	cursor: 'pointer',
	color: 'hsla(45, 84%, 75%, 1)',
	backgroundColor: 'hsla(263, 80%, 34%, 1)',
	border: '1px solid hsla(45, 84%, 75%, 1)',
	borderRadius: '5px',
	padding: '0.5rem',
	textAlign: 'center' as 'center',
};

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
			style={dayLink}
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
			style={dayLink}
			key={index}
			data-day={option}
			onClick={dayClickHandler}>
			{option}
		</button>
	);
});
