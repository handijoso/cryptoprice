//List of Supported Crypto Names
const lists = document.querySelector("#cryptoLists");
async function getAPIDataCoin() {
    const dataCrypto = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    // console.log(dataCrypto.data[4].name);
    const coinName = dataCrypto.data;

    for (let i = 0; i < coinName.length; i++) {
        let cryptoName = coinName[i].id;
        const newPara = document.createElement("p");
        newPara.append(cryptoName);
        lists.append(newPara);
    }
}

getAPIDataCoin()