'use strict';
var chalk = require('chalk');
var db = require('./db').db;
var seed = require('../seed');

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
if(process.env.SYNC) {
  db.sync({force: true})
  .then( function(){
      return seed.seedUsers();
  })
  .then(function(){
      return seed.seedProducts();
  })
  .then(function(){
      return seed.seedCategories();
  })
  .then(function(){
      return seed.seedReviews();
  })
  .then(function(){
      return seed.seedLineItems();
  })
  .then(function () {
      return console.log('Seed successful!');
  })
  .then(createApplication)
  .then(startServer)
  .catch(function (err) {
      console.error(chalk.red(err.stack));
  });
}

db.sync()
.then(createApplication)
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
});
