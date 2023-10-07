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

    /*WARNING: 
        This test select price on calendar before click. 
        If there is no price on calendar, clicks link and select earliest ticket price
        If there is avaliable economy ticket and business ticket after click, select economy ticket price
        If there is only business ticket earliest time, select business ticket
        
        PRIORITY:
                listed on calendar(cheapest) >> earliest compare to other flights >> ECONOMY if both are earliest

        TODO: don't get price on the calendar, after click select earliest ticket price(economy or business)
        Solution: Click first {"aria-disabled" = false} date. Then, find earliest ticket on there! 
        It is easy to do it, I would like to show different use-case.

        If we consider the 'earliest ticket' as the day, we do not need to do this. Otherwise, if time is also important, we should apply it.
    */
    test('Find earliest ticket price', async ({ page }) => {

        const flightCard = new FlightCard(page);
        // Select trip way 'One way' or 'Round trip'
        await flightCard.selectTripWay('One way');
        // Select airport
        await flightCard.selectFromTo('vienna', 'malta');
        // Click departure date field
        await flightCard.departureDate.click();
        // Get all days on the calendar
        let allDaysInCalendar = await page.locator('div.DayPicker-Day');
        for (let i = 0; i<77; i++){
            const day = await allDaysInCalendar.nth(i);
            const isDisabled = await day.getAttribute('aria-disabled');
            
            // If the ariaLabel is disabled, that means there is flight on this date.
            if (isDisabled === 'false') {
                console.log('Earliest Date: ',await day.getAttribute('aria-label'));

                // If there is no price in calendar
                if(!await day.locator('div>div.calendar-flight-price').textContent()){
                    await day.click();
                    await flightCard.findFlightsButton.click();
                    console.log('Earliest Date Ticket Price:', await page.locator('div.sc-hXCwRK.htLVpg > div > div').nth(0).textContent());
                }
                else{
                    console.log('Earliest Date Ticket Price: ', await day.locator('div>div.calendar-flight-price').textContent());
                }
                break;
            }
        }
    });

});