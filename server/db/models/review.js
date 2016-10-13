var Sequelize = require('sequelize');
var db = require('../_db');

var Review = db.define('review',{
	rating: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	review: {
		type: Sequelize.TEXT, 
		allowNull: false
	}
});


module.exports = Review;