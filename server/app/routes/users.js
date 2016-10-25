const router = require('express').Router();
const User = require('../../db').models.User;
const LineItem = require('../../db').models.LineItem;
const Product = require('../../db').models.Product;
const Order = require('../../db').models.Order;

module.exports = router;
/*
var ensureAuthenticated = function (req, res, next) {
    var err;
    if (req.isAuthenticated()) {
        next();
    } else {
        err = new Error('You must be logged in.');
        err.status = 401;
        next(err);
    }
};
*/
router.get('/', function(req, res, next){
	User.findAll()
		.then(function(users){
			res.send(users);
		})
		.catch(next);
});

router.get('/:id', function(req, res, next){
	User.findById(req.params.id)
		.then(function(user){
			console.log(user);
			res.send(user);
		})
		.catch(next);
});

router.post('/:id/orders', function(req, res, next){
	Order.getUserCart(req.user)
		.then(function(cart){
			return Order.findById(cart.id, {
				include: [{ 
					model: LineItem,
					include: [ Product ] 
				}]			
			});
		})
	.then(function(cart){
		res.send(cart);
	})
	.catch(next);
});

router.post('/', function(req, res, next){
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	.then(function(user){
		res.send(user);
	})
	.catch(next);
});

router.put('/:id', function(req, res, next){
	User.findById(req.params.id)
		.then(function(user){
			//assumes req.body has email, password etc. would be great to just get the object to save instead
			user.email = req.body.email;
			user.password = req.body.password;

			user.save()
				.then(function(user){
					res.send(user);
				});
		}).catch(next);
});

router.delete('/:id', function(req, res, next){
	User.destroy({ where: { id: req.params.id } })
		.then(function(){
			res.sendStatus(200);
		})
		.catch(next);
});

