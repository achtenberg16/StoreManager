const chai = require('chai')
const sinon = require('sinon')
const connect = require('../../db/connect')
const { expect } = require('chai')
const productsService = require('../../services/products')


describe('services products', () => {
  describe('getAll e getById', () => {
    afterEach(async() => {
      connect.execute.restore()
    })
    
    it('testa se getAll tem o retorno esperado', async() => {
    const execute = [[{id: 1, name: 'cola', quantity:  20}], []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await productsService.getAll()
    expect(response).to.be.a('array')
    expect(response[0]).to.equals(execute[0][0])
    })

    it('testa se getById tem o retorno esperado', async() => {
      const execute = [[{id: 3, name: 'colar', quantity:  2}], []]
      sinon.stub(connect, 'execute').resolves(execute)
      const response = await productsService.getById(3)
      expect(response).to.be.a('array')
      expect(response[0]).to.equals(execute[0][0])
    })
  })

  describe('createProduct', () => {
    afterEach(async() => {
      connect.execute.restore()
    })
    
    it('testa o retorno quando o produto já existe', async() => {
      const execute = [[{id: 1, name: 'cola', quantity:  20}], []]
      sinon.stub(connect, 'execute').resolves(execute)
      const response = await productsService.createProduct({name: 'cola', quantity: 20})
      expect(response).to.be.a('object')
      expect(response.error).to.equals('Product already exists')
    })

    it('testa se um produto é cadastrado corretamente', async() => {
      const execute = [[], []]
      const execute2 = [{insertId: 1}, []]
      sinon.stub(connect, 'execute')
      .onFirstCall().resolves(execute).onSecondCall().resolves(execute2)
      const response = await productsService.createProduct({name: 'cola', quantity: 20})
      expect(response).to.be.a('object')
    })
  })

  describe('updateProduct', () => {
    afterEach(async() => {
      connect.execute.restore()
    })
    
    it('testa o retorno quando um produto é atualizado', async () => {
      sinon.stub(connect, 'execute')
      const response = await productsService.updateProduct({id: 1, name: 'coca', quantity: 20});
      expect(response).to.be.a('object');
      expect(response).to.haveOwnProperty('id');
    })
  })


  describe('deleteProduct', () => {
    afterEach(async() => {
      connect.execute.restore()
    })
      
    it('testa se um produto é deletado', async() => {
      const execute = [[], []]
      sinon.stub(connect, 'execute').resolves(execute)
      const response = await productsService.deleteProduct(1)
      expect(response).to.be.a('array')
    })
  })

})