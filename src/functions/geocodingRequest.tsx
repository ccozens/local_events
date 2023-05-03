import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export async function geocodingRequest (locationAddress: string): Promise<{lat: number, lng: number} | undefined> {
    const response = await client.geocode({
        params: {
            address: locationAddress,
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        },
        timeout: 1000, // milliseconds
    });
    return response.data.results[0].geometry.location;

}

// https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters