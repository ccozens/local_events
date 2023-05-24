import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
	// go to page
	await page.goto('/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Weekly Events/);
});

test.describe('mobile navigation works', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		// click menu button
		await page.click('text=Menu');
	});

	test.afterEach(async ({ page }) => {
		// click menu button
		await page.click('text=Menu');
		// click Home link
		await page.click('text=Home');
		// Expects the URL to be /.
		await expect(page).toHaveURL('/');
		// expect title to be Weekly Events
		expect(page.getByRole('heading', { name: 'Weekly Events' }));
	});

	test('home to Create event', async ({ page }) => {
		// click Create an event link
		await page.click('text=Create an event');
		// Expects the URL to contain events.
		await expect(page).toHaveURL(/events/);
		// expect title to be Create an event
		expect(page.getByRole('heading', { name: 'Create an event' }));
	});

	test('home to Locations', async ({ page }) => {
		// click Locations link
		await page.click('text=Locations');
		// Expects the URL to contain locations.
		await expect(page).toHaveURL(/locations/);
		// expect title to be Locations
		expect(page.getByRole('heading', { name: 'Locations' }));
	});
	test('home to About', async ({ page }) => {
		// click About link
		await page.click('text=About');
		// Expects the URL to contain about.
		await expect(page).toHaveURL(/about/);
		// expect title to be About
		expect(page.getByRole('heading', { name: 'About' }));
	});
	test('home to Contact me', async ({ page }) => {
		// clock Contact me link
		await page.click('text=Contact me');
		// Expects the URL to contain contact.
		await expect(page).toHaveURL(/contact/);
		// expect title to be Contact me
		expect(page.getByRole('heading', { name: 'Contact me' }));
	});
});
