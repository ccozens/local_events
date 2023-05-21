import styles from '@/styles/Header.module.css';
import Link from 'next/link';
export default function Footer() {
	return (
		<footer>
			<p>
				Please note this is a community-maintained website and I
				cannot be held responsible for the accuracy of the information
				provided. If you encounter an event error, please either{' '}
				<Link className={styles.contactLink} href="/contact">
					let me know
				</Link>{' '}
				or edit the event yourself.
			</p>
		</footer>
	);
}
