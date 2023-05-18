import { GetStaticPaths } from "next";
import prisma from "@prismaclient";

export const fetchLocationPaths: GetStaticPaths = async () => {
	const locations = await prisma.location.findMany({});
	const paths = locations.map((location) => ({
		params: { id: location.id.toString() },
	}));
	return {
		paths,
		fallback: 'blocking', // pre-render at build. {fallback: 'blocking'} server-renders pages on demand if path doesn't exist
	};
};
