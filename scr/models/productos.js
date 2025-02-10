const {DB} = require('../config/db')
const format = require('pg-format')

const obtieneCategorias = async () => {
  SQLQuery = 'SELECT * FROM categorias'
  const {rows} = await DB.query(SQLQuery)
  return rows
}

const obtieneProductosTodos = async () => {
  SQLQuery = `
    SELECT id,categoria_id,titulo,subtitulo,precio,url_img as imagen,sku
    FROM productos
    WHERE activo = TRUE
    `
  const {rows} = await DB.query(SQLQuery)
  return rows
}

const obtieneProductoId = async (idProduct) => {
  SQLQuery = format(`
    SELECT id,categoria_id,titulo,subtitulo,precio,url_img as imagen,sku,descripcion
    FROM productos
    WHERE id = %L
    `,idProduct
  )
  const {rows} = await DB.query(SQLQuery)
  return rows
}

module.exports =  {
  obtieneCategorias,
  obtieneProductosTodos,
  obtieneProductoId
}