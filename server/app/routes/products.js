const router = require('express').Router();
const Product = require('../../db').models.Product;
const Category = require('../../db').models.Category;
const Review = require('../../db').models.Review;

module.exports = router;

router.get('/', function(req, res, next){
	Product.findAll({
		include: [Review]
	})
	.then(function(products){
		res.send(products);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	console.log('req.params.id = ', req.params.id)
	Product.find({
		where: {
			id: req.params.id
		},
		include: [Category, Review]
	})
		.then(function(product){
			res.send(product);
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

router.put('/:id', function(req, res, next){
	Product.findById(req.params.id)
		.then(function(product){
			//assumes req.body name, description. get product object passed in instead?
			product.name = req.body.name;
			product.description = req.body.description;

			product.save()
				.then(function(product){
					res.send(product);
				});
		}).catch(next);
});

router.delete('/:id', function(req, res, next){
	Product.destroy({ where: { id: req.params.id } })
		.then(function(){
			res.sendStatus(200);
		})
		.catch(next);
});

