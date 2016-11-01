const nodeMailer = require('nodemailer');
const router = require('express').Router();


module.exports = router;

router.post('/', function(req, res, next){
	var transporter = nodeMailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'stackstore2016@gmail.com',
			pass: 'ThisIsAGreatPassword!'
		}
	});
	var text = 'hey this actually sent';
	var mailOptions = {
		from: 'stackstore2016@gmail.com',
		to: 'pat@patspeiser.com',
		subject: 'Stack Store',
		text: text
	};
	
	transporter.sendMail(mailOptions, function(err, info){
		if (err){
			console.log(err);
		} else {
			console.log('success!');
			res.json({yo: info.response});
		}
	});	
});