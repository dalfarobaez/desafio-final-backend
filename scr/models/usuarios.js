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
  console.log(SQLQuery)
  const {rowsCount} = await DB.query(SQLQuery)
  return Boolean(rowsCount)
}

module.exports =  {
  registerUsuario
}