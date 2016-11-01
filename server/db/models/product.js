var Sequelize = require('sequelize');

var db = require('../_db');

var Product = db.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING
	},
	price: {
		type: Sequelize.STRING
	},
	salePrice: {
		type: Sequelize.STRING
	},
	quantity: {
		type: Sequelize.INTEGER
	}
});

module.exports = Product;