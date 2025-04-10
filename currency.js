class Currency {
    constructor() {
        this.url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_vzh0fP41hVFhwQJB9pjH4x4YN7qnylrXoxYj8kyc&base_currency="
    }

    async exchange(value, firstCurrency, secondCurrency) {
        const response = await fetch(`${this.url}${firstCurrency}`);
        const result = await response.json();
        const convertedResult = value * result.data[secondCurrency];

        return convertedResult
    }
}