const axios = require('axios');
const Stock = require('../../models/Stock')
const express = require("express");
const router = express.Router();
const app = express();

const api = process.env.ASX_API;
const headerAPI = process.env.ASX_HEADER;
let arrData = []
let body = []

// @desc Get stock from MongoDB
function getStock() {
    
}

// @desc Update MongoDB with updated data
async function updateStock(ticker) {
    await axios
        .get(api + ticker)
            .then (response => {
                arrData = response.data;
                return axios.get(headerAPI + arrData.code + "/header")
            })
            .then (response => {
                body = {
                    ticker: arrData.code,
                    displayName: response.data.data.displayName,
                    lastPrice: arrData.last_price,
                    openPrice: arrData.open_price,
                    dailyHigh: arrData.day_high_price,
                    dailyLow: arrData.day_low_price,
                    dailyChange: arrData.change_price,
                    volume: arrData.volume,
                    previousDayPerDelta: arrData.previous_day_percentage_change,
                    yearHighPrice: arrData.year_high_price,
                    yearLowPrice: arrData.year_low_price,
                    pe: arrData.pe,
                    eps: arrData.eps,
                    divYield: arrData.annual_dividend_yield,
                    marketCap: arrData.market_cap,
                    shareNumber: arrData.number_of_shares
                }
                console.log(body)
            })
            .catch(error => console.log(error.response))
}

function getBody() {
    return body;
}

module.exports = {
    getStock,
    updateStock,
    getBody
}