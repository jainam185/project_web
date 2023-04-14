const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const exphbs = require('express-handlebars');
require('dotenv').config();
const port = 8000

const app = express()
app.use(express.json());

// registering the bodyparser
app.use(bodyParser.urlencoded({extended: false}))

// getting setting
const settings = require('./config/settings')

// mongo db URL
// const db = settings.mongoDBUrl

const db = process.env.DB_CONN_STRING;
console.log(process.env.DB_CONN_STRING);


// attempt to connect with DB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(err))

// importing routes
const router = require('./routes/router')

app.get('/', (req, res) => {
    res.send('Week 10 code goes from here')
})

// mapping the imported routes
app.use('/api', router)


app.set('view engine', 'hbs');
  
// Config for JWT strategy
// require('./strategies/jsonwtStrategy')(passport)

app.listen(port, () => console.log(`App running at port ${port}`))