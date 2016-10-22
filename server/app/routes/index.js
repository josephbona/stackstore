'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/members', require('./members'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/categories', require('./categories'));
router.use('/line_items', require('./line_items'));
router.use('/orders', require('./orders'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res, next) {
    var err = new Error('Not found.');
    err.status = 404;
    next(err);
});
