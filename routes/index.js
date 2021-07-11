const express = require('express');
const router = express.Router();
const axios = require('axios');

const ASX_API = process.env.ASX_API;
let arrData = []
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

router.post("/api/asx", (req,res) => {
    console.log(req)
    const body = {
        ticker: req.body
    }
    console.log(body)
    res.send('POST request to the homepage')
    // axios.get(ASX_API + req.body.ticker)
    //     .then (function (response) {
    //         arrData = response.data;
    //         asx.updateStock(arrData)
    //     });
})

module.exports = router