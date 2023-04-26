import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const stAnnes = await prisma.location.upsert({
		where: { name: "St Anne's Community Church Hall" },
		update: {},
		create: {
			name: "St Anne's Community Church Hall",
			address: 'Letchworth Rd, Leicester LE3 6FN',
			website:
				'https://en-gb.facebook.com/StAnneCommunityHallLeicester/',
		},
	});

	const parentAndToddler = await prisma.tag.upsert({
		where: { id: 1 },
		update: {},
		create: {
			name: 'Parent & Toddler',
		},
	});

	const pramClub = await prisma.event.upsert({
		where: { id: 1 },
		update: {},
		create: {
			name: 'Pram Club',
			description:
				'A friendly group for parents and carers with babies and toddlers. We meet every Tuesday morning during term time from 9.30am to 11.30am. We have a variety of toys and activities for the children to play with, and a chance for parents and carers to chat and make new friends. We also have a craft table for the children to make things to take home. We have a small charge of £1 per family to cover the cost of refreshments. We look forward to seeing you soon!',
			cost: 1,
			minAge: 0,
			maxAge: 5,
			day: 'Tuesday',
			location: {
				connect: { name: "St Anne's Community Church Hall" },
			},
			startTime: '09:30',
			endTime: '11:30',
			termTime: true,
			website:
				'https://www.facebook.com/StAnneCommunityHallLeicester/',
			phone: '0116 251 1000',
			email: '',
			tags: { connect: { id: 1 } },
		},
	});
}
