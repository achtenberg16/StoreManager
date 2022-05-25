const Joi = require('joi');
const { RESPONSE_CODE } = require('../helpers/contants');

const saleDTO = Joi.array().items(Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
}));

function validateSale(req, _res, next) {
const { error } = saleDTO.validate(req.body);

if (error) {
  const message = error.details[0].message.replace(/\[\d\]./, '');
  const { type } = error.details[0];
  if (type === 'number.min') {
    return next({ status: RESPONSE_CODE.ENTITY, message });
  }
    return next({ status: RESPONSE_CODE.BAD_REQUEST, message });
}
next();
}

module.exports = validateSale;