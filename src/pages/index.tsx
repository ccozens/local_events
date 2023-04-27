import { GetStaticProps } from 'next';
import styles from '@/styles/Home.module.css';
import type { ReactElement } from 'react';
import prisma from '@prismaclient';
import { Event } from '@prismatypes';
import EventCard from '@/components/EventCard';
import Layout from '@/components/Layout';
import Image from 'next/image';
import pic from '../images/hero_playing_crop.webp';

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
			<section className="styles.hero">
				<div className="styles.heroContent"></div>
				<Image
					src={pic}
					alt="children playing with parachute in sunshine"
					style={{
						maxWidth: '100%',
						height: 'auto',
					}}
				/>
			</section>
			<main className={styles.main}>
				<div>
					<h1>
						currently styles not applying from global and do not have
						layouts/nestedlayouts setup right. Form layout??
					</h1>
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

// apply Layout to page using getLayout
Home.getLayout = function getLayout(page: ReactElement) {
	return { page };
};
