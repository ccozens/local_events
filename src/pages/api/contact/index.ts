/* // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { mailOptions, transporter } from '@nodemailer';
import { getErrorMessage } from '@/functions/getErrorMessage';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get submitted data from request body
	const { name, email, message } = req.body;
	if (req.method === 'POST')
		try {
			// send email
			await transporter.sendMail({
				...mailOptions,
				subject: `Local events message from ${name}`,
				text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
			});
			// set status 200 and return success message
			res.status(200).json({ message: 'Message sent' });
		} catch (error) {
			const message = getErrorMessage(error);
			res.status(500).json({ error: message });
		}
}
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { mailOptions, sendEmail } from '@nodemailer';
import { getErrorMessage } from '@/functions/getErrorMessage';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get submitted data from request body
	const { name, email, message } = req.body;
	if (req.method === 'POST')
		try {
			// send email
			sendEmail({
				...mailOptions,
				subject: `Local events message from ${name}`,
				text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
			});
			// set status 200 and return success message
			res.status(200).json({ message: 'Message sent' });
		} catch (error) {
			const message = getErrorMessage(error);
			res.status(500).json({ error: message });
		}
}
