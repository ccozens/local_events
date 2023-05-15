import { Event, Location } from '@prismatypes';
import styles from '@/styles/Form.module.css';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DaysOfWeekElements } from '@/components/DaysOfWeekMap';

type Locations = Location[];

export default function EventForm(props: {
	eventData?: Event;
	handleSubmitForm: SubmitHandler<Event>;
	locations: Locations;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Event>({
		defaultValues: props.eventData,
	});

	const locationsDropdown = props.locations.map((location, index) => {
		return (
			<option key={index} value={location.id}>
				{location.name}
			</option>
		);
	});

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
					{DaysOfWeekElements}
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
				<div className={styles.alignCheckbox}>
					<label htmlFor="donation" className={styles.label}>
						Is this a donation?
					</label>
					<input
						className={styles.checkbox}
						type="checkbox"
						{...register('donation')}
					/>
				</div>
				<p className={styles.error}>{errors.cost?.message}</p>

				<p className={styles.error}>{errors.termTime?.message}</p>
				<p className={`${styles.label} ${styles.headLabel}`}>
					Minimum age
				</p>
				<div className={styles.age}>
					<label htmlFor="minAgeYears">Years:</label>
					<input
						className={styles.input}
						type="number"
						placeholder="0"
						{...register('minAgeYears', {
							valueAsNumber: true,
							required:
								'⚠ Please enter a minimum number of years old.',
						})}
					/>
					<p className={styles.error}>
						{errors.minAgeYears?.message}
					</p>
					<label htmlFor="minAgeMonths">Months:</label>
					<input
						className={styles.input}
						type="number"
						placeholder="0"
						{...register('minAgeMonths', {
							valueAsNumber: true,
						})}
					/>
					<p className={styles.error}>
						{errors.minAgeMonths?.message}
					</p>
				</div>
				<p className={styles.label}>Maximum age</p>
				<div className={styles.age}>
					<label htmlFor="maxAgeYears">Years:</label>
					<input
						className={styles.input}
						type="number"
						placeholder="0"
						{...register('maxAgeYears', {
							valueAsNumber: true,
							required:
								'⚠ Please enter a maximum number of years old.',
						})}
					/>
					<p className={styles.error}>
						{errors.maxAgeYears?.message}
					</p>
					<label htmlFor="maxAgeMonths">Months:</label>
					<input
						className={styles.input}
						type="number"
						placeholder="0"
						{...register('maxAgeMonths', {
							valueAsNumber: true,
						})}
					/>
				</div>
				<label htmlFor="location" className={styles.label}>
					Choose location or{' '}
					<Link href="/locations/" className={styles.contactLink}>
						add a new location
					</Link>
				</label>

				<select
					className={styles.input}
					{...register('locationId', {
						required: '⚠ Please choose at least one location.',
						valueAsNumber: true,
					})}>
					{locationsDropdown}
				</select>

				<p className={styles.error}>{errors.locationId?.message}</p>
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
				<div className={styles.time}>
					<div className={styles.time}>
						<label htmlFor="startTime" className={styles.label}>
							Start time (24 hour):
						</label>
						<input
							className={styles.input}
							placeholder="Event start time (24 hour)"
							type="time"
							{...register('startTime', {
								required: '⚠ Please enter event start time',
							})}
						/>
						<p className={styles.error}>
							{errors.startTime?.message}
						</p>
					</div>
					<div className={styles.time}>
						<label htmlFor="endTime" className={styles.label}>
							End time (24 hour):
						</label>
						<input
							className={styles.input}
							type="time"
							{...register('endTime', {
								required: '⚠ Please enter event start time',
							})}
						/>
						<p className={styles.error}>{errors.endTime?.message}</p>
					</div>
				</div>
				<div className={styles.alignCheckbox}>
					<label htmlFor="termTime" className={styles.label}>
						Term time only?
					</label>
					<input
						className={styles.checkbox}
						type="checkbox"
						{...register('termTime')}
					/>
				</div>

				<div className={styles.alignCheckbox}>
					<label htmlFor="bookingRequired" className={styles.label}>
						Booking required?
					</label>
					<input
						className={styles.checkbox}
						type="checkbox"
						{...register('bookingRequired')}
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
