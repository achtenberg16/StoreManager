const express = require('express');
const validateSale = require('../middlewares/validateSale');
const salesControler = require('../controllers/sales');

const router = express.Router();

router.get('/:id', salesControler.getById);

router.get('/', salesControler.getAll);

router.post('/', validateSale, salesControler.insertSales);

router.put('/:id', validateSale, salesControler.updateSales);

router.delete('/:id', salesControler.deleteSales); 

module.exports = router;