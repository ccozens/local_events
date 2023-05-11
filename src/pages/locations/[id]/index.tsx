import { GetStaticProps, GetStaticPaths } from 'next';
import prisma from '@prismaclient';
import { Location } from '@prismatypes';
import styles from '@/styles/LocationPage.module.css';
import moreStyles from '@/styles/Custom.module.css';
import EventMap from '@/components/EventMap';
import { useLocationStore } from '@/store/locationStore';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import Link from 'next/link';
import Modal from '@/components/confirmation/Modal';

export const getStaticProps: GetStaticProps = async (
	context
) => {
	const locationId = context.params?.id;
	const location = await prisma.location.findUnique({
		where: { id: Number(locationId) },
	});

	return {
		props: { location: JSON.parse(JSON.stringify(location)) },
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const events = await prisma.location.findMany({
	});
	const paths = events.map((event) => ({
		params: { id: event.id.toString() },
	}));
	return { paths, fallback: 'blocking' // pre-render at build. {fallback: 'blocking'} server-renders pages on demand if path doesn't exist
	 };
};



export default function LocationPage({
	location,
}: {
	location: Location;
}) {
	const { name, address, website, phone, updatedAt, lat, lng } =
		location;
		const websitePresent = website ? (
			<Link
				className={`${styles.locationText} ${styles.locationLink}`}
				href={website}
				target="_blank"
				rel="noreferrer">
				{website}
			</Link>
		) : (
			<p className={styles.locationText}>unknown</p>
		);
		const phonePresent = phone ? (
			<Link
				className={`${styles.locationText} ${styles.locationLink}`}
				href={`tel:${phone}`}>
				{phone}
			</Link>
		) : (
			<p className={styles.locationText}>unknown</p>
		);

		const locationUpdated = new Date(updatedAt).toLocaleDateString(
		'en-GB'
	);

	const latlng = { lat: lat, lng: lng } as google.maps.LatLngLiteral;

	// state flag for delete message
	const [deleteMessage, setDeleteMessage] = useState<ReactNode>('');
	const [errorMessage, setErrorMessage] = useState<ReactNode>('');
	const [showLocation, setShowLocation] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
    const toggleModal = () => setShowModal(!showModal);
    
	// store location details in zustand store and push to edit location page
	const editLocation = (location: Location) => {
		// update location store with location details
		useLocationStore.setState({
			location: location,
		});
		// push to edit location page
		Router.push(`/locations/${location.id}/edit`);
	};

	//  delete location from database
	const deleteLocation = async (id: number): Promise<void> => {
		const response = await fetch(`/api/locations/${id}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			setTimeout(() => {
				Router.push(`/locations`);
			}, 750);
			setDeleteMessage(
				<p className={moreStyles.successMessage}>
					Location deleted successfully.
				</p>
			),
				setShowLocation(false);
		} else {
			console.error(response.statusText);
			setErrorMessage(
				<p className={moreStyles.successMessage}>
					Failed to delete location: {response.statusText}
				</p>
			);
		}
	};

	return (
		<div>
			{showLocation && (
				<div className={styles.location}>
					<div className={styles.locationContainer}>
						<div className={styles.locationSummary}>
								<div className={styles.locationTitle}>{name}</div>
							<div >
								<p className={styles.locationTextLabel}>Address: </p>
								<p className={styles.locationText}>
									{address ? address : 'No address available'}
								</p>
								<p className={styles.locationTextLabel}>Website: </p>
								{websitePresent}
								<p className={styles.locationTextLabel}>Phone: </p>
								{phonePresent}
							</div>
						</div>
						<div className={styles.locationSummary}>
							<div className={styles.mapContainer}>
								<EventMap name={name} latlng={latlng} />
							</div>
						</div>
					</div>
					<div className={styles.locationFooter}>
						<p className={styles.footerText}>
							Event last updated: {locationUpdated}
						</p>
						<button
							onClick={() => editLocation(location)}
							className={styles.footerButtons}>
							Edit location
						</button>
						<button
							onClick={toggleModal}
							className={styles.footerButtons}>
							Delete location
						</button>
					</div>
				</div>
			)}
			{showModal && (
				<Modal
					showModal={showModal}
					toggleModal={toggleModal}
					name={location.name}
					id={location.id}
					deleteLocation={deleteLocation}
				/>
			)}
			{deleteMessage}
			{errorMessage}
		</div>
	);
}
