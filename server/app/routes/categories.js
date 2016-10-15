const router = require('express').Router();
const Category = require('../../db').models.Category

module.exports = router;

router.get('/', function(req, res, next){
	Category.findAll()
		.then(function(category ){
			res.send(category );
		})
		.catch(next);
});

router.post('/', function(req, res, next){
	Category.create({
		name: req.body.name	
	})
	.then(function(category) {
		res.send(category);
	})
	.catch(next);
});

router.put('/:id', function(req, res, next){
	Category.findById(req.params.id)
		.then(function(category){
			category.name = req.body.name;
			category.save()
				.then(function(category) {
					res.send(category);
				});
		})
		.catch(next);
});

router.delete('/:id', function(req, res, next){
	Category.destroy({where: { id: req.params.id} })
		.then(function(){
			res.sendStatus(200);
		})
		.catch(next);
});