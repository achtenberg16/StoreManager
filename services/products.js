const productsModel = require('../models/Products');

async function getAll() {
  const [products] = await productsModel.getAll();
  return products;
}

async function getById(id) {
  const [products] = await productsModel.getById(id);
  return products;
}

module.exports = {
  getAll,
  getById,
};