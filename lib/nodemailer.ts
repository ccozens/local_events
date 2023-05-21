import nodemailer, { TransportOptions } from 'nodemailer';
import { google } from 'googleapis';

interface CustomTransportOptions extends TransportOptions {
	service: string;
	auth: {
		type: string;
		user: string;
		accessToken: string;
		clientId: string;
		clientSecret: string;
		refreshToken: string;
	};
}

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
	const oauth2Client = new OAuth2(
		process.env.GMAIL_CLIENT_ID,
		process.env.GMAIL_CLIENT_SECRET,
		'https://developers.google.com/oauthplayground'
	);

	oauth2Client.setCredentials({
		refresh_token: process.env.GMAIL_REFRESH_TOKEN,
	});

	const accessToken = await new Promise((resolve, reject) => {
		oauth2Client.getAccessToken((err, token) => {
			if (err) {
				reject();
			}
			resolve(token);
		});
	});

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: process.env.GMAIL_USERNAME,
			accessToken,
			clientId: process.env.GMAIL_CLIENT_ID,
			clientSecret: process.env.GMAIL_CLIENT_SECRET,
			refreshToken: process.env.GMAIL_REFRESH_TOKEN,
		},
	} as CustomTransportOptions);

	return transporter;
};

interface MailOptions {
	from: string | undefined;
	to: string | undefined;
	subject?: string;
	text?: string;
}

export const mailOptions: MailOptions = {
	from: process.env.GMAIL_USERNAME,
	to: process.env.GMAIL_USERNAME,
};

export const sendEmail = async (mailOptions: MailOptions) => {
	let emailTransporter = await createTransporter();
	await emailTransporter.sendMail(mailOptions);
};
/* 

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
 */
