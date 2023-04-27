import { GetStaticProps } from 'next';
import styles from '@/styles/Home.module.css';
import type { ReactElement } from 'react';
import prisma from '@prismaclient';
import { Event } from '@prismatypes';
import EventCard from '@/components/EventCard';


export const getStaticProps: GetStaticProps = async () => {
	const events = await prisma.event.findMany({
		// no args = return all
	});
	return {
		props: { events: JSON.parse(JSON.stringify(events)) },
		revalidate: 10,
	};
};

export default function Home(props: {
	events: Event[];
}): ReactElement {
	return (
		<div>
			<main className={styles.main}>
				<div>
					<h1>Events</h1>
					<div className={styles.eventsGrid}>
						{props.events.map((event: Event) => (
							<div key={event.id}>
								<EventCard event={event} />
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

