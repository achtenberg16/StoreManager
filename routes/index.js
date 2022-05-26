const express = require('express');
const salesControler = require('../controllers/sales');
const productsRoute = require('./products');

const router = express.Router();

router.use('/products', productsRoute);

router.use('/sales', salesControler);

module.exports = router;