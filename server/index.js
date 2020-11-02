require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const signRouter = require('./routers');

const port = 3000;

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// middleware for json body parsing
app.use(bodyParser.json({ limit: '1mb' }));

app.use(express.static(path.join(__dirname, '../', './dist')));

app.use(signRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
