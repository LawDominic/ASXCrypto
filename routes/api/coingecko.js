const axios = require('axios');

const api = process.env.COINGECKO_API;

function getStatus() {
    axios.get(`${api}ping`)
    .then (function (response) {
        console.log(response.data)
    })
    .catch (function (error) {
        console.log(error);
    });
}

function getCoin(id) {
    axios.get(`${api}coins/${id}`)
        .then (function (response) {
            console.log(response.data.market_data.current_price.usd)
            return response.data.market_data.current_price.usd;
        });
}

module.exports = {
    getCoin,
    getStatus
}