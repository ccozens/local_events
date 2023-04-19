import styles from '@/styles/Header.module.css';
import Link from 'next/link';

export default function NavBar() {
	const navList = [
		{ title: 'Add an event', link: '/createEvent' },
		{ title: 'Contact me', link: '/contact' },
		{ title: 'About this site', link: '/about' },
	];

	return (
		<div>
			<ul className={styles.navBar}>
				{navList.map((item, index) => {
					return (
						<li key={index} className={styles.navItem}>
							<Link href={item.link}>{item.title}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
