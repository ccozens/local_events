import { Event } from '@prismatypes';
import styles from '@/styles/Form.module.css';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
		cost: z.number(),
		termTime: z.boolean().default(false),
		minAge: z.number().min(0),
		maxAge: z.number().min(0),
		location: z.string().nonempty(),
		website: z.string().url().optional(),
		phone: z.string().optional(),
		email: z.string().email().optional(),
		startTime: z.string().nonempty().max(4),
		endTime: z.string().nonempty().max(4),
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Event>({
		resolver: zodResolver(eventSchema),
	});

	const onSubmit: SubmitHandler<Event> = (data) => console.log(data);
	const watchAllFields = watch();
	console.log(watchAllFields.day);

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.createEvent}>
				<label htmlFor="name">Event name:</label>
				<input type="text" {...register('name')} />
				{errors.name && <p>{errors.name.message}</p>}
				<fieldset className={styles.dayOptions}>
				<legend >Day:</legend>
				<label htmlFor="day" >Monday</label>
				<input type="checkbox" value="Monday" {...register('day')} />
				<label htmlFor="day" >Tuesday</label>
				<input type="checkbox" value="Tuesday" {...register('day')} />
				<label htmlFor="day" >Wednesday</label>
				<input
					type="checkbox"
					value="Wednesday"
					{...register('day')}
				/>
				<label htmlFor="day" >Thursday</label>
				<input
					type="checkbox"
					value="Thursday"
					{...register('day')}
				/>
				<label htmlFor="day" >Friday</label>
				<input type="checkbox" value="Friday" {...register('day')} />
				<label htmlFor="day" >Saturday</label>
				<input
					type="checkbox"
					value="Saturday"
					{...register('day')}
				/>
				<label htmlFor="day" >Sunday</label>
				</fieldset>
				<input type="checkbox" value="Sunday" {...register('day')} />
				<label htmlFor="description">Description:</label>
				<input type="text" {...register('description')} />
				<label htmlFor="cost">Cost:</label>
				<input type="number" {...register('cost')} />
				<label htmlFor="termTime">Term Time:</label>
				<input type="checkbox" {...register('termTime')} />
				<label htmlFor="minAge">Min Age:</label>
				<input type="number" {...register('minAge')} />
				<label htmlFor="maxAge">Max Age:</label>
				<input type="number" {...register('maxAge')} />
				<label htmlFor="location">Location:</label>
				<input type="text" {...register('location')} />
				<label htmlFor="website">Website:</label>
				<input type="text" {...register('website')} />
				<label htmlFor="phone">Phone:</label>
				<input type="text" {...register('phone')} />
				<label htmlFor="email">Email:</label>
				<input type="email" {...register('email')} />
				{errors.email && <p>{errors.email.message}</p>}
				<label htmlFor="startTime">Start Time:</label>
				<input type="text" {...register('startTime')} />
				<label htmlFor="endTime">End Time:</label>
				<input type="text" {...register('endTime')} />

				<input type="submit" />
			</form>
		</div>
	);
}
