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

const agregaProducto = async (sku,titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo) => {
  SQLQuery = format(`
      INSERT INTO productos
      VALUES(DEFAULT,%L,%L,%L,%L,%L,%L,%L,%L,%L,%L)
      RETURNING *`,
    sku,
    titulo,
    subtitulo,
    descripcion,
    categoria_id,
    precio,
    activo,
    destacado,
    stock,
    url_img
  )
  const {rows} = await DB.query(SQLQuery)
  return Boolean(rows)
}

const modificaProducto = async(id,titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo) => {
  SQLQuery = format(`
    UPDATE productos
    SET
      titulo = %L,
      subtitulo = %L,
      descripcion = %L,
      categoria_id = %L,
      precio = %L,
      activo = %L,
      destacado = %L,
      stock = %L,
      url_img = %L
    WHERE id = %L
    RETURNING *`,
  titulo,
  subtitulo,
  descripcion,
  categoria_id,
  precio,
  activo,
  destacado,
  stock,
  url_img,
  id
)
const {rows} = await DB.query(SQLQuery)
return Boolean(rows)
}


module.exports =  {
  obtieneCategorias,
  obtieneProductosTodos,
  obtieneProductoId,
  agregaProducto,
  modificaProducto
}