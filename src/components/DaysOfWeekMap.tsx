import Link from 'next/link';

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
	return (
		<option key={index} value={day}>
			{day}
		</option>
	);
});

const dayLink = {
	cursor: 'pointer',
	backgroundColor: 'hsla(273, 56%, 50%, 1)',
	border: '1px solid hsla(45, 84%, 75%, 1)',
	borderRadius: '5px',
	padding: '0.5rem',
	textAlign: 'center' as 'center',
};

export const DaysOfWeekLinks = daysOfWeek.map((day, index) => {
	return (
		<Link style={dayLink} key={index} href={`/events/${day}`}>
			{day.slice(0, 3)}
		</Link>
	);
});
