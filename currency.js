class Currency {
    constructor() {//Constructor: is the constructive function of this class. the base URL of the API is defined inside.
        this.url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_vzh0fP41hVFhwQJB9pjH4x4YN7qnylrXoxYj8kyc&base_currency="
    }

    //fetch JSON data from API
    async exchange(value, firstCurrency, secondCurrency) {
        //add firstCurrency to as base currency in the URL
        const response = await fetch(`${this.url}${firstCurrency}`);
        const result = await response.json();
        //the amount (value) you enter is multiplied by this rate and the converted value is calculated
        const convertedResult = value * result.data[secondCurrency];

        return convertedResult
    }
}