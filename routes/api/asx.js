const axios = require('axios');
const Stock = require('../../models/Stock')
const express = require("express");
const router = express.Router();
const app = express();

const api = process.env.ASX_API;
const headerAPI = process.env.ASX_HEADER;
let arrData = []
let displayName
// @desc Get coin from MongoDB
function getShare(ticker) {
    axios.get(api + ticker)
        .then (function (response) {
            arrData = response.data;
            updateStock()
        });
}

// @desc Update MongoDB with updated data
function updateStock(arrData) {
    console.log(arrData)
    axios.get(headerAPI + arrData.code + "/header")
        .then (function (response) {
            displayName = response.data.displayName
        })
    let body = {
        ticker: arrData.code,
        displayName,
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
        shareNumber: arrData.number_of_sharess
    }

    app.post("/", async (request, response) => {
        const stock = new Stock(body);
      
        try {
          await stock.save();
          response.send(stock);
        } catch (error) {
          response.status(500).send(error);
        }
      });

}



module.exports = {
    getShare
}