var Sequelize = require('sequelize');

var db = require('../_db');

var Product = db.define ('product', {
	name: {
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.STRING
	},
	image: {
		type: Sequelize.STRING
	}
});

module.exports = Product;