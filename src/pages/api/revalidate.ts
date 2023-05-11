// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // check for secret
    if (req.query.secret !== process.env.NEXT_REVALIDATION_SECRET) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const path = req.query.path;
        await res.revalidate(path as string);
        return res.json({ revalidated: true })
}
catch(err) {
    return res.status(500).send('Error revalidating');
}}
