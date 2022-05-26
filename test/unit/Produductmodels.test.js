const ProductsModel = require('../../models/Products')
const sinon = require('sinon')
const connect = require('../../db/connect')
const { expect } = require('chai')


describe('Products Model', () => {
  afterEach(async() => {
    connect.execute.restore()
  })

  it('get all retorna um array com um objeto na primeira posição', async() => {
  const execute  = [{insertId: 1}, []]
  sinon.stub(connect, 'execute').resolves(execute)
  const response = await ProductsModel.getAll()
   expect(response).to.be.a('array')
   expect(response[0]).to.equals(execute[0])
  })

  it('get by id tem o retorno esperado', async() => {
    const execute  = [[{id: 1, name: 'martelo', quantity: '30'}], []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await ProductsModel.getById(1)
    expect(response).to.be.a('array')
    expect(response[0][0]).to.equals(execute[0][0])
  })

  it('get by name tem o retorno esperado', async() => {
    const execute  = [[{id: 1, name: 'martelo', quantity: '30'}], []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await ProductsModel.getByName('martelo')
    expect(response).to.be.a('array')
    expect(response[0][0]).to.equals(execute[0][0])
  })

  it('createProduct tem o retorno esperado', async() => {
    const execute  = [{insertId: 1}, []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await ProductsModel.createProduct('martelo', 30)
    expect(response).to.be.a('array')
    expect(response[0]).to.haveOwnProperty('insertId')
  })

  it('updateProduct tem o retorno esperado', async() => {
    const execute  = [{update: 1}, []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await ProductsModel.updateProduct('martelo', 30, 1)
    expect(response).to.be.a('array')
    expect(response[0]).to.haveOwnProperty('update')
  })

  it('decrase tem o retorno esperado', async() => {
    const execute  = [{update: 1}, []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await ProductsModel.incraseProduct('martelo', 30, 1)
    expect(response).to.be.a('array')
    expect(response[0]).to.haveOwnProperty('update')
  })

  it('incraseProduct tem o retorno esperado', async() => {
    const execute  = [{update: 1}, []]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await ProductsModel.decraseProduct('martelo', 20, 1)
    expect(response).to.be.a('array')
    expect(response[0]).to.haveOwnProperty('update')
  })

  it('delete Product tem o retorno esperado', async() => {
    const execute  = [{}, null]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await ProductsModel.deleteProduct(1)
    expect(response).to.be.a('array')
    expect(response[1]).to.equal(null)
  })

  it('getSalesProduct tem o retorno esperado', async() => {
    const execute  = [[{sale_id: 1, product_id: 3, quantity: 8}], null]
    sinon.stub(connect, 'execute').resolves(execute)
    const response = await ProductsModel.getSalesProduct(1)
    expect(response).to.be.a('array')
    expect(response[0][0]).to.haveOwnProperty('sale_id')
  })
})