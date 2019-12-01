const express = require('express')
const app = express()
const logger = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const routes = require('./routes')
const mongoose = require('mongoose')
const db = require('./config/index').uri;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
mongoose.connect(db,  { useNewUrlParser: true }, { useUnifiedTopology: true } )
.then(() => console.log("Success"))
.catch(err => console.log(err));
const port = process.env.PORT || 8081;
app.use(logger("short"))

app.use(routes)

app.listen(port,
     ()=> console.log(`server is running on http://localhost:${port}`))