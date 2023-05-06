import ContactForm from '@/components/forms/ContactForm';
import moreStyles from '@/styles/Custom.module.css';
import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { ReactNode } from 'react';
import { ContactMessage } from '@/types/ContactMessage';


export default function Contact () {
    const [successMessage, setSuccessMessage] = useState<ReactNode>('');
	const [showForm, setShowForm] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<ReactNode>('');

	const onSubmit: SubmitHandler<ContactMessage> = async (data) => {
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			// send success status and message to the frontend
			setSuccessMessage(
				<p className={moreStyles.successMessage}>
					🎉 Message sent 🎉
				</p>
			),
				setShowForm(false);
			return {
				status: 'success',
			};
		} else {
			console.error(response.statusText);
			setErrorMessage(
				<p className={moreStyles.successMessage}>
					Failed to send messge: {response.statusText}
				</p>
			);
		}
	};
    
    return (
        <div>
            <h1>Contact me</h1>
            {showForm && <ContactForm handleSubmitForm={onSubmit}/>}
            {successMessage}
            {errorMessage}
        </div>
    )
}