const { RESPONSE_CODE, MESSAGES } = require('../helpers/contants');

const salesService = require('../services/sales');

async function getById(req, res, next) {
  const { id } = req.params;
  const sale = await salesService.getById(id);
 
   if (!sale) {
    return next({ message: MESSAGES.saleNotFound, status: RESPONSE_CODE.NOT_FOUND });
   }
   res.status(RESPONSE_CODE.OK).json(sale);
 }

 async function getAll(_req, res) {
  const sales = await salesService.getAll();
  res.status(RESPONSE_CODE.OK).json(sales);
}

async function insertSales(req, res, next) {
  const response = await salesService.insertSales(req.body);
  if (response.error) return next({ message: response.error, status: RESPONSE_CODE.ENTITY });
  res.status(RESPONSE_CODE.CREATED).json({
   id: response,
   itemsSold: req.body,
  });
}

async function updateSales(req, res, next) {
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
}

async function deleteSales(req, res, next) {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (!sale) {
    return next({ message: MESSAGES.saleNotFound, status: RESPONSE_CODE.NOT_FOUND });
   }
  await salesService.deleteSales(id);
  res.status(RESPONSE_CODE.NO_CONTENT).end();
}

module.exports = {
  getById,
  getAll,
  insertSales,
  updateSales,
  deleteSales,
};