import nodemailer, { TransportOptions } from 'nodemailer';

interface CustomTransportOptions extends TransportOptions {
	service: string;
	auth: {
		type: string;
		user: string;
		pass: string;
		clientId: string;
		clientSecret: string;
		refreshToken: string;
	};
}

const authOptions = {
	type: 'OAuth2',
	user: process.env.GMAIL_USERNAME,
	clientId: process.env.GMAIL_CLIENT_ID,
	clientSecret: process.env.GMAIL_CLIENT_SECRET,
	refreshToken: process.env.GMAIL_REFRESH_TOKEN,
};

// create nodemailer transporter using gmail and auth options
export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: authOptions,
} as CustomTransportOptions);

export const mailOptions = {
	from: process.env.GMAIL_USERNAME,
	to: process.env.GMAIL_USERNAME,
};
