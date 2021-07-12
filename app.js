const express = require("express");
const path = require("path");
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const bodyParser = require("body-parser");
dotenv.config({path: './config/config.env'})
const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// @desc Middleware - bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// @desc APIs
const coingecko = require("./routes/api/coingecko")
const asx = require("./routes/api/asx")

// @desc DB connection
connectDB()

// @desc Handlebars import and use .hbs extension
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

// @desc Use static pages
app.use(express.static(path.join(__dirname, 'public')))

// @desc Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000;

// @desc API testing
coingecko.getCoin("the-graph");

// @desc Stock API testing
const Stock = require("./models/Stock")
app.get("/asx", async (request, response) => {
    let body = asx.getBody();
    console.log(body)
    const stock = new Stock(body);
    console.log("Starting POST")
    try {
      await stock.save();
      response.send(stock);
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
