const {signToken,verifyToken,decodeToken} = require('../helpers/jwt')
const {hashPassword,verifyPassword} = require('../helpers/bcrypt')
const {registerUsuario,loginUsuario,getUsuario} = require('../models/usuarios')

const handlePostRegister = async (req,res) => {
  const {email,password,nombre,apellido,telefono} = req.body
  const hashedPass = hashPassword(password)
  const result = await registerUsuario(email,hashedPass,nombre,apellido,telefono)
  console.log(result)
  if (result) {
    const token = signToken(email)
    const data = {'token':token}
    res.status(200).json(data)
  } else {
    const msg = {'msg':'Error al crear usuario'}
    res.status(502).json(msg)
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

const handleGetUserId = async (req,res) => {
  const {id} = req.params
  const {rows,rowCount} = await getUsuario(id)
  console.log(rowCount)
  if (rowCount>0) {
    res.status(200).json(rows)
  } else {
    const msg = {'msg':'Error al encontrar'}
    res.status(502).json(msg)
  }
}

module.exports = {
  handlePostRegister,
  handlePostLogin,
  handleGetUserId
} 