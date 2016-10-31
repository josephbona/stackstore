const router = require('express').Router();
const Env = require('../../env');

module.exports = router;

router.get('/aws', function(req, res, next){
	res.send(Env.AWS);
});