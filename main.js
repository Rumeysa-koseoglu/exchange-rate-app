const numberInput = document.querySelector("#number");
const firstOption = document.querySelector("#firstCurrencyOption");
const secondOption = document.querySelector("#secondCurrencyOption");
const resultInput = document.querySelector("#result");

//creates an object from Currency class in currency.js file
const currency = new Currency();

runEventListeners();

function runEventListeners() {
    numberInput.addEventListener("input", exchange);
}

function exchange() {

 const inputValue = numberInput.value.trim();

 // if the input area is empty, we also clear result
    if (!inputValue) {
        resultInput.value = "";
        return;
    }

    //get user entered value and currencies
    const value = Number(numberInput.value.trim());
    const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent;

    const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent;

    // make an API call and calculate the exchange result and display it on the screen
    currency.exchange(value, firstOptionValue, secondOptionValue)

    .then((result) => {
        resultInput.value = result.toFixed(3)
    })

   
    
}