const connect = require('../db/connect');

function getAll() {
  return connect.execute(`SELECT * FROM sales_products as sp
INNER JOIN sales as s
ON sp.sale_id = s.id
ORDER BY sale_id, product_id;`);
}

function getById(id) {
  return connect.execute(`
  SELECT 
  s.id, s.date, sp.product_id, sp.quantity
  FROM
  sales AS s
  INNER JOIN
  sales_products AS sp ON s.id = sp.sale_id
  WHERE s.id = ?
  ORDER BY sp.product_id`, [id]);
}

function insertSaleProduct(quantity, productId, saleId) {
return connect.execute(`INSERT INTO sales_products (sale_id, product_id, quantity)
VALUES (?, ?, ?)`,
 [saleId, productId, quantity]);
}

function insertSale() {
  return connect.execute('INSERT INTO sales(date) VALUES(now())');
}

module.exports = { getAll, getById, insertSale, insertSaleProduct };