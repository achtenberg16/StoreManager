const express = require('express');
const { RESPONSE_CODE, MESSAGES } = require('../helpers/contants');
const salesService = require('../services/sales');

const router = express.Router();

router.get('/:id', async (req, res) => {
 const { id } = req.params;
 const sale = await salesService.getById(id);

  if (!sale) {
    res.status(RESPONSE_CODE.NOT_FOUND).json({ message: MESSAGES.saleNotFound });
  }
  res.status(RESPONSE_CODE.OK).json(sale);
});

router.get('/', async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(RESPONSE_CODE.OK).json(sales);
});

module.exports = router;