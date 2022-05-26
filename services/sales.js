const SalesModel = require('../models/Sales');
const ProductsModel = require('../models/Products');

function formatSales({ product_id: productId, sale_id: saleId, quantity, date }) {
 return ({
  saleId,
  productId,
  quantity,
  date,
 });
}

async function getAll() {
  const [sales] = await SalesModel.getAll();
  const salesNormalize = sales.map(formatSales);
  return salesNormalize;
}

async function getById(id) {
  const [sales] = await SalesModel.getById(id);
  if (sales.length) {
    return sales.map(formatSales);
  }
  return false;
}

async function insertSales(sales) {
const [sale] = await SalesModel.insertSale();
const { insertId } = sale;
await Promise.all(sales.map(({ quantity, productId }) => 
SalesModel.insertSaleProduct(quantity, productId, insertId)));
await Promise.all(sales.map(ProductsModel.incraseProduct));
return insertId;
}

async function updateSales({ productId, quantity, id }) {
  await SalesModel.updateSales(productId, quantity, id);
}

async function deleteSales(id) {
 const [salesResume] = await ProductsModel.getSalesProduct(id);
 await Promise.all(salesResume.map(ProductsModel.decraseProduct));
 const response = await SalesModel.deleteSales(id);
 return response;
}

module.exports = { 
  getAll,
  getById,
  insertSales,
  updateSales,
  deleteSales,
};