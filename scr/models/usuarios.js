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
  const {rows} = await DB.query(SQLQuery)
  return Boolean(rows)
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

const getUsuario = async (id) => {
  const SQLQuery = format(`
    SELECT email,nombre,apellido,telefono,rol_id,activo FROM usuarios
    WHERE id = %L`,
    id)
  const {rows,rowCount} = await DB.query(SQLQuery)
  return {rows,rowCount}
}

const getAdmin = async () => {
  const SQLQuery = `
      SELECT DISTINCT email
      FROM usuarios u
      LEFT JOIN rol r on r.id = u.rol_id
      WHERE r.nombre = 'Administrador'
    `
  const {rows} = await DB.query(SQLQuery)
  return {rows}
}

module.exports =  {
  registerUsuario,
  loginUsuario,
  getUsuario,
  getAdmin
}