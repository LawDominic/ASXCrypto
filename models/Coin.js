// Coingecko coin schema
const mongoose = require('mongoose')

const CoinSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ath: {
        type: Number,
        required: true
    },
    atl: {
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
    hourlyChange: {
        type: Number,
        required: true
    }
}, {timestamps: true})
const Coin = mongoose.model('Coin', CoinSchema)
module.exports = Coin;