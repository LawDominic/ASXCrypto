const axios = require('axios');
const api = process.env.COINGECKO_API;
const Coin = require('../../models/Coin.js')

let arrData = []
// @desc Get status of Coingecko API
function getStatus() {
    axios.get(`${api}ping`)
    .then (function (response) {
        // console.log(response.data)
    })
    .catch (function (error) {
        console.log(error);
    });
}

// @desc Get coin from MongoDB
function getCoin(id) {
    axios.get(`${api}coins/${id}`)
        .then (function (response) {
            // console.log(response.data)
            return response.data;
        }
    )
}

// @desc Update MongoDB with updated data
function updateCoin() {
    // Get response data from Coingecko API

    // Upload data to MongoDB
}

module.exports = {
    getCoin,
    getStatus
}