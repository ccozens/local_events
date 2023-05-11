import styles from '@/styles/Header.module.css';
import NavBar from './Navbar';
import { usePathname } from 'next/navigation';

export default function Header() {
	const navList = [
		{ title: 'Home', link: '/' },
		{ title: 'Create an event', link: '/events' },
		{ title: 'Locations', link: '/locations' },
		{ title: 'About', link: '/about' },
		{ title: 'Contact me', link: '/contact' },
	];

	// define page title based on pathname and navList
	let title: string = '';
	const pathname = usePathname();

	if (pathname === '/') {
		title = `Welcome to Family Events`;
	}
	if (pathname === '/events') {
		title = navList[1].title;
	} else if (pathname.startsWith('/events')) {
		title = 'Events';
	}
	if (pathname === `/events/*`) {
		title = navList[1].title;
	}
	if (pathname.startsWith('/locations')) {
		title = navList[2].title;
	}
	if (pathname === '/about') {
		title = navList[3].title;
	}
	if (pathname === '/contact') {
		title = navList[4].title.split(' ')[0];
	}

	return (
		<div className={styles.head}>
			<h1> {title} </h1>
			<NavBar navList={navList} />
		</div>
	);
}
