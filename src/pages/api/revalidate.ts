// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // check for secret
    if (req.query.secret !== process.env.REVALIDATE_SECRET) {
        return res.status(401).send('Unauthorized');
    }
    try {
        console.log('Revalidating...');
    
        await res.revalidate();
        return res.json({ revalidated: true })
}
catch(err) {
    return res.status(500).send('Error revalidating');
}}
