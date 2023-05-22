// nodemailer.ts
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

export const createTransporter = async () => {
	// create OAuth2 client to get access token
	const oauth2Client = new OAuth2(
		process.env.GMAIL_CLIENT_ID,
		process.env.GMAIL_CLIENT_SECRET,
		'https://developers.google.com/oauthplayground'
	);
	// set refresh token
	oauth2Client.setCredentials({
		refresh_token: process.env.GMAIL_REFRESH_TOKEN,
	});
	// get access token
	const accessToken = await new Promise((resolve, reject) => {
		oauth2Client.getAccessToken((err, token) => {
			if (err) {
				reject();
			}
			resolve(token);
		});
	});

	// create transporter object with smtp server details
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

