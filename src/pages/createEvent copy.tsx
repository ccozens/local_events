import { Event } from '@prismatypes';
import styles from '@/styles/Form.module.css';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function CreateEvent() {
	// Define a Zod schema for form data
	const eventSchema = z.object({
		name: z.string().nonempty().max(100),
		day: z.enum([
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		]),
		description: z.string().optional(),
		cost: z.number().min(0),
		termTime: z.boolean().default(false),
		minAge: z.number().min(0).default(0),
		maxAge: z.number().min(0),
		location: z.string().nonempty(),
		website: z.string().url().optional(),
		phone: z.string().optional(),
		email: z.string().email().optional(),
		startTime: z.string().nonempty().max(4),
		endTime: z.string().nonempty().max(4),
	});

	const handleSubmit: React.FormEventHandler<
		HTMLFormElement
	> = async (event: React.SyntheticEvent) => {
		// stop form submitting and refreshing page
		event.preventDefault();

		// map form elements to their types from Event type
		type EventFormTarget = {
			[K in keyof Event]: { value: string };
		};

		//  type assertion for form elements
		const target = event.target as unknown as EventFormTarget;

		// get data from form
		const data = {
			day: target.day.value,
			name: target.name.value,
			description: target.description?.value,
			cost: target.cost.value,
			termTime: target.termTime.value,
			minAge: target.minAge.value,
			maxAge: target.maxAge.value,
			location: target.location.value,
			website: target.website?.value,
			phone: target.phone?.value,
			email: target.email?.value,
			startTime: target.startTime.value,
			endTime: target.endTime.value,
		};

		console.log(data);

		const res = await fetch('/api/events', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await res.json();
		// console.log(result);
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className={styles.createEvent}>
				<label htmlFor="day">Day:</label>
				<input type="text" id="day" name="day" required />
				<label htmlFor="name">Event:</label>
				<input type="text" id="name" name="name" required />
				<label htmlFor="description">Description:</label>
				<input type="text" id="location" name="location" required />
				<label htmlFor="location">Location:</label>
				<input type="text" id="description" name="description" />
				<label htmlFor="cost">Cost:</label>
				<input type="number" id="cost" name="cost" required />
				<label htmlFor="termTime">Term Time:</label>
				<input
					type="checkbox"
					id="termTime"
					name="termTime"
					required
				/>
				<label htmlFor="minAge">Min Age:</label>
				<input type="number" id="minAge" name="minAge" required />
				<label htmlFor="maxAge">Max Age:</label>
				<input type="number" id="maxAge" name="maxAge" required />
				<label htmlFor="location">Location:</label>
				<input type="text" id="location" name="location" />
				<label htmlFor="website">Website:</label>
				<input type="text" id="website" name="website" />
				<label htmlFor="phone">Phone:</label>
				<input type="text" id="phone" name="phone" />
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" />
				<label htmlFor="startTime">Start Time:</label>
				<input type="text" id="startTime" name="startTime" required />
				<label htmlFor="endTime">End Time:</label>
				<input type="text" id="endTime" name="endTime" required />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
