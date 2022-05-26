const { RESPONSE_CODE, MESSAGES } = require('../helpers/contants');
const productService = require('../services/products');

async function getById(req, res, next) {
  const { id } = req.params;
  const [product] = await productService.getById(id);
  if (!product) {
   next({ message: MESSAGES.productNotFound, status: RESPONSE_CODE.NOT_FOUND });
  } 
  res.status(RESPONSE_CODE.OK).json(product);
}

async function getAll(_req, res) {
  const products = await productService.getAll();
  res.status(RESPONSE_CODE.OK).json(products);
}

async function createProduct(req, res, next) {
  const respose = await productService.createProduct(req.body);
  if (respose.error) return next({ message: respose.error, status: RESPONSE_CODE.CONFLICT });
  res.status(201).json(respose);
}

async function updateProduct(req, res, next) {
  const { id } = req.params;
  const product = await productService.getById(id);
   if (!product.length) {
     return next({ message: MESSAGES.productNotFound, status: RESPONSE_CODE.NOT_FOUND });
   }
   const respose = await productService.updateProduct({ ...req.body, id });
   res.status(RESPONSE_CODE.OK).json(respose);
 }

 async function deleteProduct(req, res, next) {
  const { id } = req.params;
  const product = await productService.getById(id);
   if (!product.length) {
     return next({ message: MESSAGES.productNotFound, status: RESPONSE_CODE.NOT_FOUND });
   }
   await productService.deleteProduct(id);
   res.status(RESPONSE_CODE.NO_CONTENT).end();
}

module.exports = {
  getById,
  getAll,
  createProduct,
  updateProduct,
  deleteProduct,
};