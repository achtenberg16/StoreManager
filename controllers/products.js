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

router.post('/', validateProduct, async (req, res, next) => {
  const respose = await productService.createProduct(req.body);
  if (respose.error) return next({ message: respose.error, status: RESPONSE_CODE.CONFLICT });
  res.status(201).json(respose);
});

router.put('/:id', validateProduct, async (req, res, next) => {
 const { id } = req.params;
 const product = await productService.getById(id);
  if (!product.length) {
    return next({ message: MESSAGES.productNotFound, status: RESPONSE_CODE.NOT_FOUND });
  }
  const respose = await productService.updateProduct({ ...req.body, id });
  res.status(RESPONSE_CODE.OK).json(respose);
});

module.exports = router;