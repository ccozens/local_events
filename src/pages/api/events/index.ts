// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';
import {Event} from '@prismatypes';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get submitted data from request body
	const body = req.body;

	// send data to prisma
	const event = await prisma.event.create({
		data: {
			name: body.name,
			cost: body.cost,
			minAge: body.minAge,
			maxAge: body.maxAge,
		},
	});

	// guard clause to check for first and last name, with early return if not present
	if (!body.name || !body.cost || !body.minAge || !body.maxAge)
		// send HTTP bad request code
		return res
			.status(400)
			.json({ data: 'Things not found' });

    // found the name, so return it
    res.status(200).json({ data: `Event name: ${body.name} \n Event cost ${body.cost} \n Event age range ${body.minAge} - ${body.maxAge}`})
}
