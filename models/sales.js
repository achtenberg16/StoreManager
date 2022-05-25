const connect = require('../db/connect');

function getAll() {
  return connect.execute('SELECT * FROM sales_products ORDER BY sale_id, product_id');
}

function getById(id) {
  return connect.execute('SELECT * FROM sales_products WHERE sale_id = ?', [id]);
}

module.exports = { getAll, getById };