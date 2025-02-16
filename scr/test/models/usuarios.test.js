const {registerUsuario,loginUsuario,getUsuario,getAdmin} = require('../../models/usuarios')
const {DB} = require('../../config/db')
const { describe } = require('node:test')

jest.mock('../../config/db')

describe('MODELS USUARIOS TEST', () => {
  test('loginUsuario - Usuario encontrado', async() => {
    const email = 'test@test.cl'
    const hashedtoken = 'hashedtoken'

    const user = [{email,hashedtoken}]

    DB.query.mockResolvedValue({rows:user})

    const resut = await loginUsuario(email)

    expect(resut).toBe(user)
    expect(DB.query).toHaveBeenCalledTimes(1)
  })

  test('loginUsuario - Usuario no encontrado', async() => {
    const email = 'test@test.cl'

    DB.query.mockResolvedValue({rows:[]})

    const resut = await loginUsuario(email)

    expect(resut).toStrictEqual([])
    expect(DB.query).toHaveBeenCalledTimes(2)
  })

  test('registerUsuario - Registro exitoso', async() => {
    const email = 'example@test.cl'
    const hashedPass = 'hashedPass'
    const nombre = 'Test'
    const apellido = 'Test1'
    const telefono = 1234

    const user = [{email,hashedPass,nombre,apellido,telefono}]

    DB.query.mockResolvedValue({rows:user})

    const resut = await registerUsuario(email,hashedPass,nombre,apellido,telefono)

    expect(resut).toBe(user)
    expect(DB.query).toHaveBeenCalledTimes(3)
  })
})