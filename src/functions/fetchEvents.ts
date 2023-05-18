import { GetStaticProps } from 'next';
import prisma from '@prismaclient';

export const fetchEvents: GetStaticProps = async () => {
	const events = await prisma.event.findMany({
		// sort by day, start time, name
		orderBy: [
			{
				name: 'asc',
			},
			{
				startTime: 'asc',
			},
			{
				// this will sort alphabetically, but want to sort by day of week. Amend when have implemented day of week. Maybe https://fymmot.github.io/inclusive-dates/
				day: 'asc',
			},
		],
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
