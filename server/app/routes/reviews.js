const router = require('express').Router();
const Review = require('../../db').models.Review

module.exports = router;

router.get('/', function(req, res, next){
	Review.findAll()
		.then(function(reviews){
			res.send(reviews);
		})
		.catch(next);
});

router.post('/', function(req, res, next){
	Review.create({
		rating: req.body.rating,
		review: req.body.review
	})
	.then(function(review){
		res.send(review);
	})
	.catch(next);
});

router.put('/:id', function(req, res, next){
	Review.findById(req.params.id)
		.then(function(review){
			review.rating = req.body.rating,
			review.review = req.body.review
			review.save()
				.then(function(review){
					res.send(review);
				});
		})
		.catch(next);
});

router.delete('/:id', function(req, res, next){
	Review.destroy({where: { id: req.params.id} })
		.then(function(){
			res.sendStatus(200);
		})
		.catch(next);
});