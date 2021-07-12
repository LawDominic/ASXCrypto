const express = require('express');
const router = express.Router();
const asx = require("./api/asx")

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
// @route GET /stock
router.get('/stock', (req, res) => {
    res.render('./stock')
})

// @desc ASX API calls
// @route POST /api/asx
router.post("/api/asx", (req,res) => {
    asx.updateStock(req.body.ticker)
    res.status(200).send(req.body.ticker)
})

module.exports = router