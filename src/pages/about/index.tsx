// index.tsx
import { blurb } from '../api/data/blurb';
import { renderLinks } from '@/functions/formatText';
import styles from '@/styles/EventCard.module.css';

export default function About() {
	const sections = blurb.sections.map((section, index) => (
		<div
			className={styles.card}
			style={{ cursor: 'auto' }}
			key={index}>
			<h2>{section.subTitle}</h2>
			{renderLinks(section.body, section.links)}
		</div>
	));

	return <>{sections}</>;
}
