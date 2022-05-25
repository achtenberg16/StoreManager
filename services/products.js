const productsModel = require('../models/Products');

async function getAll() {
  const [products] = await productsModel.getAll();
  return products;
}

async function getById(id) {
  const [products] = await productsModel.getById(id);
  return products;
}

async function createProduct({ name, quantity }) {
const [product] = await productsModel.getByName(name);
if (product[0]) return { error: 'Product already exists' };
const [newProduct] = await productsModel.createProduct(name, quantity);
return { id: newProduct.insertId, name, quantity };
}

module.exports = {
  getAll,
  getById,
  createProduct,
};