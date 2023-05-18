import {
	dayOptionsGrid,
	daysOfWeekGrid,
} from '@/components/DaysOfWeekMap';
import styles from '@/styles/Custom.module.css';

export default function DaysOfWeekGrid() {

	return (
		<div>
			<div className={`${styles.dayOptionsGrid} ${styles.optionsGrid}`}>{dayOptionsGrid}</div>
			<div className={`${styles.daysOfWeekGrid} ${styles.optionsGrid}`}>{daysOfWeekGrid}</div>
		</div>
	);
}
