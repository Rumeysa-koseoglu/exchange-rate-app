const numberInput = document.querySelector("#number");
const firstOption = document.querySelector("#firstCurrencyOption");
const secondOption = document.querySelector("#secondCurrencyOption");
const resultInput = document.querySelector("#result");

const currency = new Currency();

runEventListeners();

function runEventListeners() {
    numberInput.addEventListener("input", exchange);
}

function exchange() {
    const value = Number(numberInput.value.trim());
    const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent;

    const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent;

    currency.exchange(value, firstOptionValue, secondOptionValue)

    .then((result) => {
        resultInput.value = result.toFixed(3)
    })
}