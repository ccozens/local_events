import { Event, Location } from '@prismatypes';
import styles from '@/styles/Form.module.css';
import prisma from '@prismaclient';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

// api call to get locations for dropdown
export const getStaticProps: GetStaticProps = async () => {
	const locations = await prisma.location.findMany({});
	return {
		props: {
			locations: JSON.parse(JSON.stringify(locations))
		},
		revalidate: 10,
	};
};

type Locations = Location[];

export default function CreateEvent(props: {
	locations: Locations;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Event>();

	const onSubmit: SubmitHandler<Event> = async (data) => {
		try {
			await fetch('/api/events', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
		} catch (error) {
			console.error(error);
		}
	};

	const daysOfWeek = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<label htmlFor="name" className={styles.label}>
					Event name:
				</label>
				<input
					className={styles.input}
					type="text"
					placeholder="name"
					{...register('name')}
				/>
				<p className={styles.error}>{errors.name?.message}</p>
				<label htmlFor="description" className={styles.label}>
					Event description
				</label>
				<input
					className={styles.input}
					type="text"
					placeholder="description"
					{...register('description')}
				/>
				<p className={styles.error}>{errors.description?.message}</p>
				<label htmlFor="day" className={styles.label}>
					Day:
				</label>
				<select
					className={styles.input}
					{...register('day', {
						required: '⚠ Please choose at least one day.',
					})}>
					{daysOfWeek.map((day, index) => {
						return (
							<option key={index} value={day}>
								{day}
							</option>
						);
					})}
				</select>
				<p className={styles.error}>{errors.day?.message}</p>
				<label htmlFor="cost" className={styles.label}>
					Cost:
				</label>
				<input
					className={styles.input}
					type="number"
					placeholder="cost"
					{...register('cost', { valueAsNumber: true })}
				/>
				<p className={styles.error}>{errors.cost?.message}</p>
				<label htmlFor="termTime" className={styles.label}>
					Is the event term time only?
				</label>
				<input
					className={styles.input}
					type="checkbox"
					{...register('termTime')}
				/>
				<p className={styles.error}>{errors.termTime?.message}</p>
				<label htmlFor="minAge" className={styles.label}>
					Minimum age:
				</label>
				<input
					className={styles.input}
					type="number"
					placeholder="minAge"
					{...register('minAge', { valueAsNumber: true })}
				/>
				<p className={styles.error}>{errors.minAge?.message}</p>
				<label htmlFor="maxAge" className={styles.label}>
					Maximum age:
				</label>
				<input
					className={styles.input}
					type="number"
					placeholder="maxAge"
					{...register('maxAge', { valueAsNumber: true })}
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
					placeholder="website"
					{...register('website')}
				/>
				<p className={styles.error}>{errors.website?.message}</p>
				<label htmlFor="phone" className={styles.label}>
					Phone:
				</label>
				<input
					className={styles.input}
					placeholder="phone"
					{...register('phone')}
				/>
				<label htmlFor="email" className={styles.label}>
					Email:
				</label>
				<input
					className={styles.input}
					type="email"
					placeholder="email"
					{...register('email')}
				/>
				<label htmlFor="startTime" className={styles.label}>
					Start time:
				</label>
				<input
					className={styles.input}
					placeholder="startTime"
					type="time"
					{...register('startTime')}
				/>
				<p className={styles.error}>{errors.startTime?.message}</p>
				<label htmlFor="endTime" className={styles.label}>
					End time:
				</label>
				<input
					className={styles.input}
					placeholder="endTime"
					type="time"
					{...register('endTime')}
				/>
				<p className={styles.error}>{errors.endTime?.message}</p>

				
				<input className={styles.input} type="submit" />
			</form>

			<p>Rules</p>
			<p>
				Only enter 1 event at a time - if your event has multiple
				days, or multiple times, please enter indivudally and the
				database will store as a single event. This simplifies the
				data processing.
			</p>
		</div>
	);
}
