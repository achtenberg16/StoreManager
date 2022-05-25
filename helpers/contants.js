const RESPONSE_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  ENTITY: 422,
};

const MESSAGES = {
  productNotFound: 'Product not found',
  saleNotFound: 'Sale not found',
};
module.exports = { RESPONSE_CODE, MESSAGES };