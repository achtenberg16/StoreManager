const express = require('express');
const validateProduct = require('../middlewares/validateProduct');
const { RESPONSE_CODE, MESSAGES } = require('../helpers/contants');
const productService = require('../services/products');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const [product] = await productService.getById(id);
  if (!product) {
   next({ message: MESSAGES.productNotFound, status: RESPONSE_CODE.NOT_FOUND });
  } 
  res.status(RESPONSE_CODE.OK).json(product);
});

router.get('/', async (_req, res) => {
  const products = await productService.getAll();
  res.status(RESPONSE_CODE.OK).json(products);
});

router.post('/', validateProduct, (req, res) => {
  console.log('rodou');
  res.status(RESPONSE_CODE.CREATED).end();
});

router.put('/:id', validateProduct, (req, res) => {
  res.status(RESPONSE_CODE.ok).json({});
});

module.exports = router;