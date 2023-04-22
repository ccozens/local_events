// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';
import { Event, Day } from '@prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get submitted data from request body
	const body = req.body;
	console.log('endpoint hit');

	type EventWithLocation = Event & {
		location: string;
	};

	const {
		name,
		cost,
		minAge,
		maxAge,
		day,
		location,
		startTime,
		endTime,
		termTime,
		website,
		phone,
		email,
	} = req.body;

	// create new event object
	const newEvent: Event = {
		name: name,
		cost: cost,
		minAge: minAge,
		maxAge: maxAge,
		day: day,
		// location: location,
		startTime: startTime,
		endTime: endTime,
		termTime: termTime,
		website: website,
		phone: phone,
		email: email,
	};

	try {
		// send data to prisma
		const event = await prisma.event.create({
			data: newEvent,
		});
		res.status(200).redirect('/events');
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create event' });
	}
}
/* 
	// guard clause to check for first and last name, with early return if not present
	if (!body.name || !body.cost || !body.minAge || !body.maxAge)
		// send HTTP bad request code
		return res
			.status(400)
			.json({ data: 'Things not found' });

    // found the name, so return it
    res.status(200).json({ data: `Event name: ${body.name} \n Event cost ${body.cost} \n Event age range ${body.minAge} - ${body.maxAge}`}) */
