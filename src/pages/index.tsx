import { GetStaticProps } from 'next';
import styles from '@/styles/Home.module.css';
// import prisma from '@/lib/prisma';
import prisma from '../../lib/prisma';
import { Event } from '@prismatypes';
import EventCard from '@/components/EventCard';
import Layout from '@/components/Layout';
import Image from 'next/image';
import type { NextPageWithLayout } from './_app';
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

type Events = Event[];

export default function Home(props: { events: Events }) {
	return (
		<>

			<Layout>
        <section className="styles.hero">
          <div className="styles.heroContent"></div>
          <Image src={pic} alt="children playing with parachute in sunshine" 
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}/>

        </section>
				<main className={styles.main}>
					<div>
						<h1>Events</h1>
						<div className={styles.eventsGrid}>
							{props.events.map((event: Event) => (
								<div  key={event.id}>
									<EventCard event={event}/>
								</div>
							))}
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}
