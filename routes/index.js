const express = require('express');
const router = express.Router();
const asx = require("./api/asx")
const coingecko = require("./api/coingecko")
const Stock = require('../models/Stock')
const Coin = require('../models/Coin')
// @desc Landing page
// @route GET /
router.get('/', (req, res) => {
    res.render('./home')
})

// @desc Coin template page
// @route GET /coin
router.get('/coin', (req, res) => {
    try {
        console.log("Fetching allCoins")
        const allCoin = await Coin.find({}).lean()
        res.render('coin', {
            page: "Coin",
            allCoin
        })
    } catch (error) {
        console.log(error);
        res.render('error/500')
    }
})

// @desc Stock template page
// @route GET /stock and display all entries
router.get('/stock', async (req, res) => {
    try {
        console.log("Fetching allStock")
        const allStock = await Stock.find({}).lean()
        res.render('stock', {
            page: "Stock",
            allStock
        })
    } catch (error) {
        console.log(error);
        res.render('error/500')
    }
})

// @desc ASX API calls
// @route POST /api/asx
router.post("/api/asx", (req,res) => {
    asx.updateStock(req.body.ticker)
    res.status(200).send(req.body.ticker)
})

// @desc Coingecko API calls
// @route POST /api/coingecko
router.post("/api/coingecko", (req,res) => {
    coingecko.updateCoin(req.body.ticker)
    res.status(200).send(req.body.ticker)
})

module.exports = router