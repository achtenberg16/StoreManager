const salesController = require('../../controllers/sales')
const salesService = require('../../services/sales')
const sinon = require('sinon')
const connect = require('../../db/connect')
const { expect } = require('chai')


describe('controllers sales', () => {
  describe('getById', () => {
    const res = {};
    const req = {params: {id: 1}};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
      next = sinon.stub()
    })

    afterEach(async() => {
      salesService.getById.restore();
    })
     
    it('se se o model retorna um erro quando não encontra venda', async() => {
     sinon.stub(salesService, 'getById').resolves();
      await salesController.getById(req, res, next);
     expect(next.calledWith({ message: 'Sale not found', status: 404 })).to.be.true;
    })

  })
})