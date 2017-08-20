process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
  	express = require('./config/express'),
  	passport = require('./config/passport'),
  	passport1 = require('passport');
var db = mongoose();
var app = express(db);
var passport = passport(passport1);

app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000/');