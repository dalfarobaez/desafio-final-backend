const {handleGetCategorias,handleGetProductsAll,handleGetProductId,handlePostProduct,handlePutProduct} = require('../../controllers/productos')
const {ValidateAdmin} = require('../../controllers/usuarios')
const {getHeadersToken,verifyToken,decodeToken} = require('../../helpers/jwt')

jest.mock('../../models/productos')
jest.mock('../../models/usuarios')
jest.mock('../../controllers/usuarios')
jest.mock('../../helpers/jwt')

describe('CONTROLLERS PRODUCTOS TEST', () => {
  let req, res, next
  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(), 
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    next =  jest.fn()
  })

  test('handleGetCategorias - Obtener Categorias', async() => {
    categorias = [
      {
          "id": 1,
          "nombre": "Familiares"
      },
      {
          "id": 2,
          "nombre": "Individuales"
      },
      {
          "id": 3,
          "nombre": "Postres"
      }
    ]

    await handleGetCategorias(req,res,next)
  })

  test('handlePostProduct - Agrega un producto', async() => {
    const Authorization = 'Bearer token'
    const token = Authorization.split("Bearer ")[1]
    req.header = {
      Authorization
    }

    await handlePostProduct(req,res,next)
    expect(getHeadersToken).toHaveBeenCalledWith(req)
  })
})