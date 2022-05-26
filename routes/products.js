const express = require('express');
const ProductsController = require('../controllers/products');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/:id', ProductsController.getById);

router.get('/', ProductsController.getAll);

router.post('/', validateProduct, ProductsController.createProduct);

router.put('/:id', validateProduct, ProductsController.updateProduct);

router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;