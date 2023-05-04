// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get submitted data from request body
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
	if (req.method === 'POST')
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
						connect: { id: locationId },
					},
					startTime: startTime,
					endTime: endTime,
					termTime: termTime,
					website: website,
					phone: phone,
					email: email,
				},
			});
			// set status 200 and return success message
			res.status(200).json({ message: 'Event created' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to create event' });
		}
	// update handler
	if (req.method === 'PUT') {
		await prisma.event.update({
			where: {
				id: Number(req.body.id),
			},
			data: {
				name: name,
				description: description,
				cost: cost,
				minAge: minAge,
				maxAge: maxAge,
				day: day,
				location: {
					connect: { id: locationId },
				},
				startTime: startTime,
				endTime: endTime,
				termTime: termTime,
				website: website,
				phone: phone,
				email: email,
			},
		});
		res.status(200).json({ message: 'Event updated' });
	}
}
