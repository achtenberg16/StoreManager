const chai = require('chai')
const sinon = require('sinon')
const connect = require('../../db/connect')
const { expect } = require('chai')
const salesService = require('../../services/sales')

describe('Service sales', () => {
  describe('getAll', () => {
    afterEach(async() => {
      connect.execute.restore()
    })
    it('testa se o retorno é conforme o esperado', async() => {
      const execute = [[{product_id: 10, sale_id: 5, quantity: 5, date: '30/05/21' }], []]
      sinon.stub(connect, 'execute').resolves(execute)
      const expectResult = {saleId: 5, productId: 10, quantity: 5, date: '30/05/21' }
      const response = await salesService.getAll()
      expect(response).to.be.a('array')
      expect(response[0]).to.eql(expectResult)
    })
  })

    describe('getById', () => {
      afterEach(async() => {
        connect.execute.restore()
      })
      it('testa se o retorno é conforme o esperado quando existe', async() => {
        const execute = [[{product_id: 10, sale_id: 5, quantity: 5, date: '30/05/21' }], []]
        sinon.stub(connect, 'execute').resolves(execute)
        const expectResult = {saleId: 5, productId: 10, quantity: 5, date: '30/05/21' }
        const response = await salesService.getById(10)
        expect(response).to.be.a('array')
        expect(response[0]).to.eql(expectResult)
      })
      it('testa o retorno quando o produto não existe', async() => {
        const execute = [[], []]
        sinon.stub(connect, 'execute').resolves(execute)
        const response = await salesService.getById(10)
        expect(response).to.be.false
      })
    })


    describe('update sales', () => {
      afterEach(async() => {
        connect.execute.restore()
      })
      it('testa se o retorno é conforme o esperado', async() => {
        const execute = [[], []]
        sinon.stub(connect, 'execute').resolves(execute)
        const response = await salesService.updateSales({productId: 10, quantity: 5, id: 5})
        expect(response).to.equal(true)
      })
    })


    describe('delete sales', () => {
      afterEach(async() => {
        connect.execute.restore()
      })
      it('testa se o retorno é conforme o esperado', async() => {
        const execute = [[{product_id: 1, quantity: 5}], []]
        const execute3 = [[], null]
        sinon.stub(connect, 'execute')
        .onFirstCall().resolves(execute).onThirdCall().resolves(execute3)
        const response = await salesService.deleteSales(5)
        expect(response[1]).to.equal(null)
      })
    })

    describe('insert sales', () => {
      afterEach(async() => {
        connect.execute.restore()
      })
      
      it('testa o retorno quando o stock é invalido', async() => {
        const execute1 = [[{product_id: 1, quantity: 5}], []]
        sinon.stub(connect, 'execute').onFirstCall().resolves(execute1)
        const response = await salesService.insertSales([{productId: 1, quantity: 6}])
        expect(response).to.be.a('object')
        expect(response.error).to.equal('Such amount is not permitted to sell')
      })

      it('testa o retorno quando o stock é valido', async() => {
        const execute1 = [[{product_id: 1, quantity: 5}], []]
        const execute2 = [{insertId: 3}, []]
        sinon.stub(connect, 'execute')
        .onFirstCall().resolves(execute1).onSecondCall().resolves(execute2);
        const response = await salesService.insertSales([{productId: 1, quantity: 4}])
        expect(response).to.be.equal(3)
      })
    })

})