const Joi = require('joi');
const { RESPONSE_CODE } = require('../helpers/contants');

const productDTO = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

function validateProduct(req, _res, next) {
const { error } = productDTO.validate(req.body);
const errorType = ['string.min', 'number.min'];

if (error) {
  const { type } = error.details[0];
  const message = error.details[0].message.replace(/\[\d\]./, '');
  if (errorType.includes(type)) {
    return next({ status: RESPONSE_CODE.ENTITY, message });
  }
  return next({ status: RESPONSE_CODE.BAD_REQUEST, message });
}

next();
}

module.exports = validateProduct;
