import { Event, Location } from '@prismatypes';
import styles from '@/styles/Form.module.css';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DaysOfWeekOptions } from '@/components/DaysOfWeekMap';

type Locations = Location[];

export default function EventForm(props: {
	handleSubmitForm: SubmitHandler<Event>;
	locations: Locations;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Event>();

	const onSubmit = props.handleSubmitForm;

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
				<p className={styles.error}>{errors.description?.message}</p>
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
					placeholder="Minimum age"
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
					placeholder="Maximun age"
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
					<Link href="/locations">Add new location</Link>
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
		</div>
	);
}
