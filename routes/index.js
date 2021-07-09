const express = require('express');
const router = express.Router();

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

module.exports = router