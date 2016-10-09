const router = require('express').Router();
const Product = require('../../db/models/product')

module.exports = router;

router.get('/', function(req, res, next){
	Product.findAll()
		.then(function(products){
			res.send(products);
		})
		.catch(next);
});

router.post('/', function(req, res, next){
	Product.create({
		name: req.body.name,
		description: req.body.description
	})
	.then(function(product){
		res.send(product);
	})
	.catch(next);
});

