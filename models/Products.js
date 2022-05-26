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

function incraseProduct({ quantity, productId }) {
 return connect.execute('UPDATE products SET quantity = quantity - ? WHERE id = ?',
  [quantity, productId]);
}

function decraseProduct({ quantity, product_id: productId }) {
  return connect.execute('UPDATE products SET quantity = quantity + ? WHERE id = ?',
   [quantity, productId]); 
}

function deleteProduct(id) {
  return connect.execute('DELETE FROM products WHERE id = ?', [id]);
}

function getSalesProduct(id) {
  return connect.execute('SELECT * FROM sales_products WHERE sale_id = ?', [id]);
}

module.exports = { getAll,
getById,
getByName,
createProduct,
updateProduct, 
deleteProduct,
getSalesProduct,
incraseProduct,
decraseProduct,
};