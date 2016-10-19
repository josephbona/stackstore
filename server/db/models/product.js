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
		type: Sequelize.DECIMAL,
		allowNull: false
	},
	salePrice: {
		type: Sequelize.DECIMAL(10, 2)
	}, 
	quantity: {
		type: Sequelize.INTEGER
	},
	// if sold by one of the users:
	userId: {
		type: Sequelize.INTEGER
	}
});

module.exports = Product;