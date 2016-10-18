'use strict';
var chalk = require('chalk');
var db = require('./db').db;
// var seed = require('../seed');

// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app')(db);
    server.on('request', app); // Attach the Express application.
    require('./io')(server);   // Attach socket.io.
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

// var seed = function () {
// 	if (process.env.SEED){
// 		node ./seed.js
// 		console.log('requesting SEED');
// 	}
// 	return;
// };

db.sync()
.then(createApplication)
// .then(function (){
// 	if(process.env.SEED){
// 		return seed;
// 	};
	
// 	return;
// })
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
});
