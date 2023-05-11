interface ContentProps {
	toggleModal: () => void;
	name: string;
	id: number;
	deleteLocation: (id: number) => Promise<void>;
	// deleteEvent: (id: number) => Promise<void>;
}
import styles from '@/styles/Modal.module.css';

export default function Content({
	toggleModal,
	name,
	id,
	deleteLocation,
}: ContentProps) {
	const confirm = () => {
		if (deleteLocation) deleteLocation(id);
		// if (deleteEvent) deleteEvent(id);
		toggleModal();
	};

	return (
		<div className={styles.modal}>
			<p> Are you sure you want to delete {name}? </p>
			<div className={styles.modalButtonContainer}>
				<button 
                className={styles.modalButtons} 
                onClick={confirm}>
					Delete
				</button>
				<button 
                className={styles.modalButtons} 
                onClick={toggleModal}>
					Cancel
				</button>
			</div>
		</div>
	);
}
