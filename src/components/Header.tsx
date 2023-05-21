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
		title = `Welcome to Weekly Events`;
	} else if (
		pathname.includes('/edit') &&
		pathname.includes('/events')
	) {
		title = 'Edit event';
	} else if (pathname === '/events') {
		title = navList[1].title;
	} else if (pathname.startsWith('/events')) {
		title = 'Events';
	} else if (pathname === `/events/*`) {
		title = navList[1].title;
	} else if (
		pathname.includes('/location') &&
		pathname.includes('/events')
	) {
		title = 'Edit location';
	} else if (pathname.startsWith('/locations')) {
		title = navList[2].title;
	} else if (pathname === '/about') {
		title = navList[3].title;
	} else if (pathname === '/contact') {
		title = navList[4].title.split(' ')[0];
	}

	return (
		<header>
			<h1> {title} </h1>
			<NavBar navList={navList} />
		</header>
	);
}
