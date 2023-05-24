import { test, expect } from '@playwright/test';

describe ('Create Event', () => {

    test('fill out form', async ({ page }) => {
        await page.goto('http://localhost:3000/events/');
        

});