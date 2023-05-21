// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';
import { getErrorMessage } from '@/functions/getErrorMessage';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const eventId = req.query.id;
	try{
	// delete event in prisma by id
	if (req.method === 'DELETE') {
		await prisma.event.delete({
			where: {
				id: Number(eventId),
			},
		});
		res.status(200).json({ message: 'Event deleted' });
	}
	} catch (error) {
		const message = getErrorMessage(error);
		res.status(500).json({ error: message });	}
}
