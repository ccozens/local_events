// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';
import { getErrorMessage } from '@/functions/getErrorMessage';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const locationId = req.query.id;
		// delete location in prisma by id
		if (req.method === 'DELETE') {
			await prisma.location.delete({
				where: {
					id: Number(locationId),
				},
			});
			res.status(200).json({ message: 'Location deleted' });
		}
	} catch (error) {
		const message = getErrorMessage(error);
		res.status(500).json({ error: message });
	}
}
