import { useDayStore } from '@/store/dayStore';

const daysOfWeek = [
	'All',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

export const DaysOfWeekOptions = daysOfWeek.map((day, index) => {
	if (day !== 'All') {
		return (
			<option key={index} value={day}>
				{day}
			</option>
		);
	} else return null;
});

const dayLink = {
	cursor: 'pointer',
	color: 'hsla(45, 84%, 75%, 1)',
	backgroundColor: 'hsla(273, 56%, 50%, 1)',
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
