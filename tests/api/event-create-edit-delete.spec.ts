import { test, expect } from '@playwright/test';

test('fill out form and create event', async ({ page }) => {
	await page.goto('/events');
	await page.getByPlaceholder('Event name').click();
	await page.getByPlaceholder('Event name').fill('Test Event');
	await page.getByPlaceholder('Event description (optional)').click();
	await page
		.getByPlaceholder('Event description (optional)')
		.fill('playwright is testing for me');
	await page.locator('select[name="day"]').selectOption('Wednesday');
	await page.locator('input[name="minAgeYears"]').click();
	await page.locator('input[name="minAgeYears"]').fill('01');
	await page.locator('input[name="minAgeYears"]').press('Tab');
	await page.locator('input[name="minAgeMonths"]').fill('2');
	await page.locator('input[name="minAgeMonths"]').press('Tab');
	await page.locator('input[name="maxAgeYears"]').fill('3');
	await page.locator('input[name="maxAgeYears"]').press('Tab');
	await page.locator('input[name="maxAgeMonths"]').fill('4');
	await page.locator('select[name="locationId"]').selectOption('6');
	await page.getByPlaceholder('Event website (optional)').click();
	await page
		.getByPlaceholder('Event website (optional)')
		.fill('www.localevents.info');
	await page
		.getByPlaceholder("Organiser's phone number (optional)")
		.click();
	await page
		.getByPlaceholder("Organiser's phone number (optional)")
		.fill('1234');
	await page
		.getByPlaceholder("Organiser's phone number (optional)")
		.press('Tab');
	await page
		.getByPlaceholder("Organiser's email address (optional)")
		.fill('officechrisgarden@gmail.com');
	await page.getByPlaceholder('Cost (enter 0 if free)').click();
	await page.getByPlaceholder('Cost (enter 0 if free)').fill('01');
	await page.locator('input[name="donation"]').check();
	await page.locator('input[name="donation"]').check();
	await page.getByPlaceholder('Event start time (24 hour)').click();
	await page
		.getByPlaceholder('Event start time (24 hour)')
		.press('ArrowLeft');
	await page
		.getByPlaceholder('Event start time (24 hour)')
		.fill('09:00');
	await page
		.getByPlaceholder('Event start time (24 hour)')
		.press('ArrowRight');
	await page
		.getByPlaceholder('Event start time (24 hour)')
		.fill('09:15');
	await page
		.getByPlaceholder('Event start time (24 hour)')
		.press('Tab');
	await page.locator('input[name="endTime"]').fill('10:40');
	await page.getByRole('button', { name: 'Submit' }).click();
	// expect success message
	await page.waitForSelector('text=Event created successfully');
	expect(
		await page.isVisible('text=Event created successfully')
	).toBeTruthy();

	// });

	// test('edit event', async ({ page }) => {
	// 	await page.goto('/');
	await expect(page.getByText('Test Event')).toBeVisible();
	await page
		.getByRole('heading', { name: 'Test Event' })
		.first()
		.click();
	await page.click('text=Edit event');
	await page.getByPlaceholder('Event name').click();
	await page.getByPlaceholder('Event name').fill('Test Event 2');
	await page.getByRole('button', { name: 'Submit' }).click();
	// expect success message
	await page.waitForSelector('text=Event updated successfully');
	expect(
		await page.isVisible('text=Event updated successfully')
	).toBeTruthy();
	// expect event to be in database
	await page.goto('/');
	expect(page.getByRole('heading', { name: 'Test Event 2' }));
	// });

	// test('delete event', async ({ page }) => {
	// await page.goto('/');
	// await expect(page.getByText('Test Event 2')).toBeVisible();
	await page
		.getByRole('heading', { name: /Test Event 2/i })
		.first()
		.click();
	await page.getByRole('button', { name: 'Delete event' }).click();
	await page
		.getByRole('button', { name: 'Delete', exact: true })
		.click();
	// expect success message
	await page.waitForSelector('text=Event deleted successfully');
	expect(
		await page.isVisible('text=Event deleted successfully')
	).toBeTruthy();
	// expect event not to be in database
	await page.goto('/');

	// expect 'test event 2' not to be on the page
	// expect(page.isVisible('text=Test Event 2')).not.toBeTruthy();
	await expect(page.getByText('Test Event')).not.toBeVisible();
});
