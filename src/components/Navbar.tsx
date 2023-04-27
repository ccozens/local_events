import styles from '@/styles/Header.module.css';
import Link from 'next/link';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function NavBar() {
	const navList = [
		{ title: 'Create an event', link: '/createEvent' },
		{ title: 'Create a location', link: '/createLocation' },
		{ title: 'About this site', link: '/about' },
		{ title: 'Contact me', link: '/contact' },
	];

	// add /home link to navList if not on home page
	const pathname = usePathname();
	if (pathname !== '/') {
		navList.unshift({ title: 'Home', link: '/' });
	}

	// useRef to access DOM elements
	const navBarRef = useRef<HTMLUListElement>(null);
	const navItemRef = useRef<HTMLLIElement>(null);

	// map navList to create navItems
	const navItemsMapped = (
		<ul className={styles.navBar} ref={navBarRef}>
			{navList.map((item, index) => {
				return (
					// note ref assigned to each li element
					<li key={index} className={styles.navItem} ref={navItemRef}>
						<Link href={item.link}>{item.title}</Link>
					</li>
				);
			})}
		</ul>
	);

	const navButtonClickHandler = () => {
		// navBar styles
		const navBar = navBarRef.current;
		navBar?.classList.toggle(styles.navBarActive);
		// navItem styles
		const navItems = navBar?.childNodes;
		// dynamically assign ref to each navItem based on their status as childNodes of navBar, rather than using a static ref
		navItems?.forEach((item) => {
			const itemRef = item as HTMLLIElement;
			itemRef.classList.toggle(styles.navItemActive);
		});
	};

	return (
		<div className={styles.navContainer}>
			<button
				className={styles.navButton}
				onClick={navButtonClickHandler}>
				<span
					style={{
						fontSize: '2.5rem',
						fontWeight: 'bold',
						lineHeight: '1.5rem',
					}}
					className="material-symbols-outlined">
					menu
				</span>
				<p>Menu</p>
			</button>

			{navItemsMapped}
		</div>
	);
}
