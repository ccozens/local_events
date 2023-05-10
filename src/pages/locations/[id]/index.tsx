import { GetServerSideProps } from 'next';
import prisma from '@prismaclient';
import { Location } from '@prismatypes';
import styles from '@/styles/LocationPage.module.css';
import moreStyles from '@/styles/Custom.module.css';
import EventMap from '@/components/EventMap';
import { useLocationStore } from '@/store/locationStore';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import Link from 'next/link';

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
	const { name, address, website, phone, updatedAt, lat, lng } =
		location;
	const locationUpdated = new Date(updatedAt).toLocaleDateString(
		'en-GB'
	);

	const latlng = { lat: lat, lng: lng } as google.maps.LatLngLiteral;

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
								{website ? (
									<Link
										href={website}
										target="_blank"
										className={styles.locationText}>
										{website}
									</Link>
								) : (
									<p className={styles.locationText}>
										No website available
									</p>
								)}
								<p className={styles.locationTextLabel}>Phone: </p>
								<p className={styles.locationText}>
									{phone ? phone : 'No phone available'}
								</p>
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
