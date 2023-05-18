import { GetStaticPaths } from "next";
import prisma from "@prismaclient";

export const fetchEventPaths: GetStaticPaths = async () => {
	const events = await prisma.event.findMany({});
	const paths = events.map((event) => ({
		params: { id: event.id.toString() },
	}));
	return {
		paths,
		fallback: 'blocking', // pre-render at build. {fallback: 'blocking'} server-renders pages on demand if path doesn't exist
	};
};
