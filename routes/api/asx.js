const axios = require('axios');
const Stock = require('../../models/Stock')
const express = require("express");
const router = express.Router();
const app = express();

const api = process.env.ASX_API;
const headerAPI = process.env.ASX_HEADER;
let arrData = []
let body = []
let allStock = null

// @desc Get stock from MongoDB
function getStock() {
    
}

// @desc Update MongoDB with updated data
async function updateStock(ticker) {
    await axios
        .get(api + ticker)
            .then (res => {
                arrData = res.data;
                return axios.get(headerAPI + arrData.code + "/header")
            })
            .then (res => {
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
            })
            .catch (error => {
                console.log(error.response);
                res.render('error/500');
            })
}

// @desc Display all Stock entries from MongoDB
// async function displayAllStock() {
//     allStock = await Stock.find({}).lean()
//     return allStock;
// }

function getBody() {
    return body;
}

function getAllStock() {
    return allStock;
}

module.exports = {
    getStock,
    updateStock,
    getAllStock,
    getBody
}