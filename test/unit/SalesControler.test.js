const chai = require('chai')
const SalesControler = require('../../models/Sales')
const sinon = require('sinon')
const connect = require('../../db/connect')
const { expect } = require('chai')


describe('Sales Model', () => {
  afterEach(async() => {
    connect.execute.restore()
  })

  it('getAll tem o retorno esperado', async() => {
    const execute  = [[{sale_id: 1, product_id: 1, quantity: 5, date: '2022-05-26 12:01:55'}], []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await SalesControler.getAll()
    expect(response).to.be.a('array')
    expect(response[0][0]).to.haveOwnProperty('sale_id')
  })

  it('getById tem o retorno esperado', async() => {
    const execute  = [[{sale_id: 1, product_id: 1, quantity: 5, date: '2022-05-26 12:01:55'}], []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await SalesControler.getById()
    expect(response).to.be.a('array')
    expect(response[0][0]).to.haveOwnProperty('sale_id')
  })

  it('insertSaleProduct tem o retorno esperado', async() => {
    const execute  = [{insertId: 1}, []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await SalesControler.insertSaleProduct()
    expect(response).to.be.a('array')
    expect(response[0]).to.haveOwnProperty('insertId')
  })

  it('insertSale tem o retorno esperado', async() => {
    const execute  = [{insertId: 1}, []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await SalesControler.insertSale()
    expect(response).to.be.a('array')
    expect(response[0]).to.haveOwnProperty('insertId')
  })

  it('updateSales tem o retorno esperado', async() => {
    const execute  = [{updateId: 1}, []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await SalesControler.updateSales()
    expect(response).to.be.a('array')
    expect(response[0]).to.haveOwnProperty('updateId')
  })

  it('deleteSales tem o retorno esperado', async () => {
    const execute  = [{}, null]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await SalesControler.deleteSales()
    expect(response).to.be.a('array')
    expect(response[1]).to.equal(null)
  })

})