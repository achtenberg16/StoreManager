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

    it('se o model retorna uma venda quando da tudo certo', async() => {
      sinon.stub(salesService, 'getById').resolves({saleId: 1, productId: 1, quantity: 1});
      await salesController.getById(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({saleId: 1, productId: 1, quantity: 1})).to.be.true;
    })
  })

  describe('getAll', () => {
    const res = {};
    const req = {};
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
    })

    it('testa se um array é retornado', async() => {
     sinon.stub(salesService, 'getAll').resolves([{saleId: 1, productId: 1, quantity: 1}]);
     await salesController.getAll(req, res);
     expect(res.status.calledWith(200)).to.be.true;
     salesService.getAll.restore();
    })
  })

  describe('insertSale', () => {
    const res = {};
    const req = {body: [{productId: 1, quantity: 1}]};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
      next = sinon.stub()
    }) 
    
    it("quando a quantidade não esta disponivel", async() => {
      sinon.stub(salesService, 'insertSales').resolves({error: 'Product not available'});
      await salesController.insertSales(req, res, next);
      expect(next.calledWith({ message: 'Product not available', status: 422 })).to.be.true;
      salesService.insertSales.restore()
    })

    it('quando a quantidade esta disponivel', async() => {
      sinon.stub(salesService, 'insertSales').resolves(1);
      await salesController.insertSales(req, res, next);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({id: 1, itemsSold: req.body})).to.be.true;
      salesService.insertSales.restore()
    })
  })

  describe('updateSale', () => {
    const res = {};
    const req = {body: [{productId: 1, quantity: 1}], params: {id: 1}};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
      next = sinon.stub()
    }) 

    it('quando a venda não existe', async() => {
      sinon.stub(salesService, 'getById').resolves(false);
      await salesController.updateSales(req, res, next);
      expect(next.calledWith({ message: 'Sale not found', status: 404 })).to.be.true;
      salesService.getById.restore()
    })

    it('quando a venda existe', async() => {
      sinon.stub(salesService, 'getById').resolves({saleId: 1, productId: 1, quantity: 1});

      await salesController.updateSales(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({saleId: 1, itemUpdated: req.body})).to.be.true;
      salesService.getById.restore();
    })
  })

  describe('deleteSale', () => {
    const res = {};
    const req = {body: [{productId: 1, quantity: 1}], params: {id: 1}};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
      res.end = sinon.stub()
      next = sinon.stub()
    }) 
    it('quando a venda não existe', async() => {
      sinon.stub(salesService, 'getById').resolves(false);
      await salesController.deleteSales(req, res, next);
      expect(next.calledWith({ message: 'Sale not found', status: 404 })).to.be.true;
      salesService.getById.restore()
    })

    it('quando a venda existe', async() => {
      sinon.stub(salesService, 'getById').resolves({saleId: 1, productId: 1, quantity: 1});
      await salesController.deleteSales(req, res, next);
      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.calledWith()).to.be.true;
      salesService.getById.restore();
    })
  })

})