import { GetStaticProps } from 'next';
import prisma from '@prismaclient';

export const fetchLocations: GetStaticProps = async () => {
	const locations = await prisma.location.findMany({});
	return {
		props: {
			locations: JSON.parse(JSON.stringify(locations)),
		},
		revalidate: 10,
	};
};