const Joi = require('joi');
const { RESPONSE_CODE } = require('../helpers/contants');

const productDTO = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

function validateProduct(req, _res, next) {
const { error } = productDTO.validate(req.body);
const { type } = error.details[0];
const errorType = ['string.min', 'number.min'];
if (errorType.includes(type)) {
  return next({ status: RESPONSE_CODE.ENTITY, message: error.details[0].message });
} if (error) {
 return next({ status: RESPONSE_CODE.BAD_REQUEST, message: error.details[0].message });
}
next();
}

module.exports = validateProduct;
