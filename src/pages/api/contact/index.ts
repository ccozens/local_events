// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
	sendEmail,
	mailOptions,
	MailOptions,
} from '../../../../lib/sendEmail';
import { getErrorMessage } from '@/functions/getErrorMessage';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { name, email, message } = req.body;
	const mailOptions: MailOptions = {
		from: process.env.GMAIL_USERNAME,
		to: process.env.GMAIL_USERNAME,
		subject: `Message from ${name} <${email}>`,
		text: message,
	};

	try {
		sendEmail(mailOptions);
		res.status(200).json({ success: true });
	} catch (error) {
		const message = getErrorMessage(error);
		res.status(500).json({ error: message });
	}
}
