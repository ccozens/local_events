// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prismaclient';
import { getErrorMessage } from '@/functions/getErrorMessage';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get submitted data from request body
	const {
		name,
		description,
		cost,
		donation,
		familyGroup,
		siblingDiscount,
		minAgeMonths,
		maxAgeMonths,
		minAgeYears,
		maxAgeYears,
		locationId,
		day,
		startTime,
		endTime,
		termTime,
		website,
		phone,
		bookingRequired,
		email,
	} = req.body;

	const data = {
		name: name,
		description: description,
		cost: cost,
		donation: donation,
		familyGroup: familyGroup,
		siblingDiscount: siblingDiscount,
		minAgeMonths: minAgeMonths,
		maxAgeMonths: maxAgeMonths,
		minAgeYears: minAgeYears,
		maxAgeYears: maxAgeYears,
		day: day,
		location: {
			connect: { id: locationId },
		},
		startTime: startTime,
		endTime: endTime,
		termTime: termTime,
		website: website,
		bookingRequired: bookingRequired,
		phone: phone,
		email: email,
	};

	if (req.method === 'POST')
		try {
			// send data to prisma
			await prisma.event.create({
				data: data,
			});
			// set status 200 and return success message
			res.status(200).json({ message: 'Event created' });
		} catch (error) {
			const message = getErrorMessage(error);
			res.status(500).json({ error: message });
		}
	// update handler
	if (req.method === 'PUT') {
		try {
			await prisma.event.update({
				where: {
					id: Number(req.body.id),
				},
				data: data,
			});
			res.status(200).json({ message: 'Event updated' });
		} catch (error) {
			const message = getErrorMessage(error);
			res.status(500).json({ error: message });
		}
	}
}
