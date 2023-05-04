// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const eventId = req.query.id;
	// delete event in prisma by id
	if (req.method === 'DELETE') {
		await prisma.event.delete({
			where: {
				id: Number(eventId),
			},
		});
		res.status(200).json({ message: 'Event deleted' });
	}
	// update handler
	if (req.method === 'PUT') {
		res.status(200).json({ message: 'Event updated' });
	}
}
