import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
	// go to page
	await page.goto('/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Weekly Events/);
});

test.describe('desktop navigation works', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});
	test.afterEach(async ({ page }) => {
		// click Home link
		await page.click('text=Home');
		// Expects the URL to be /.
		await expect(page).toHaveURL('/');
		// expect title to be Weekly Events
		expect(page.getByRole('heading', { name: 'Weekly Events' }));
	});

	test('events page test', async ({ page }) => {
		// click Create an event link
		await page.click('text=Create an event');
		// Expects the URL to contain events.
		await expect(page).toHaveURL(/events/);
		// expect title to be Create an event
		expect(page.getByRole('heading', { name: 'Create an event' }));
	});
	test('locations page test', async ({ page }) => {
		// click Locations link
		await page.click('text=Locations');
		// Expects the URL to contain locations.
		await expect(page).toHaveURL(/locations/);
		// expect title to be Locations
		expect(page.getByRole('heading', { name: 'Locations' }));
	});
	test('about page test', async ({ page }) => {
		// click About link
		await page.click('text=About');
		// Expects the URL to contain about.
		await expect(page).toHaveURL(/about/);
		// expect title to be About
		expect(page.getByRole('heading', { name: 'About' }));
	});
	test('contact page test', async ({ page }) => {
		// clock Contact me link
		await page.click('text=Contact me');
		// Expects the URL to contain contact.
		await expect(page).toHaveURL(/contact/);
		// expect title to be Contact me
		expect(page.getByRole('heading', { name: 'Contact me' }));
	});
});
