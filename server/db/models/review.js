var Sequelize = require('sequelize');
var db = require('../_db');

var Review = db.define('review',{
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	productId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	rating: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	review: {
		type: Sequelize.TEXT
	}
});


module.exports = Review;