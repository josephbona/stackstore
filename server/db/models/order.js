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
			var that = this;
			return this.findOne({ where: {
				userId: user.id,
				status: 'cart'
			}})
			.then(function(cart){

				console.log('in order model getUserCart, returns this :', cart)
				if(cart){
					return cart;
				}
				return that.create({ userId: user.id});
			});
		}
	},
	getterMethods: {
		createdDate: function() {
			//return formatDate(this);
		}
	}
});
/*
function formatDate(date) {
	var formattedDate = date.split(' ');
	formattedDate = date[0].split('-');
	return date[1] + '/' + date[2] + '/' + date[0];
}
*/
module.exports = Order;