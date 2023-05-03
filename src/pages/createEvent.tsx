import { Event, Location } from '@prismatypes';
import styles from '@/styles/Form.module.css';
import prisma from '@prismaclient';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import Router from 'next/router';
import { useState } from 'react';
import { ReactNode } from 'react';
import { DaysOfWeekOptions } from '@/components/DaysOfWeekMap';

// api call to get locations for dropdown
export const getStaticProps: GetStaticProps = async () => {
	const locations = await prisma.location.findMany({});
	return {
		props: {
			locations: JSON.parse(JSON.stringify(locations)),
		},
		revalidate: 10,
	};
};

type Locations = Location[];

export default function CreateEvent(props: { locations: Locations }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Event>();

	const [successMessage, setSuccessMessage] = useState<ReactNode>('');
	const [showForm, setShowForm] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	const onSubmit: SubmitHandler<Event> = async (data) => {
		const response = await fetch('/api/createEvent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			setTimeout(() => {
				Router.push('/');
			}, 5000);
			// send success status and message to the frontend
			setSuccessMessage(
				<p className={styles.successMessage}>
					🎉 Event created successfully 🎉 <br /> Redirecting to home
					page...
				</p>
			),
				setShowForm(false);
			return {
				status: 'success',
			};
		} else {
			console.error(response.statusText);
			setError(`Failed to create event: ${response.statusText}`);
			// send error status and message to the frontend
			return {
				status: 'error',
			};
		}
	};


	return (
		<div>
			{showForm && (
				<div className={styles.caveats}>
					<h3>Thanks for adding an event!</h3>
					<p>A few caveats before you do:</p>
					<ul>
						<li>
							This form can only accept 1 event at a time - if your
							event has multiple days, or multiple times, please enter
							indivudally and the database will store as a single
							event.
						</li>
						<li>
							The only date format you can enter is a day - I set this
							up thinking of events that run every week.
						</li>
					</ul>
					<p>
						{' '}
						These all simplify data processing and make the database
						more user friendly. Please{' '}
						<span className={styles.contactLink}>
							<Link href="/about">get in touch</Link>
						</span>{' '}
						if you&apos;d like more features (eg, set specific dates
						for events) and I&apos;ll know there&apos;s interest to
						work on them.
					</p>
				</div>
			)}
			{showForm && (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.form}>
					<label htmlFor="name" className={styles.label}>
						Event name:
					</label>
					<input
						className={styles.input}
						type="text"
						placeholder="Event name"
						{...register('name', {
							required: '⚠ Please enter an event name.',
						})}
					/>
					<p className={styles.error}>{errors.name?.message}</p>
					<label htmlFor="description" className={styles.label}>
						Event description
					</label>
					<input
						className={styles.input}
						type="text"
						placeholder="Event description (optional)"
						{...register('description')}
					/>
					<p className={styles.error}>
						{errors.description?.message}
					</p>
					<label htmlFor="day" className={styles.label}>
						Day:
					</label>
					<select className={styles.input} {...register('day')}>
						{DaysOfWeekOptions}
					</select>
					<p className={styles.error}>{errors.day?.message}</p>
					<label htmlFor="cost" className={styles.label}>
						Cost:
					</label>
					<input
						className={styles.input}
						type="number"
						placeholder="Cost (enter 0 if free)"
						{...register('cost', {
							valueAsNumber: true,
							required: '⚠ Please enter the cost, or 0 if free.',
						})}
					/>
					<p className={styles.error}>{errors.cost?.message}</p>

					<p className={styles.error}>{errors.termTime?.message}</p>
					<label htmlFor="minAge" className={styles.label}>
						Minimum age:
					</label>
					<input
						className={styles.input}
						type="number"
						placeholder="minAge"
						{...register('minAge', {
							valueAsNumber: true,
							required: '⚠ Please enter a minimum age.',
						})}
					/>
					<p className={styles.error}>{errors.minAge?.message}</p>
					<label htmlFor="maxAge" className={styles.label}>
						Maximum age:
					</label>
					<input
						className={styles.input}
						type="number"
						placeholder="maxAge"
						{...register('maxAge', {
							valueAsNumber: true,
							required: '⚠ Please enter a maximum age.',
						})}
					/>
					<p className={styles.error}>{errors.maxAge?.message}</p>
					<label htmlFor="location" className={styles.label}>
						Location:
					</label>
					<select
						className={styles.input}
						{...register('locationId', {
							required: '⚠ Please choose at least one location.',
							valueAsNumber: true,
						})}>
						{props.locations.map((location, index) => {
							return (
								<option key={index} value={location.id}>
									{location.name}
								</option>
							);
						})}
					</select>
					<p className={styles.error}>{errors.locationId?.message}</p>
					<p className={styles.helper}>
						{' '}
						Location not listed? {''}
						<Link href="/createLocation">Add new location</Link>
					</p>
					<label htmlFor="website" className={styles.label}>
						Website:
					</label>
					<input
						className={styles.input}
						type="url"
						placeholder="Event website (optional)"
						{...register('website')}
					/>
					<p className={styles.error}>{errors.website?.message}</p>
					<label htmlFor="phone" className={styles.label}>
						Phone:
					</label>
					<input
						className={styles.input}
						placeholder="Organiser's phone number (optional)"
						{...register('phone')}
					/>
					<label htmlFor="email" className={styles.label}>
						Email:
					</label>
					<input
						className={styles.input}
						type="email"
						placeholder="Organiser's email address (optional)"
						{...register('email')}
					/>
					<label htmlFor="startTime" className={styles.label}>
						Start time:
					</label>
					<input
						className={styles.input}
						placeholder="Event start time (24 hour)"
						type="time"
						{...register('startTime', {
							required: '⚠ Please enter event start time',
						})}
					/>
					<p className={styles.error}>{errors.startTime?.message}</p>
					<label htmlFor="endTime" className={styles.label}>
						End time:
					</label>
					<input
						className={styles.input}
						placeholder="Event end time (24 hour)"
						type="time"
						{...register('endTime', {
							required: '⚠ Please enter event start time',
						})}
					/>
					<p className={styles.error}>{errors.endTime?.message}</p>
					<div className={styles.alignCheckbox}>
						<label htmlFor="termTime" className={styles.label}>
							Is the event term time only?
						</label>
						<input
							className={styles.checkbox}
							type="checkbox"
							{...register('termTime')}
						/>
					</div>
					<input
						className={`${styles.input} ${styles.submit}`}
						type="submit"
					/>
				</form>
			)}

			{successMessage}
			{error && <div className={styles.successMessage}>{error}</div>}
		</div>
	);
}
