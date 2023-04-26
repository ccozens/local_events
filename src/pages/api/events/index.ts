// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';
import { Event } from '@prismatypes';

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
		tags,
	} = req.body;

	// // create new event object
	// const newEvent = {
	// 	name: name,
	// 	description: description,
	// 	cost: cost,
	// 	minAge: minAge,
	// 	maxAge: maxAge,
	// 	day: day,
	// 	location: location,
	// 	startTime: startTime,
	// 	endTime: endTime,
	// 	termTime: termTime,
	// 	website: website,
	// 	phone: phone,
	// 	email: email,
	// 	tag: tags,
	// };

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
				/* tags: {
					connect: tags.map((tag: string) => ({ name: tag })),
				}, */
			},
		});
		res.status(200).redirect('/events');
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create event' });
	}
}


/* 
model User {
  id           Int    @id
  profileViews Int
  userName     String @unique
  email        String

  @@unique([id, profileViews])
}
 */