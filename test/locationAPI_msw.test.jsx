import { test, expect } from 'vitest';

test('2+2', () => { expect(2 + 2).toBe(4) })

/* import { describe, expect, test, vi, spyOn } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Locations from '../src/pages/locations';
import LocationForm from '../src/components/forms/LocationForm';
import PlacesSearch from '../src/components/PlacesSearch';
import React from 'react';
import * as ReactGoogleMapsApi from '@react-google-maps/api';

// mock use-places-autocomplete
/* vi.mock('use-places-autocomplete', async () => {
	// const usePlacesAutocomplete = await importOriginal();
    const usePlacesAutocomplete = await vi.importActual('use-places-autocomplete');
	const mockUsePlacesAutocomplete = vi.fn();
	const mockGetDetails = vi.fn();
	const mockGetGeocode = vi.fn();
	const mockGetLatLng = vi.fn();

	return {
        // return original module with exports replaced by mocks
		...usePlacesAutocomplete,
		default: mockUsePlacesAutocomplete,
		getDetails: mockGetDetails,
		getGeocode: mockGetGeocode,
		getLatLng: mockGetLatLng,
	};
}); */

/*
test("shows 'Location search' text", async () => {
    vi.spyOn(ReactGoogleMapsApi, 'useJsApiLoader').mockReturnValue({
        isLoaded: true,
        loadError: null,
    });

    // mock usePlacesAutocomplete so that PlacesSearch component renders
    vi.mock('use-places-autocomplete', async () => {
        const actual = await vi.importActual('use-places-autocomplete');
        const mockUsePlacesAutocomplete = {
            ready: true,
            value: '',
            suggestions: [
                {
                    name: 'Tower Bridge',
                    formatted_address: 'Tower Bridge, London SE1 2UP, United Kingdom',
                    website: 'http://www.towerbridge.org.uk/',
                    phone: '020 7403 3761',
                    geometry: {
                        location: {
                            lat: () => 51.5054564,
                            lng: () => -0.0753565,
                        },
                    },
                },
            ],
            setValue: vi.fn(),
            clearSuggestions: vi.fn(),
        };
    
        return {
            ...actual,
            usePlacesAutocomplete: mockUsePlacesAutocomplete,
        };
    });
    const user = userEvent.setup();
    
    render(<PlacesSearch />);
    // check it loaded
    expect(screen.getByText('Location search')).toBeInTheDocument();
    const inputBox = screen.getByRole('textbox');
    expect(inputBox).toBeInTheDocument();

    await user.click(inputBox);
    await waitFor(() => expect(inputBox).toHaveFocus());
    await user.type(inputBox, 'Tower Bridge');
    // expect(inputBox).toHaveValue('Tower Bridge');
    const towerBridgeElement = await screen.findByText('Tower Bridge');
    expect(towerBridgeElement).toBeInTheDocument();
});
*/
    // expect(screen.getByText('Tower Bridge')).toBeInTheDocument();

/* test ('placessearch renders correctly with mocked functions', async () => {
    const mockUseJsApiLoader = vi.fn();

    mockUseJsApiLoader.mockReturnValue({
        isLoaded: true,
        loadError: null,
    });


    render(<PlacesSearch />);
    expect(mockUseJsApiLoader).toHaveBeenCalled();
    expect(screen.getByText('Location search')).toBeInTheDocument();

}) */

// describe('create location', () => {
// 	test('location page renders and use-places-autocomplete search box displays on click', async () => {

// 		const user = userEvent.setup();
// 		render(<Locations locations={[]} />);

//         // mock useJsApiLoader so that PlacesSearch component renders
//         // vi.spyOn(React, 'useJsApiLoader').mockReturnValue({
//         //     isLoaded: true,
//         //     loadError: null,
//         // });
        

// 		const button = screen.getByRole('button', {
// 			name: 'Add Location',
// 		});
// 		expect(button).toBeInTheDocument();
// 		await user.click(button);
// 		const text = 'Create a location';
// 		expect(screen.getByText(text)).toBeInTheDocument();
// 	});

   
// 	/* test('location form displays correctly', async () => {
// 		render(
// 			<>
// 				<LocationForm showForm={true} onClick={() => {}} />
// 			</>
// 		);
// 		expect(screen.getByText('Create a location')).toBeInTheDocument();
// 	});

// 	test('mock text input and suggestion return from places autocomplete', async () => {
//         const mockUsePlacesAutocomplete = vi.fn();
// 		const mockGetDetails = mockUsePlacesAutocomplete.getDetails;
// 		const mockGetGeocode = mockUsePlacesAutocomplete.getGeocode;
// 		const mockGetLatLng = mockUsePlacesAutocomplete.getLatLng;



