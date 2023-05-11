import Content from './Content';

interface ModalProps {
	showModal: boolean;
	toggleModal: () => void;
	name: string;
	id: number;
	deleteLocation: (id: number) => Promise<void>;
	// deleteEvent: (id: number) => Promise<void>;
}

export default function Modal({
	showModal,
	toggleModal,
	name,
	id,
	deleteLocation,
}: ModalProps) {
	return (
		<div>
			{showModal && (
				<Content
					toggleModal={toggleModal}
					name={name}
					id={id}
					deleteLocation={deleteLocation}
				/>
			)}
		</div>
	);
}

// make deleteLocation optional and add deleteEvent
