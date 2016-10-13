'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Product = require('./models/product');
var Category = require('./models/category');
var LineItem = require('./models/lineItem');
var Review = require('./models/review');

User.hasMany(LineItem);
Product.hasMany(LineItem);
LineItem.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);
Product.hasMany(Review);
// LineItem.hasOne(Product);

Product.hasOne(Category);
// Product.belongsTo(Category);

//Add this line if users can post products:
// Product.belongsTo(User);

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
