const SalesModel = require('../models/Sales');

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
return insertId;
}

module.exports = { 
  getAll,
  getById,
  insertSales,
};