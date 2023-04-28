import { GetStaticProps } from 'next';
import styles from '@/styles/Home.module.css';
import type { ReactElement } from 'react';
import prisma from '@prismaclient';
import EventCard from '@/components/EventCard';
import type { EventWithLocation } from '@/types/EventWithLocation';

export const getStaticProps: GetStaticProps = async () => {
	const events = await prisma.event.findMany({
		// include linked location
		include: {
			location: true,
		},
	});
	return {
		props: { events: JSON.parse(JSON.stringify(events)) },
		revalidate: 10,
	};
};

export default function Home(props: {
	events: EventWithLocation[];
}): ReactElement {
	return (
		<div>
			<main className={styles.main}>
				<div>
					<h1>Events</h1>
					<div className={styles.eventsGrid}>
						{props.events.map((event: EventWithLocation) => (
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
