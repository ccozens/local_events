// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get submitted data from request body
	console.log('create event endpoint hit');

	const {
		name,
		description,
		cost,
		minAge,
		maxAge,
		locationId,
		day,
		startTime,
		endTime,
		termTime,
		website,
		phone,
		email,
	} = req.body;


	try {
		// send data to prisma
		await prisma.event.create({
			data: {
				name: name,
				description: description,
				cost: cost,
				minAge: minAge,
				maxAge: maxAge,
				day: day,
				location: {
					connect: {id: locationId}},
				startTime: startTime,
				endTime: endTime,
				termTime: termTime,
				website: website,
				phone: phone,
				email: email,
			},
		});
		res.status(200).redirect('/events');
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create event' });
	}
}
