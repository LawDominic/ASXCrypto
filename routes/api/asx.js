const axios = require('axios');
const cheerio = require('cheerio')
const Stock = require('../../models/Stock')
const express = require("express");
const router = express.Router();
const app = express();

const api = process.env.ASX_API;
const headerAPI = process.env.ASX_HEADER;
let arrData = []
let body = []
let allStock = null

// @desc Crawl for top 20 tickers from https://www.asx20list.com/
async function crawlTickers() {
    try {
        const { data } = await axios.get('https://www.asx20list.com/')
        const $ = cheerio.load(data)
        const scrapedTickers = []

        for (let i = 1; i < 21; i++) {
            let scrapedTicker = $(`#post-2 > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text()
            scrapedTickers.push(scrapedTicker)
        }
        console.log(scrapedTickers)
        return scrapedTickers
    } catch (error) {
        return error
    }
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
    crawlTickers,
    updateStock,
    getAllStock,
    getBody
}