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

// @desc PORT assigning
const PORT = process.env.PORT || 5000;

// @desc Stock API testing
const Stock = require("./models/Stock")
app.get("/asx", async (req, res) => {
    let body = asx.getBody();
    const stock = new Stock(body);
    try {
      await stock.save();
      res.send(stock);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get('*', (req, res) => {
  res.render('./error/404')
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
