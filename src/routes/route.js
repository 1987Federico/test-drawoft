const express = require('express');
const app = express();
const user = require('../controllers/userController');

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(user);


module.exports = app;