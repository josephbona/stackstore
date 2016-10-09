const router = require('express').Router();
const User = require('../../db/models/user');

module.exports = router;

router.get('/', function(req, res, next){
	User.findAll()
		.then(function(users){
			res.send(users);
		})
		.catch(next);
});

router.post('/', function(req, res, next){
	User.create({
		email: req.body.email,
		password: req.body.password
	})
	.then(function(user){
		res.send(user);
	})
	.catch(next);
});