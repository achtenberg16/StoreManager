const connect = require('../db/connect');

function getAll() {
  return connect.execute('SELECT * FROM products');
}

function getById(id) {
  return connect.execute('SELECT * FROM products WHERE id = ?', [id]);
}

module.exports = { getAll, getById };