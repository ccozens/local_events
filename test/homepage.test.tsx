import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// import modules to test
// import home module from pages/index.tsx
// import Home from '@/pages/index';
// import { getStaticPaths } from '@/pages/index';
import EventCard from '../src/components/EventCard';
import { mockEvent } from './mockData/mockEvent';

describe('Homepage testing', () => {
	test('EventCard renders', () => {
		render(<EventCard event={mockEvent} />);
		const mockEventName: string = mockEvent.name;
		const mockEventLocation: string = mockEvent.location.name;
		screen.logTestingPlaygroundURL();
		// tests
		expect(screen.getByText(mockEventName)).toBeInTheDocument();
		expect(
			screen.getByText(new RegExp(`venue${mockEventLocation}`, 'i'))
		).toBeInTheDocument();
	});
});
