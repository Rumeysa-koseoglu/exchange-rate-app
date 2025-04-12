const numberInput = document.querySelector("#number");
const firstOption = document.querySelector("#firstCurrencyOption");
const secondOption = document.querySelector("#secondCurrencyOption");
const resultInput = document.querySelector("#result");
const numpad = document.querySelector("#numpad");

const numpadValues = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "clear",
    "0",
    "delete",
    ];

const currencySymbols = {
    USD: "$",
    JPY: "¥",
    BGN: "лв",
    CZK: "Kč",
    DKK: "kr",
    EUR: "€",
    GBP: "£",
    HUF: "Ft",
    PLN: "zł ",
    RON: "lei",
    SEK: "kr ",
    CHF: "SFr",
    ISK: "kr ",
    NOK: "kr ",
    HRK: "kn",
    RUB: "₽",
    TRY: "₺",
    AUD: "AU$",
    BRL: "R$",
    CAD: "C$",
    CNY: "¥",
    HKD: "HK$",
    IDR: "Rp",
    ILS: "₪",
    INR: "₹",
    KRW: "₩",
    MXN: "Mex$",
    MYR: "RM",
    NZD: "NZ$",
    PHP: "₱",
    SGD: "S$",
    THB: "฿",
    ZAR: "R",
    // Daha fazlası eklenebilir
  };
//creates an object from Currency class in currency.js file
const currency = new Currency();


function prepareNumpad() {
    for (let i = 0; i < numpadValues.length; i++) {
        const button = document.createElement("div");

        button.dataset.value = numpadValues[i];
        button.classList.add("numbers");
        button.addEventListener("click", clickNumpad);

        if(numpadValues[i] === "clear") {
            const icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-broom");
            icon.style.color = "#FFD43B";

            button.appendChild(icon);
        }else if (numpadValues[i] === "delete") {
            const icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-delete-left");
            icon.style.color = "#B197FC";

            button.appendChild(icon);
        }else{
         button.textContent = numpadValues[i];
        }

        numpad.appendChild(button);
    }
}


function prepareOptions() {

    const keys = Object.keys(currencySymbols);
    const values = Object.values(currencySymbols);

    // Create options for the first select element
    for (let i = 0; i < keys.length; i++) {
      const option = document.createElement("option");

      option.value = keys[i];
      option.textContent = keys[i]

      firstOption.appendChild(option);
      secondOption.appendChild(option.cloneNode(true));
    }

    firstOption.children[0].selected = true;
    secondOption.children[5].selected = true;
}


prepareOptions();
prepareNumpad();
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

  const firstOptionValue =
    firstOption.options[firstOption.selectedIndex].textContent;
  const secondOptionValue =
    secondOption.options[secondOption.selectedIndex].textContent;

  // make an API call and calculate the exchange result and display it on the screen
  currency
    .exchange(value, firstOptionValue, secondOptionValue)
    .then((result) => {
      resultInput.value = result.toFixed(3);
    });
}

const symbolFirst = document.querySelector("#symbol-first");
const symbolSecond = document.querySelector("#symbol-second");

firstOption.addEventListener("change", updateSymbols);
secondOption.addEventListener("change", updateSymbols);

function updateSymbols() {
  const firstCurrency = firstOption.value;
  const secondCurrency = secondOption.value;

  symbolFirst.textContent = currencySymbols[firstCurrency] || firstCurrency;
  symbolSecond.textContent = currencySymbols[secondCurrency] || secondCurrency;
}

// İlk yüklemede sembolleri göster
updateSymbols();

function clickNumpad(event) {
  const value = event.currentTarget.dataset.value;

  if (value === "clear") {
    clickClear();
  } else if (value === "delete") {
    console.log("clicked delete!");
    clickDelete();
  } else {
    numberInput.value += value;
    exchange();
  }
}

function clickClear() {
  numberInput.value = "";
  resultInput.value = "";
}

function clickDelete() {
  if(numberInput.value.length === 0) {
    return;
  }

  numberInput.value = numberInput.value.slice(0, -1) || "";
  console.log("VALUE CHANAGED ===", numberInput.value);
  exchange();
}
