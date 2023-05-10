import { GetServerSideProps } from 'next';
import prisma from '@prismaclient';
import { Location } from '@prismatypes';
import styles from '@/styles/EventPage.module.css';
import moreStyles from '@/styles/Custom.module.css';
import EventMap from '@/components/EventMap';
import { useLocationStore } from '@/store/locationStore';
import Router from 'next/router';
import { useState, ReactNode } from 'react';

export const getServerSideProps: GetServerSideProps = async (
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

export default function LocationPage({
	location,
}: {
	location: Location;
}) {
	const {
		name,
		address,
		website,
		phone,
        updatedAt,
		lat,
		lng
	} = location;
	const locationUpdated = new Date(updatedAt).toLocaleDateString(
		'en-GB'
	);

	const latlng = {lat: lat, lng: lng} as google.maps.LatLngLiteral;


	// state flag for delete message
	const [deleteMessage, setDeleteMessage] = useState<ReactNode>('');
	const [errorMessage, setErrorMessage] = useState<ReactNode>('');
	const [showLocation, setShowLocation] = useState<boolean>(true);

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
				<div className={styles.event}>
					<div className={styles.eventContainer}>
						<div className={styles.eventSummary}>
							<div className={styles.eventHead}>
								<p className={styles.eventTitle}>{name}</p>
								
							</div>
							<div className={styles.eventGrid}>
								<p className={styles.eventText}>Address: </p>
								<p className={styles.eventText}>{address}</p>
								<p className={styles.eventText}>Website: </p>
								<p className={styles.eventText}>
									{website}
								</p>
								<p className={styles.eventText}>Phone: </p>
								<p className={styles.eventText}>
									{phone}
								</p>
								<p className={styles.eventText}>Website: </p>
								<p className={styles.eventText}>
									{website}
								</p>
							</div>
						</div>
						<div className={styles.eventSummary}>
							<p className={styles.eventHead}>
								Event venue: {name}
							</p>
							<div className={styles.mapContainer}>
								<EventMap name={name} latlng={latlng} />
							</div>
						</div>
					</div>
					<div className={styles.eventFooter}>
						<p className={styles.footerText}>
							Event last updated: {locationUpdated}
						</p>
						<button
							onClick={() => editLocation(location)}
							className={styles.footerButtons}>
							Edit location
						</button>
						<button
							onClick={() => deleteLocation(location.id)}
							className={styles.footerButtons}>
							Delete location
						</button>
					</div>
				</div>
			)}
			{deleteMessage}
			{errorMessage}
		</div>
	);
}
