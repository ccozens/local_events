// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const location = await prisma.location.findUnique({
			where: {
				name: req.body.name,
			},
		});
        const locationJSON = JSON.stringify(location);
        res.status(200).json(location);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Could not find location' });
	}
}
