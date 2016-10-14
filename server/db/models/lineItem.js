var Sequelize = require('sequelize');
var db = require('../_db');

var LineItem = db.define('line_item', {
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	}	
});

module.exports = LineItem;