const router = require('express').Router();
const User = require('../../db').models.User;
const LineItem = require('../../db').models.LineItem;
const Product = require('../../db').models.Product;
const Order = require('../../db').models.Order;

module.exports = router;

router.get('/', function(req, res, next){
	console.log(User);
	User.findAll()
		.then(function(users){
			res.send(users);
		})
		.catch(next);
});

router.get('/:id/orders', function(req, res, next){
	User.findById(req.params.id, {
		include: [{
			model: Order,
			include: [{ 
				model: LineItem,
				include: [ Product ]
			}]
		}]
	})
	.then(function(user){
		res.send(user);
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

