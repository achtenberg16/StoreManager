const express = require('express');
const productsRoute = require('./products');
const salesRoute = require('./sales');

const router = express.Router();

router.use('/products', productsRoute);

router.use('/sales', salesRoute);

module.exports = router;