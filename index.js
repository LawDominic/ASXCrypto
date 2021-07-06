const express = require("express");
const path = require("path");
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const coingecko = require("./routes/api/coingecko")
dotenv.config({path: './config/config.env'})

connectDB()
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

coingecko.getCoin("the-graph");

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
``;
