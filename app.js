const express = require("express");
const path = require("path");
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
dotenv.config({path: './config/config.env'})

const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// APIs
const coingecko = require("./routes/api/coingecko")
const asx = require("./routes/api/asx")

// DB connection
connectDB()

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

// Static
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000;

coingecko.getCoin("the-graph");
asx.getShare("APT");
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
