//Check the location of the crypto index
async function getAPIDataCoin() {
    const dataCrypto = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    console.log(dataCrypto.data);

    const cryptoName = dataCrypto.data;
    for (let i = 0; i < cryptoName.length; i++) {
        const cryptoLoc = cryptoName[i].id;
        if (cryptoLoc == "bitcoin") {
            return console.log(`Bitcoin is at index ${i}`);
        }
    }
}

//Get the price of the crypto requested
async function getData(coin, currency) {
    try {
        const dataCrypto = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`);
        const result = dataCrypto.data[coin][currency];
        return result;
    } catch {
        alert('Please enter the proper "Crypto Name" (check crypto list)')
        return false;
    }
}

//Creating the dropdown option for the currency
const currenciesDrop = document.querySelector("#currencies");
async function allCurrency() {
    try {
        //Get all currency data from Coingecko API
        const getCurrency = await axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies");
        //Adding each currency into the dropdown
        for (let cur of getCurrency.data.sort()) {
            const newOpt = document.createElement("option");
            newOpt.append(cur);
            currenciesDrop.append(newOpt);
        }
    } catch {
        console.log("Error in retrieving Currency data")
    }
}

//Showing the Bitcoin price at top
const value = document.querySelector(".value");
let bitcoinValue = 0;
async function bitcoinPrice() {
    const bitcoin = await getData("bitcoin", "usd");
    value.textContent = bitcoin;
    if (bitcoinValue === 0) {
        value.style.color = "white";
    }
    else if (bitcoinValue < bitcoin) {
        value.style.color = "green";
    }

    else if (bitcoinValue > bitcoin) {
        value.style.color = "red";
    }
    bitcoinValue = bitcoin;
}

bitcoinPrice()
setInterval(bitcoinPrice, 60000);
allCurrency();

//When submitting a request for price
const submit = document.querySelector("#submit");
const coinName = document.querySelector("#coinName");
const result = document.querySelector("#result");
const cryptoUse = document.querySelector("#cryptoUse");
const geckoLink = document.querySelector("#gecko-link")
submit.addEventListener("click", async function (e) {
    e.preventDefault();
    let price = await getData(`${coinName.value}`, `${currenciesDrop.value}`);
    if (price == false) {
        return false;
    }
    result.textContent = price;

    //Display the crypto symbol
    getSymbol();

    geckoLink.href = `https://www.coingecko.com/en/coins/${coinName.value}`;
    geckoLink.innerText = "Detail";
})

//Request for the crypto symbol to be displayed
async function getSymbol() {
    try {
        const dataCrypto = await axios.get("https://api.coingecko.com/api/v3/coins/list");
        const cryptoName = dataCrypto.data;

        for (let i = 0; i < cryptoName.length; i++) {
            let cryptoId = cryptoName[i].id;
            let cryptoSymbol = cryptoName[i].symbol;
            //If there is a match to the crypto name with the server
            if (cryptoId == coinName.value) {
                return cryptoUse.innerText = `${cryptoSymbol.toUpperCase()}/${currenciesDrop.value.toUpperCase()}:`;
            }
        }
    } catch {
        console.log("ERROR IN RETRIEVING SYMBOL")
    }
}