const {signToken,getHeadersToken,verifyToken,decodeToken} = require('../helpers/jwt')
const {hashPassword,verifyPassword} = require('../helpers/bcrypt')
const {registerUsuario,loginUsuario,getUsuario,getAdmin} = require('../models/usuarios')

const ValidateAdmin = async (email) => {
  const admin = await getAdmin()
  const emails = admin.rows?.map(row => row.email) || [];
  return (emails.includes(email))
}

const handlePostRegister = async (req,res,next) => {
  try {
    const {email,password,nombre,apellido,telefono} = req.body
    const hashedPass = hashPassword(password)
    const result = await registerUsuario(email,hashedPass,nombre,apellido,telefono)
    if (result) {
      const token = signToken(email)
      const data = {'token':token}
      res.status(200).json(data)
    } else {
      const error = 'register_error'
      next(error)
    } 
  } catch (error) {
    next(error)
  }
}

const handlePostLogin = async (req,res,next) => {
  try {
    const {email,password} = req.body
    const user = await loginUsuario(email)
    let result
    let data
    if (user.length>0) {
      result = verifyPassword(password,user[0].hashtoken)
      if (result){
        const token = signToken(email)
        data = {'token':token}
      } else {
        data = 'Contraseña incorrecta'
      }
    } else {
      data = 'Usuario incorrecto'
    }
    res.send(data)    
  } catch (error) {
    next(error)
  }
}

const handleGetUserId = async (req,res,next) => {
  try {
    const {id} = req.params

    const token = getHeadersToken(req)
    verifyToken(token)
    const user = decodeToken(token)
    const admin = await ValidateAdmin(user)
    const {rows,rowCount} = await getUsuario(id)

    if (rowCount==0) {
      const error = 'user_not_found'
      next(error)
    } else if (rows[0]["email"] != user && !admin) {
      const error = 'unauthorized'
      next(error)
    } else {
      res.status(200).json(rows)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  handlePostRegister,
  handlePostLogin,
  handleGetUserId,
  ValidateAdmin
} 