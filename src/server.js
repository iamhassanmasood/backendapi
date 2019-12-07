const express = require('express')
const app = express()
const chalk = require('chalk')
const logger = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const routes = require('./routes')
const mongoose = require('mongoose')
const db = require('./config/index').uri;
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require("path")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

try {
  fs.existsSync(path.join(__dirname, '/../public')) || fs.mkdirSync(path.join(__dirname, '/../public'));
  fs.existsSync(path.join(__dirname, '/../public/uploads')) || fs.mkdirSync(path.join(__dirname, '/../public/uploads'));
} catch (err) {
  console.log(err);
}

mongoose.connect(db,  { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log(chalk.bold.blue("MongoDB database connection established successfully"));
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

const port = process.env.PORT || 8081;
app.use(logger("short"))

app.use(routes)

app.listen(port,
     ()=> console.log(chalk.bold.yellow(`server is running on http://localhost:${port}`)))