const express = require('express');
const router = express.Router();
const asx = require("./api/asx")
const Stock = require('../models/Stock')

// @desc Landing page
// @route GET /
router.get('/', (req, res) => {
    res.render('./home')
})

// @desc Coin template page
// @route GET /coin
router.get('/coin', (req, res) => {
    res.render('./coin')
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

module.exports = router