// 		mockUsePlacesAutocomplete.mockReturnValue({
// 			ready: true,
// 			value: '',
// 			suggestions: [
// 				{
// 					name: 'Tower Bridge',
// 					formatted_address:
// 						'Tower Bridge, London SE1 2UP, United Kingdom',
// 					website: 'http://www.towerbridge.org.uk/',
// 					phone: '020 7403 3761',
// 					geometry: {
// 						location: {
// 							lat: () => 51.5054564,
// 							lng: () => -0.0753565,
// 						},
// 					},
// 				},
// 			],
// 			setValue: vi.fn(),
// 			clearSuggestions: vi.fn(),
// 		});

//         /* mockGetDetails.mockReturnValue(
// 			Promise.resolve({
// 				name: 'Tower Bridge',
// 				formatted_address:
// 					'Tower Bridge, London SE1 2UP, United Kingdom',
// 				website: 'http://www.towerbridge.org.uk/',
// 				phone: '020 7403 3761',
// 				geometry: {
// 					location: {
// 						lat: () => 51.5054564,
// 						lng: () => -0.0753565,
// 					},
// 				},
// 			})
// 		); */

//         /* mockGetGeocode.mockReturnValue(
//             Promise.resolve([
//                 {
//                     address_components: [
//                         {
//                             long_name: 'Tower Bridge',
//                             short_name: 'Tower Bridge',
//                             types: ['premise'],
//                         },
//                         {
//                             long_name: 'Tower Bridge Road',
//                             short_name: 'Tower Bridge Rd',
//                             types: ['route'],
//                         },
//                         {
//                             long_name: 'London',
//                             short_name: 'London',
//                             types: ['postal_town'],
//                         },
//                         {
//                             long_name: 'Greater London',
//                             short_name: 'Greater London',
//                             types: ['administrative_area_level_2', 'political'],
//                         },
//                         {
//                             long_name: 'England',
//                             short_name: 'England',
//                             types: ['administrative_area_level_1', 'political'],
//                         },
//                         {
//                             long_name: 'United Kingdom',
//                             short_name: 'GB',
//                             types: ['country', 'political'],
//                         },
//                         {
//                             long_name: 'SE1 2UP',
//                             short_name: 'SE1 2UP',
//                             types: ['postal_code'],
//                         },
//                     ],
//                     formatted_address:
//                         'Tower Bridge, Tower Bridge Road, London SE1 2UP, UK',
//                     geometry: {
//                         bounds: {
//                             east: -0.07400791970849797,
//                             north: 51.5054564,
//                             south: 51.5044574197085,
//                             west: -0.07570588029150203,
//                         },
//                         location: {
//                             lat: 51.5054564,
//                             lng: -0.0753565,
//                         },
//                         location_type: 'ROOFTOP',
//                         viewport: {
//                             northeast: {
//                                 lat: 51.5068053802915,
//                                 lng: -0.07400791970849797,
//                             },
//                             southwest: {
//                                 lat: 51.5041074197085,
//                                 lng: -0.07670588029150202,
//                             },
//                         },
//                     },
//                     place_id: 'ChIJq6qq6yQDdkgRZM2a9KJrX0M',
//                     types: ['premise'],
//                 },
//             ])
//         ); */

//    /*      mockGetLatLng.mockReturnValue(
//             Promise.resolve({
//                 lat: 51.5054564,
//                 lng: -0.0753565,
//             })
//         ); */
//    /*          // spyOn useJsApiLoader
//         vi.spyOn(React, 'useJsApiLoader').mockReturnValue({
//             isLoaded: true,
//             loadError: null,
//         });

// 		render(<PlacesSearch isLoaded={true}/>);
//         expect(useJsApiLoaderSpy).toHaveBeenCalled();
//             // showtestingplaygroundurl
//             screen.logTestingPlaygroundURL();
// 		// Add your assertions for the PlacesSearch component here
// 		// const input = screen.getByRole('textbox');
// 		const user = userEvent.setup();
// 		await user.type(input, 'Tower Bridge');

// 		expect(mockUsePlacesAutocomplete).toHaveBeenCalled();
// 		expect(mockUsePlacesAutocomplete).toHaveBeenCalledWith({
// 			requestOptions: {
// 				name: 'Tower Bridge',
// 			},
// 		});
// 		expect(screen.getByText('Tower Bridge')).toBeInTheDocument();
// 	}); */
// });
