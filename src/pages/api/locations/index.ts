// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get submitted data from request body
	const { id, name, address, website } =
		req.body;
	if (req.method === 'POST') 
	try {
		await prisma.location.create({
			data: {
				name: name,
				address: address,
				website: website,
			},
		});
        res.status(200).json({message: 'Location created'});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create location' });
	}
	// update handler
	if (req.method === 'PUT') {
		await prisma.location.update({
			where: {
				id: Number(id),
			},
			data: {
				name: req.body.name,
				address: req.body.address,
				website: req.body.website,
			},
		});
		res.status(200).json({ message: 'Location updated' });
	}
}
