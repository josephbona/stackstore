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
var Category = db.model('category');
var Review = db.model('review');
var LineItem = db.model('line_item');
var Product = require('./server/db/models/product')
var Promise = require('sequelize').Promise;
const Faker = require('Faker');

//uses Faker module to create products for seeding. change i<NUMBER_OF_PRODUCTS for more/less 
var seedProducts = function(){
    var products = [];
    var image = 'http://lorempixel.com/400/400/';

    //create products array
    for (var i = 0; i < 25; i++){
        var name = Faker.commerce.productName();
        var description = Faker.lorem.sentence() + ' ' + Faker.lorem.sentence(); 
        var price = Faker.commerce.price();
        products.push({ name: name, description: description, image: image, price: price });
    }

    var createProducts = products.map(function(product){
        return Product.create(product);
    });

    return Promise.all(createProducts);

};

var seedUsers = function () {

    var users = [
        {
            name: 'Testy Person',
            email: 'testing@fsa.com',
            password: 'password',
            country: 'England',
            shipping_address: 'London Bridge',
            cartStatus: 'Shopping'
        },
        {
            name: 'Barack Obama',
            email: 'obama@gmail.com',
            password: 'potus',
            shipping_address: '1600 Pennsylvania Ave NW, Washington, DC 20500',
            billing_address: '1500 Pennsylvania Avenue, NW, Washington, D.C. 20220',
            country: 'USA',
            cartStatus: 'Shopping'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        console.log('here is userObj: ', userObj)
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};


var seedCategories = function () {

    var categories = [
        {
            name: 'National Monuments'
        },
        {
            name: 'International Monuments'
        }, 
        {
            name: 'Rentals'
        },
        {
            name: 'Real Estate'
        }
    ];

    var creatingCategories = categories.map(function (Obj) {
            return Category.create(Obj);
    });
    return Promise.all(creatingCategories);
};

var seedReviews = function () {

    var reviews = [
        {
            userId: 1,
            productId: 7,
            rating: 2,
            review: 'Looks really impressive but problems using in the long run.'
        },
        {
            userId: 2,
            productId: 18,
            rating: 5,
            review: 'Works exactly as expected.  Very impressed.'
        },
        {
            userId: 1,
            productId: 24,
            rating: 4,
            review: 'Works quite well, but NOT perfect.'
        },
        {
            userId: 2,
            productId: 7,
            rating: 5,
            review: 'Never had a product work so damn well.'
        }
    ];

    var creatingReviews = reviews.map(function (Obj) {
            return Review.create(Obj);
    });
    return Promise.all(creatingReviews);
};

var seedLineItems = function () {

    var lineItems = [
        {
            userId: 1,
            productId: 7,
            quantity: 1,
        },
        {
            userId: 1,
            productId: 6,
            quantity: 1,  
        },
          {
            userId: 2,
            productId: 7,
            quantity: 45,
        },
          {
            userId: 2,
            productId: 8,
            quantity: 7,
        },
    ];

    var creatingLineItems = lineItems.map(function (Obj) {
            return LineItem.create(Obj);
    });
    return Promise.all(creatingLineItems);
};

db.sync({ force: true })
    .then( function(){
        console.log(chalk.blue('Seed the Users'));
        return seedUsers();
    })
    .then(function(){
        console.log(chalk.blue('Seed the Products'));
        return seedProducts();
    })
    .then(function(){
        console.log(chalk.blue('Seed the Categories'));
        return seedCategories();
    })
    .then(function(){
        console.log(chalk.blue('Seed the Reviews'));
        return seedReviews();
    })
    .then(function(){
        console.log(chalk.blue('Seed the Line Items'));
        return seedLineItems();
    })

    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
