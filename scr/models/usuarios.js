const {DB} = require('../config/db')
const format = require('pg-format')

const registerUsuario = async (email,hashedPass,nombre,apellido,telefono) => {
   SQLQuery = format(`
      INSERT INTO usuarios
      VALUES (DEFAULT,%L,%L,%L,2,%L,%L,TRUE)
      RETURNING *`,
    nombre,
    apellido,
    hashedPass,
    email,
    telefono
  )
  const {rowsCount} = await DB.query(SQLQuery)
  return Boolean(rowsCount)
}

const loginUsuario = async (email) => {
  const SQLQuery = format(`
    SELECT email,hashtoken FROM usuarios
    WHERE email = %L`,
    email
  )
  const {rows} = await DB.query(SQLQuery)
  return rows
}

module.exports =  {
  registerUsuario,
  loginUsuario
}