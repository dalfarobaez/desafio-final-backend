const {signToken,verifyToken,decodeToken} = require('../helpers/jwt')
const {hashPassword,verifyPassword} = require('../helpers/bcrypt')
const {registerUsuario} = require('../models/usuarios')

const handlePostRegister = async (req,res) => {
  const {email,password,nombre,apellido,telefono} = req.body
  console.log(password)
  const hashedPass = hashPassword(password)
  const result = await registerUsuario(email,hashedPass,nombre,apellido,telefono)
  res.status(200).json(result)
}

module.exports = {
  handlePostRegister
} 