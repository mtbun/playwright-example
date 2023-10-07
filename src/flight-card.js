const { Helper } = require("./helper");

exports.FlightCard = class FlightCard extends Helper {
	constructor(page) {
		super(page);
		
		// trip way selectors
		this.chooseWaySelectBox = page.getByText('arrow_drop_down').first();
		this.oneWayButton = page.getByRole('button', { name: 'One way' });
		this.roundButton = page.getByRole('button', { name: 'Round trip' });

		//airport selectors
		this.fromWhereSelectbox = page.locator(' div.route-selection-origin ');
		this.toWhereSelectbox = page.locator(' div.route-selection-destination ');
		this.searchAirportPlaceholder = page.getByPlaceholder('Search airport');
		this.firstSuggestedAirportOption = page.locator('div.airport-option');

		this.departureDate = page.getByPlaceholder('dd/mm');

		this.findFlightsButton = page.getByRole('button', { name: 'Find flights' });
	}


	/**
	 * Selects the specified trip way.
	 * @param {'One way', 'Round trip'} way 
	 */
	async selectTripWay(way){

		await this.chooseWaySelectBox.click();
		switch(way) {
			default:
				// Select 'One way' by default
				await this.oneWayButton.click();
				break;
			case 'One way':
				// Select 'One way'
				await this.oneWayButton.click();
				break;
			case 'Round trip':
				// Select 'Round trip'
				await this.roundButton.click();
				break;
		}
	}
	
	/**
	 * Select airport cities
	 * @param {'fromWhere'} fromCity 
	 * @param {'towhere'} toCity 
	 */
	async selectFromTo(fromCity, toCity){
		await this.fromWhereSelectbox.click();
		await this.searchAirportPlaceholder.fill(fromCity);
		await this.firstSuggestedAirportOption.click();

		await this.toWhereSelectbox.click();
		await this.searchAirportPlaceholder.fill(toCity);
		await this.firstSuggestedAirportOption.click();
	}
}
