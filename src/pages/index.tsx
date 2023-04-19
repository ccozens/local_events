import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
// import prisma from '@/lib/prisma';
import prisma from '../../lib/prisma';
import { Event } from '@prismatypes';
import EventCard from '@/components/EventCard';

export const getStaticProps: GetStaticProps = async () => {
	const events: Events = await prisma.event.findMany({
    // no args = return all
	});

	return {
		props: { events: JSON.parse(JSON.stringify(events)) },
		revalidate: 10,
	};
};

type Events = Event[];

const inter = Inter({ subsets: ['latin'] });

export default function Home(props: { events: Events }) {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
	

				<div>
					<h1>Events</h1>
					<div>

						{props.events.map((event: Event) => (
							<div key={event.id}>
								<h2>{event.name}</h2>
								<EventCard event={event} />
							</div>
						))}
					</div>
				</div>

				
			</main>
		</>
	);
}
