import { Event } from '@prismatypes';
import styles from '@/styles/Form.module.css';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

export default function CreateEvent() {
	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Event>();

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

	const onSubmit: SubmitHandler<Event> = (data) => {
		console.log(data);
	};

	// map form elements to their types from Event type
	type EventFormTarget = {
		[K in keyof Event]: { value: string };
	};

	return (
		<div>
			<DevTool control={control} placement="top-right" />

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<label htmlFor="day" className={styles.label}>
					Day:
				</label>
				<select
					className={styles.input}
					{...register('day', {
						required: 'Please choose at least one day.',
					})}>
					<option value="Monday">Monday</option>
					<option value="Tuesday">Tuesday</option>
					<option value="Wednesday">Wednesday</option>
					<option value="Thursday">Thursday</option>
					<option value="Friday">Friday</option>
					<option value="Saturday">Saturday</option>
					<option value="Sunday">Sunday</option>
				</select>
				<p className={styles.error}>{errors.day?.message}</p>
				<label htmlFor="name" className={styles.label}>
					Event name:
				</label>
				<input
					className={styles.input}
					type="text"
					placeholder="name"
					{...register('name')}
				/>
				<label htmlFor="description" className={styles.label}>
					Event description
				</label>
				<input
					className={styles.input}
					type="text"
					placeholder="description"
					{...register('description')}
				/>
				<label htmlFor="cost" className={styles.label}>
					Cost:
				</label>
				<input
					className={styles.input}
					type="number"
					placeholder="cost"
					{...(register('cost'), { valueAsNumber: true })}
				/>
				<label htmlFor="termTime" className={styles.label}>
					Term time:
				</label>
				<input
					className={styles.input}
					type="checkbox"
					{...register('termTime')}
				/>
				<label htmlFor="minAge" className={styles.label}>
					Minimum age:
				</label>
				<input
					className={styles.input}
					type="number"
					placeholder="minAge"
					{...(register('minAge'), { valueAsNumber: true })}
				/>
				<label htmlFor="maxAge" className={styles.label}>
					Maximum age:
				</label>
				<input
					className={styles.input}
					type="number"
					placeholder="maxAge"
					{...(register('maxAge'), { valueAsNumber: true })}
				/>
				<label htmlFor="location" className={styles.label}>
					Location:
				</label>
				<p>dropdown from api</p>
				<input
					className={styles.input}
					// type=""
					placeholder="location"
					{...register('location')}
				/>
				<label htmlFor="website" className={styles.label}>
					Website:
				</label>
				<input
					className={styles.input}
					type="url"
					placeholder="website"
					{...register('website')}
				/>
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
				<label htmlFor="endTime" className={styles.label}>
					End time:
				</label>
				<input
					className={styles.input}
					placeholder="endTime"
					type="time"
					{...register('endTime')}
				/>

				<input className={styles.input} type="submit" />
			</form>

			<p>Rules</p>
			<p>
				Only enter 1 event at a time - if your event has muktiple
				days, or muktiple times, pelase enter indivudally and the
				database will store as a single event. This simplifies the
				data processing.
			</p>
		</div>
	);
}
