const router = require('express').Router();
const LineItem = require('../../db').models.LineItem;
const Product = require('../../db').models.Product;

module.exports = router;

router.get('/', function(req, res, next){
	LineItem.findAll()
		.then(function(lineItems){
			res.send(lineItems);
		})
		.catch(next);
});

router.get('/:userId', function(req, res, next){
	LineItem.findAll({
		where: {
			userId: req.params.userId
		},
		include: [ Product ]
	})
	.then(function(lineItems){
		res.send(lineItems);
	})
	.catch(next);
});

router.post('/:userId/:productId', function(req, res, next){
	LineItem.create({
		quantity: req.body.quantity,
		userId: req.params.userId,
		productId: req.params.productId
	})
	.then(function(lineItem){
		res.send(lineItem);
	})
	.catch(next);
});

router.put('/:id', function(req, res, next){
	LineItem.findById(req.params.id)
		.then(function(lineItem){
			lineItem.quantity = req.body.quantity;
			lineItem.save()
				.then(function(lineItem){
					res.send(lineItem);
				});
		})
		.catch(next);
});

router.delete('/:id', function(req, res, next){
	LineItem.destroy({where: { id: req.params.id} })
		.then(function(){
			res.sendStatus(200);
		})
		.catch(next);
});