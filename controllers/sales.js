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

router.post('/', validateSale, async (req, res, next) => {
  const response = await salesService.insertSales(req.body);
  if (response.error) return next({ message: response.error, status: RESPONSE_CODE.ENTITY });
  res.status(RESPONSE_CODE.CREATED).json({
   id: response,
   itemsSold: req.body,
  });
});

router.put('/:id', validateSale, async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (!sale) {
    return next({ message: MESSAGES.saleNotFound, status: RESPONSE_CODE.NOT_FOUND });
   }

  await salesService.updateSales({ ...req.body[0], id });
  res.status(RESPONSE_CODE.OK).json({
    saleId: id,
    itemUpdated: req.body,
  });
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (!sale) {
    return next({ message: MESSAGES.saleNotFound, status: RESPONSE_CODE.NOT_FOUND });
   }
  await salesService.deleteSales(id);
  res.status(RESPONSE_CODE.NO_CONTENT).end();
}); 

module.exports = router;