import styles from '@/styles/Header.module.css';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface navBarProps {
	navList: { title: string; link: string }[];
}

export default function NavBar(props: navBarProps) {
	const { navList } = props;

	// useState to toggle menu icon
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	// useRef to access DOM elements
	const navBarRef = useRef<HTMLUListElement>(null);
	const navItemRef = useRef<HTMLLIElement>(null);

	// navItemClick handler so clicking anywhere in li element will trigger navigation
	const navItemClick = (event: React.MouseEvent) => {
		const isTextSelected = window.getSelection()?.toString();
		if (isTextSelected) return;
		const navItem = event.currentTarget;
		const link = navItem.querySelector('a');
		if (link) link.click();
	};

	// map navList to create navItems
	const navItemsMapped = (
		<ul className={styles.navBar} ref={navBarRef}>
			{navList.map((item, index) => {
				return (
					// note ref assigned to each li element
					<li
						key={index}
						className={styles.navItem}
						ref={navItemRef}
						onClick={navItemClick}>
						<Link href={item.link}>{item.title}</Link>
					</li>
				);
			})}
		</ul>
	);

	const navButtonClickHandler = () => {
		setMenuOpen(!menuOpen);
		// navBar styles
		const navBar = navBarRef.current;
		navBar?.classList.toggle(styles.navBarActive);
		// navItem styles
		const navItems = navBar?.childNodes;
		// dynamically assign ref to each navItem based on their status as childNodes of navBar, rather than using a static ref
		navItems?.forEach((item) => {
			const itemRef = item as HTMLLIElement;
			itemRef.classList.add(styles.navItemActive);
			// remove active navBar and navItem styles after navItem clicked, with 50ms delay to allow for animation
			itemRef.addEventListener('click', () => {
				setTimeout(
					() => navBar?.classList.remove(styles.navBarActive),
					50
				);
			});
		});
	};

	const menuIcon = menuOpen ? 'menu_open' : 'menu';

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
					{menuIcon}
				</span>
				<p>Menu</p>
			</button>

			{navItemsMapped}
		</div>
	);
}
