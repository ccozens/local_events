import { NextApiRequest, NextApiResponse } from 'next';

const openApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const openApiSpec = await import('./docs.json');
	res.status(200).json(openApiSpec);
};
export default openApiHandler;
