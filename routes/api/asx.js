const axios = require('axios');

const api = process.env.ASX_API;
function getShare(ticker) {
    axios.get(api + ticker)
        .then (function (response) {
            console.log(response.data)
            // return response.data
        });
}

module.exports = {
    getShare
}