import styles from '@/styles/Form.module.css';
import { Location } from '@prismatypes';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function Contact(props: {
	locationData?: Location;
	handleSubmitForm: SubmitHandler<Location>;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Location>({
		defaultValues: props.locationData,
	});

	const onSubmit = props.handleSubmitForm;

	return (
		<div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Location name:</label>
				<input
					className={styles.input}
					type="text"
					placeholder="Location name"
					{...register('name', {
						required: '⚠ Please enter a location name.',
					})}
				/>
				{errors.name && (
					<p className={styles.error}>{errors.name.message}</p>
				)}
				<label htmlFor="address">Address:</label>
				<input
					className={styles.input}
					type="text"
					placeholder="Address"
					{...register('address', {
						required: '⚠ Please enter an address.',
					})}
				/>
				{errors.address && (
					<p className={styles.error}>{errors.address.message}</p>
				)}
				<label htmlFor="website">Website:</label>
				<input
					className={styles.input}
					type="text"
					placeholder="Website (optional)"
					{...register('website')}
				/>
				{errors.website && (
					<p className={styles.error}>{errors.website.message}</p>
				)}
				<input
					type="submit"
					className={`${styles.input} ${styles.submit}`}
				/>
			</form>
		</div>
	);
}
