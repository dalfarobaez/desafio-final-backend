const {signToken,verifyToken,decodeToken} = require('../helpers/jwt')
const {hashPassword,verifyPassword} = require('../helpers/bcrypt')
const {registerUsuario,loginUsuario} = require('../models/usuarios')

const handlePostRegister = async (req,res) => {
  const {email,password,nombre,apellido,telefono} = req.body
  const hashedPass = hashPassword(password)
  const result = await registerUsuario(email,hashedPass,nombre,apellido,telefono)
  if (result) {
    const token = signToken(email)
    const data = {'token':token}
    res.status(200).json(data)
  } else {
    res.status(502)
  }
}

const handlePostLogin = async (req,res) => {
  const {email,password} = req.body
  const user = await loginUsuario(email)
  const result = verifyPassword(password,user[0].hashtoken)
  let data
  if (result){
    const token = signToken(email)
    data = {'token':token}
  } else {
    data = 'Usuario o contraseña incorrecta'
  }
  res.send(data)
}

module.exports = {
  handlePostRegister,
  handlePostLogin
} 