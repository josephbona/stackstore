var Sequelize = require('sequelize');
var db = require('../_db');

var Order = db.define('order', {
	status: {
		type: Sequelize.ENUM('cart', 'complete'),
		allowNull: false,
		defaultValue: 'cart'
	}
},{
	classMethods: {
		getUserCart: function(user){
			console.log(user);
			var that = this;
			this.findOne({ where: {
				userId: user.id,
				status: 'cart'
			}})
			.then(function(cart){
				if(cart){
					return cart;
				}
				return that.create({ userId: user.id});
			});
		}
	}
});

module.exports = Order;