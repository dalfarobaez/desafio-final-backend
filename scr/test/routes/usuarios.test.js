const app = require('../../app')
const request = require('supertest')
const {loginUsuario} = require('../../models/usuarios')
const {signToken} = require('../../helpers/jwt')
const {verifyPassword} = require('../../helpers/bcrypt')

jest.mock('../../models/usuarios')
jest.mock('../../helpers/jwt')
jest.mock('../../helpers/bcrypt')


describe('RUTAS TEST', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('POST /login - Usuario incorrecto', async() => {
    const email = 'test@test.cl'
    const password = 'password'

    responseDataBase = []
    loginUsuario.mockReturnValue(responseDataBase) 

    const response = await request(app)
      .post('/login')
      .send({email,password})

    expect(response.status).toBe(200)
    expect(response.body.msg).toBe('Usuario incorrecto')
  })

  test('POST /login - Exitoso', async() => {
    const email = 'test@test.cl'
    const password = 'password'
    const hashedpass = 'hashedtoken'
    const token = 'token'

    responseDataBase = [{email,hashedpass}]

    loginUsuario.mockReturnValue(responseDataBase)
    verifyPassword.mockReturnValue(true)
    signToken.mockReturnValue(token)

    const response = await request(app)
      .post('/login')
      .send({email,password})

    expect(response.status).toBe(200)
    expect(response.body.token).toBe(token)
  })
})