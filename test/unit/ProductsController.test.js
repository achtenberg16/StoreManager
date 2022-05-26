const chai = require('chai')
const sinon = require('sinon')
// const connect = require('../../db/connect')
const { expect } = require('chai')
const productsController = require('../../controllers/products')
const productService = require('../../services/products');


describe('controllers products', () => {
  describe('get By id', () => {
    const res = {};
    const req = {params: {id: 1}};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
      next = sinon.stub()
    })

    afterEach(async() => {
      productService.getById.restore();
    })
     
    it('se se o model retorna um erro quando não encontra produto', async() => {
     sinon.stub(productService, 'getById').resolves([]);
      await productsController.getById(req, res, next);
     expect(next.calledWith({ message: 'Product not found', status: 404 })).to.be.true;
    })

    it('se o model retorna sucesso quando o produto é encontrado', async() => {
      const product = {productId: 1, name: 'teste', quantity: 1}
      sinon.stub(productService, 'getById').resolves([product]);
       await productsController.getById(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;

     })
  })

  describe('get all', () => {
    const res = {};
    const req = {};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
    })


    it('testa se um array é retornado', async () => {
      const product = [{productId: 1, name: 'teste', quantity: 1}]
      sinon.stub(productService, 'getAll').resolves(product);
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([{productId: 1, name: 'teste', quantity: 1}])).to.be.true;
      productService.getAll.restore();
    })

  })

  describe('createProduct', () => {
    const res = {};
    const req = {params: {id: 1}};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
      next = sinon.stub()
    })

    it('testa se o produto já existe', async () => {
      sinon.stub(productService, 'createProduct').resolves({error: 'Product already exists'});
      await productsController.createProduct(req, res, next);
      expect(next.calledWith({ message: 'Product already exists', status: 409 })).to.be.true;
      productService.createProduct.restore();
    })
    it('testa ao criar um produto com sucesso', async() => {
      const product = {productId: 1, name: 'teste', quantity: 1}
      sinon.stub(productService, 'createProduct').resolves(product);
      await productsController.createProduct(req, res, next);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;
      productService.createProduct.restore();
    })
  })

  describe('updateProduct', () => {
    const res = {};
    const req = {params: {id: 1}};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
      next = sinon.stub()
    })

    it('testa se o produto já existe', async () => {
      sinon.stub(productService, 'getById').resolves([])
      sinon.stub(productService, 'updateProduct').resolves({error: 'Product not found'});
      await productsController.updateProduct(req, res, next);
      expect(next.calledWith({ message: 'Product not found', status: 404 })).to.be.true;
      productService.updateProduct.restore();
      productService.getById.restore()
    })
    it('testa ao atualizar um produto com sucesso', async() => {
      const product = {productId: 1, name: 'teste', quantity: 1}
      sinon.stub(productService, 'getById').resolves([product])
      sinon.stub(productService, 'updateProduct').resolves(product);
      await productsController.updateProduct(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(product)).to.be.true;
      productService.updateProduct.restore();
      productService.getById.restore()
    })
  })

  describe('deleteProduct', () => {
    const res = {};
    const req = {params: {id: 1}};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
      next = sinon.stub()
    });
   it('quando o produto não existe', async() => {
    sinon.stub(productService, 'getById').resolves([]);
    sinon.stub(productService, 'deleteProduct').resolves();
    await productsController.deleteProduct(req, res, next);
    expect(next.calledWith({ message: 'Product not found', status: 404 })).to.be.true;
    productService.deleteProduct.restore();
    productService.getById.restore();
   })
   
   
  })
})
