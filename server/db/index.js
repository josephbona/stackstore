'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Product = require('./models/product');
var Category = require('./models/category');
var LineItem = require('./models/lineItem');
var Review = require('./models/review');


// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
