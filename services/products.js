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

async function updateProduct({ id, name, quantity }) {
  await productsModel.updateProduct(name, quantity, id);
  return { id, name, quantity };
}

async function deleteProduct(id) {
  const [deleteP] = await productsModel.deleteProduct(id);
  return deleteP;
}

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};