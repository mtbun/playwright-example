const { FlightCard } = require('../src/flight-card');
const { test, expect } = require('@playwright/test');

test.beforeEach( async ({ page }) => {

    const flightCard = new FlightCard(page);

    await page.goto('/');
    await flightCard.selectLanguageEN();
    await flightCard.acceptCookies();

    expect('Air Malta | The Airline of the Maltese Islands : Air Malta').toBe(await page.title())
});

/**
 * Test Suite
 * Single Trip
 * Economy Class
 */
test.describe(' Flight Card Test Cases, Single Trip, Economy,', () => {

    test('Find earliest ticket price', async ({ page }) => {

        const flightCard = new FlightCard(page);
        await flightCard.selectTripWay('One way');
        await flightCard.selectFromTo('vienna', 'malta');
        await flightCard.departureDate.click();


        let allDaysInCalendar = await page.locator('div.DayPicker-Day');
        for (let i = 0; i<77; i++){
            const day = await allDaysInCalendar.nth(i);
            const isDisabled = await day.getAttribute('aria-disabled');
        
            if (isDisabled === 'false') {
                console.log('Earliest Date: ',await day.getAttribute('aria-label'));
                console.log('Earliest Date Ticket Price: ', await day.locator('div>div.calendar-flight-price').textContent());
                break;
            }
        }
    });

});