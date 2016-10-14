var Sequelize = require('sequelize');
var db = require('../_db');

var Category = db.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	// may or may not use.  Type integer instead?  RvdM
	permission:{
		type: Sequelize.STRING
	} 
})

module.exports = Category;	