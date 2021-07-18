const axios = require('axios');
const api = process.env.COINGECKO_API;
const Coin = require('../../models/Coin.js')

let body = []
let arrData = []
// @desc Get status of Coingecko API
function getStatus() {
    axios.get(`${api}ping`)
        .then (function (response) {
            // console.log(response.data)
        })
        .catch (function (error) {
            console.log(error);
        }
    );
}

// @desc Get coin from MongoDB
// function getCoin(id) {
//     axios.get(`${api}coins/${id}`)
//         .then (function (response) {
//             // console.log(response.data)
//             return response.data;
//         }
//     )
// }

// @desc Update MongoDB with updated data
async function updateCoin(id) {
    await axios
        .get(`${api}coins/${id}`)
            .then (res => {
                arrData = res.data;
                body = {
                    id: arrData.id,
                    symbol: arrData.symbol,
                    name: arrData.name,
                    description: arrData.description.en,
                    currentPrice: arrData.market_data.current_price.aud,
                    ath: arrData.market_data.ath.aud,
                    athChangePer: arrData.market_data.ath_change_percentage.aud,
                    atl: arrData.market_data.atl.aud,
                    atlChangePer: arrData.market_data.atl_change_percentage.aud,
                    marketCap: arrData.market_data.market_cap.aud,
                    high_24h: arrData.market_data.high_24h.aud,
                    low_24h: arrData.market_data.low_24h.aud,
                    dailyChangePer1h: arrData.market_data.price_change_percentage_1h_in_currency,
                    dailyChangePer24h: arrData.market_data.price_change_percentage_24h_in_currency,
                    dailyChangePer7d: arrData.market_data.price_change_percentage_7d_in_currency,
                    dailyChangePer14d: arrData.market_data.price_change_percentage_14d_in_currency,
                    dailyChangePer30d: arrData.market_data.price_change_percentage_30d_in_currency,
                    dailyChangePer60d: arrData.market_data.price_change_percentage_60d_in_currency,
                    dailyChangePer200d: arrData.market_data.price_change_percentage_200d_in_currency,
                    dailyChangePer1y: arrData.market_data.price_change_percentage_1y_in_currency,
                    marketCapChange24h: arrData.market_data.market_cap_change_24h_in_currency,
                    marketCapChangePer24h: arrData.market_data.market_cap_change_percentage_24h_in_currency,
                    total_supply: arrData.market_data.total_supply,
                    max_supply: arrData.market_data.max_supply,
                }
            })
            .catch (error => {
                console.log(error.response);
                res.render('error/500');
            })
}

function getBody() {
    return body;
}

function getAllCoin() {
    return allCoin;
}

module.exports = {
    updateCoin,
    getBody,
    getAllCoin,
    getStatus
}