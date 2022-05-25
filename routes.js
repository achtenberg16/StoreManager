const express = require('express');
const salesControler = require('./controllers/sales');
const productsControler = require('./controllers/products');

const router = express.Router();

router.use('/products', productsControler);

router.use('/sales', salesControler);

module.exports = router;