import { Event } from '@prismatypes';
import styles from '@/styles/Form.module.css';

export default function CreateEvent() {
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
			// location: target.location.value,
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
			{/* <form action="/api/events" method="post"> */}
			<form onSubmit={handleSubmit} className={styles.createEvent}>
				<label htmlFor="day">Day:</label>
				<input type="text" id="day" name="day" required/>
				<label htmlFor="name">Event:</label>
				<input type="text" id="name" name="name" required/>
				<label htmlFor="description">Description:</label>
				<input type="text" id="description" name="description" />
				<label htmlFor="cost">Cost:</label>
				<input type="number" id="cost" name="cost" required/>
				<label htmlFor="termTime">Term Time:</label>
				<input type="radio" id="termTime" name="termTime" required/>
				<label htmlFor="minAge">Min Age:</label>
				<input type="number" id="minAge" name="minAge" required/>
				<label htmlFor="maxAge">Max Age:</label>
				<input type="number" id="maxAge" name="maxAge" required/>
				{/* <label htmlFor="location">Location:</label>
				<input type="text" id="location" name="location" /> */}
				<label htmlFor="website">Website:</label>
				<input type="text" id="website" name="website" />
				<label htmlFor="phone">Phone:</label>
				<input type="text" id="phone" name="phone" />
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" />
				<label htmlFor="startTime">Start Time:</label>
				<input type="text" id="startTime" name="startTime" required/>
				<label htmlFor="endTime">End Time:</label>
				<input type="text" id="endTime" name="endTime" required/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
