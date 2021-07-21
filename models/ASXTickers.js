// ASXTickers schema
const mongoose = require('mongoose');

const ASXTickersSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        maxLength: 3
    }
}, {timestamps: true})

const ASXTickers = mongoose.model('ASXTickers', ASXTickersSchema);
module.exports = ASXTickers;