/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = require('./server/db/models/product')
var Promise = require('sequelize').Promise;
const Faker = require('Faker');

//uses Faker module to create products for seeding. change i<NUMBER_OF_PRODUCTS for more/less 
var seedProducts = function(){
    var products = [];
    var image = 'http://lorempixel.com/400/400/';

    //create products array
    for (var i = 0; i < 500; i++){
        var name = Faker.commerce.productName();
        var description = Faker.lorem.sentence() + ' ' + Faker.lorem.sentence(); 
        products.push({ name: name, description: description, image: image });
    }

    var createProducts = products.map(function(product){
        return Product.create(product);
    });

    return Promise.all(createProducts);

};

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

db.sync({ force: true })
    .then( function(){
        return seedUsers();
    })
    .then(function(){
        return seedProducts();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
