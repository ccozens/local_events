import { GetServerSideProps } from 'next';
import prisma from '@prismaclient';
import { Event } from '@prismatypes';
import Layout from '@/components/Layout';

export const getServerSideProps: GetServerSideProps = async (
	context
) => {
	const eventId = context.params?.id;
	const event = await prisma.event.findUnique({
		where: { id: Number(eventId) },
		// include: {
		//
		// },
	});

	return {
		props: { event: JSON.parse(JSON.stringify(event)) },
	};
};

export default function EventPage({ event }: { event: Event }) {
	const { name, description, cost, termTime } = event;
	const ageRange = `${event.minAge} - ${event.maxAge}`;

	return (
		<Layout>
			<div>
				{name}
				{description}
				{ageRange}
				{/* {location} */}
				{termTime ? 'Term time only' : 'All year'}
				{cost ? `£${cost}` : 'Free'}
			</div>

			<div>Details Location Website</div>
		</Layout>
	);
}
