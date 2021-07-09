// ASX Stock ticker schema
const mongoose = require('mongoose')

const StockSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true
    },
    displayname: {
        type: String,
        required: true
    },
    lastPrice: {
        type: Number,
        required: true
    },
    openPrice: {
        type: Number,
        required: true
    },
    dailyHigh: {
        type: Number,
        required: true
    },
    dailyLow: {
        type: Number,
        required: true
    },
    dailyChange: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    previousDayPerDelta: {
        type: Number,
        required: true
    },
    yearHighprice: {
        type: Number,
        required: true
    },
    yearLowPrice: {
        type: Number,
        required: true
    },
    yearOpenPrice: {
        type: Number,
        required: true
    },
    pe: {
        type: Number,
        required: true
    },
    eps: {
        type: Number,
        required: true
    },
    divYield: {
        type: Number,
        required: true
    },
    yearOpenPrice: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    shareNumber: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Stock', StockSchema)