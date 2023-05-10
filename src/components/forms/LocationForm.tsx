import styles from '@/styles/Form.module.css';
import PlacesSearch from '@/components/PlacesSearch';

export default function LocationForm(props: {
	showForm: boolean;
	onClick: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	  ) => void;
	}) 
	
	{
	return (
		<div>
			<div className={styles.form}>
				{props.showForm && <PlacesSearch />}
				<button className={`${styles.input} ${styles.submit} ${styles.locationButton}`}
					onClick={props.onClick} >
				Add Location
				</button>
			</div>
		</div>
	);
}