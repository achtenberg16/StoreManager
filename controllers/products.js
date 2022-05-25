const express = require('express');
const { RESPONSE_CODE } = require('../helpers/contants');
const productService = require('../services/products');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [product] = await productService.getById(id);
  if (!product) {
    res.status(RESPONSE_CODE.NOT_FOUND).json({ message: 'Product not found' });
  } 
  res.status(RESPONSE_CODE.OK).json(product);
});

router.get('/', async (_req, res) => {
  const products = await productService.getAll();
  res.status(RESPONSE_CODE.OK).json(products);
});

module.exports = router;