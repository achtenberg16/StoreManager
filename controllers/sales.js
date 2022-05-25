const express = require('express');
const { RESPONSE_CODE, MESSAGES } = require('../helpers/contants');
const validateSale = require('../middlewares/validateSale');
const salesService = require('../services/sales');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
 const { id } = req.params;
 const sale = await salesService.getById(id);

  if (!sale) {
   return next({ message: MESSAGES.saleNotFound, status: RESPONSE_CODE.NOT_FOUND });
  }
  res.status(RESPONSE_CODE.OK).json(sale);
});

router.get('/', async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(RESPONSE_CODE.OK).json(sales);
});

router.post('/', validateSale, (req, res) => {
  res.status(RESPONSE_CODE.CREATED).end();
});

router.put('/:id', validateSale, (req, res) => {
  res.status(RESPONSE_CODE.OK).end();
});

module.exports = router;