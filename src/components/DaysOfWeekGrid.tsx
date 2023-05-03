import { DaysOfWeekLinks } from '@/components/DaysOfWeekMap';
import Link from 'next/link';

export default function DaysOfWeekGrid() {
	/* day grid styling */
	const dayGrid = {
		display: 'grid',
		gridTemplateColumns: 'repeat(8, 1fr)',
        margin: '1rem auto',
        gap: '0.1rem',
	};



	return (
		<div>
			<div style={dayGrid}>
				{DaysOfWeekLinks}
			</div>
		</div>
	);
}
