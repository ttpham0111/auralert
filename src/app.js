var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes');


var app = express();

app.use(bodyParser.json());
app.use(routes);

module.exports = app;
