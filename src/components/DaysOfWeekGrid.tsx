import {
	dayOptionsGrid,
	daysOfWeekGrid,
} from '@/components/DaysOfWeekMap';

export default function DaysOfWeekGrid() {
	// options grid styling
	const dayOptionsGridStyling = {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		margin: '1rem auto 0.5rem',
		gap: '0.1rem',
	};
	// day grid styling
	const daysOfWeekGridStyling = {
		display: 'grid',
		gridTemplateColumns: 'repeat(7, 1fr)',
		margin: '0.5rem auto 1rem',
		gap: '0.1rem',
	};

	return (
		<div>
			<div style={dayOptionsGridStyling}>{dayOptionsGrid}</div>
			<div style={daysOfWeekGridStyling}>{daysOfWeekGrid}</div>
		</div>
	);
}
