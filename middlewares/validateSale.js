const Joi = require('joi');
const { RESPONSE_CODE } = require('../helpers/contants');

const saleDTO = Joi.array().items(Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
}));

function validateSale(req, res, next) {
const { error } = saleDTO.validate(req.body);
const { type } = error.details[0];
const message = error.details[0].message.replace(/\[\d\]./, '');

if (type === 'number.min') {
  return next({ status: RESPONSE_CODE.ENTITY, message });
} if (error) {
 return next({ status: RESPONSE_CODE.BAD_REQUEST, message });
}
next();
}

module.exports = validateSale;