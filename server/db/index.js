'use strict';
var db = require('./_db');

var User = require('./models/user');
var Category = require('./models/category');
var Product = require('./models/product');
var LineItem = require('./models/lineItem');
var Review = require('./models/review');

module.exports = {
	db: db,
	models: {
		User: User,
		Category: Category,
		Product: Product,
		LineItem: LineItem,
		Review: Review
	}
};

// eslint-disable-next-line no-unused-vars

User.hasMany(LineItem);
Product.hasMany(LineItem);
LineItem.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);
Product.hasMany(Review);
// LineItem.hasOne(Product);

//Product.hasOne(Category);
Product.belongsTo(Category);
Category.hasMany(Product);

//Add this line if users can post products:
// Product.belongsTo(User);

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
