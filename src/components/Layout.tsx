import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
});
interface Children {
	children?: ReactNode;
	// any props that come into the component
}

export default function Layout({ children }: Children) {
	return (
		<div>
			<Head>
				<title>Local events</title>
				<meta
					name="description"
					content="Local events for families"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<meta name="msapplication-TileColor" content="#fff4c3" />
				<meta name="theme-color" content="#fff4c3" />
				
			</Head>
			<div className={inter.className}>
				<Header />
				<main> {children} </main>
				<Footer />
			</div>
		</div>
	);
}
