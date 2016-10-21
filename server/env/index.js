var path = require('path');
var devConfigPath = path.join(__dirname, './development.js');
var productionConfigPath = path.join(__dirname, './production.js');
var testConfigPath = path.join(__dirname, './testing.js');

console.log('NODE_ENV = ', process.env.NODE_ENV)


if (process.env.NODE_ENV === 'production') {
    module.exports = require(productionConfigPath);
} else if (process.env.NODE_ENV === 'testing') {
    module.exports = require(testConfigPath);
} else {
    module.exports = require(devConfigPath);
}

console.log('DATABASE_URL = ', process.env.DATABASE_URL);