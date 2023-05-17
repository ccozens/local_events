import { rest } from 'msw';

// req, an information about a matching request;
// res, a functional utility to create the mocked response;
// ctx, a group of functions that help to set a status code, headers, body, etc. of the mocked response.

export const handlers = [
	rest.get('http://localhost:3000/api/locations', (req, res, ctx) => {
        
		return res(
			ctx.status(200),
			ctx.json([
				{
					id: 1,
					name: 'Test Location',
					address: '123 Test St',
					website: 'https://test.com',
					phone: '123-456-7890',
					lat: 1,
					lng: 1,
				},
			])
		);
	}),
	rest.post(
		'http://localhost:3000/api/locations',
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({ message: 'Location created' })
			);
		}
	),
	rest.put('http://localhost:3000/api/locations', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({ message: 'Location updated' })
		);
	}),
	rest.delete(
		'http://localhost:3000/api/locations',
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({ message: 'Location deleted' })
			);
		}
	),
];
