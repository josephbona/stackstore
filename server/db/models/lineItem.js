var Sequelize = require('sequelize');
var db = require('../_db');

var LineItem = db.define('line_item', {
	productId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}	
});

module.exports = LineItem;