const connect = require('../db/connect');

function getAll() {
  return connect.execute('SELECT * FROM products');
}

function getById(id) {
  return connect.execute('SELECT * FROM products WHERE id = ?', [id]);
}

function getByName(name) {
  return connect.execute('SELECT * FROM products WHERE name = ?', [name]);
}

function createProduct(name, quantity) {
 return connect.execute('INSERT INTO products (name, quantity) VALUES (?, ?)',
 [name, quantity]);
}

function updateProduct(name, quantity, id) {
 return connect.execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?',
  [name, quantity, id]);
}

module.exports = { getAll, getById, getByName, createProduct, updateProduct };