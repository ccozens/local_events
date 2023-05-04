// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
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
	
}
