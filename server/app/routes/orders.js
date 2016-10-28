const router = require('express').Router();
const LineItem = require('../../db').models.LineItem;
const Product = require('../../db').models.Product;
const Order = require('../../db').models.Order;

module.exports = router;

router.get('/', function(req, res, next){
	if(req.query.status) {
		Order.findAll({
			where: {
				status: req.query.status
			}
		})
		.then(function(orders){
			res.send(orders);
		})
		.catch(next);
	} else {
		Order.findAll()
		.then(function(orders){
			res.send(orders);
		})
		.catch(next);
	}
});

router.get('/:id', function(req, res, next){
	Order.findAll({
		where: {
			id: req.params.id
		},
		include: [ {
			model: LineItem,
			include: [Product]
		}]
	})
	.then(function(lineItems){
		res.send(lineItems);
	})
	.catch(next);
});

router.post('/', function(req, res, next){
	Order.create({ userId: req.body.userId })
		.then(function(order){
			res.send(order);
		})
		.catch(next);
});