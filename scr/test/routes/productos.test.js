const app = require('../../app')
const request = require('supertest')
const {verifyToken,decodeToken} = require('../../helpers/jwt')
const {ValidateAdmin} = require('../../controllers/usuarios')
const {agregaProducto} = require('../../models/productos')

jest.mock('../../helpers/jwt')
jest.mock('../../controllers/usuarios')
jest.mock('../../models/productos')

describe('RUTAS TEST', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('POST /product - Solo para admins', async() => {
    const email = 'test@test.cl'
    const token = 'token'

    verifyToken.mockReturnValue(true)
    decodeToken.mockReturnValue(email) 
    ValidateAdmin.mockReturnValue(false)

    const response = await request(app)
      .post('/product')

    expect(response.status).toBe(402)
    expect(response.body.msg).toBe('Accion solo para administradores')
  })

  test('POST /product - Informacion faltate', async() => {
    const email = 'test@test.cl'

    verifyToken.mockReturnValue(true)
    decodeToken.mockReturnValue(email)
    ValidateAdmin.mockReturnValue(true)
    agregaProducto.mockReturnValue(false)
    
    const infoBody = {
      titulo:"titulo",
      subtitulo:"subtitulo",
      categoria_id:2,
      precio:122,
      descripcion:"descripcion",
      destacado:true,
      stock:2,
      url_img:"url",
      activo:false
    }

    const response = await request(app)
      .post('/product')
      .send(infoBody)

    expect(response.status).toBe(502)
  })
})