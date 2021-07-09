const axios = require('axios');
const api = process.env.ASX_API;
const Stock = require('../../models/Stock')

// @desc Get coin from MongoDB
function getShare(ticker) {
    axios.get(api + ticker)
        .then (function (response) {
            console.log(response.data)
            // return response.data
        });
}

// @desc Update MongoDB with updated data
function updateStock() {
    
}

module.exports = {
    getShare
}