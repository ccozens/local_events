import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export async function placesRequest (location: string) {
    const response = await client.placeAutocomplete({
        params: {
            input: location,
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        },
        timeout: 1000, // milliseconds
    });
    return response.data.predictions;
}