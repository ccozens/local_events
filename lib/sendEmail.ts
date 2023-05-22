import { createTransporter } from "./nodemailer";

export interface MailOptions {
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
	try {
		let emailTransporter = await createTransporter();
		await emailTransporter.sendMail(mailOptions);
	} catch (error) {
		throw error; // throw error to calling function
	}
};