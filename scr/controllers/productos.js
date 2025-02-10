const {obtieneCategorias,obtieneProductosTodos,obtieneProductoId,agregaProducto,modificaProducto,eliminaProducto} = require('../models/productos')

const handleGetCategorias = async(req,res) => {
  const result = await obtieneCategorias()
  res.status(200).json(result)
}

const handleGetProductsAll = async(req,res) => {
  const result = await obtieneProductosTodos()
  res.status(200).json(result)
}

const handleGetProductId = async(req,res) => {
  const {id} = req.params
  const result = await obtieneProductoId(id)
  res.status(200).json(result)
}

const handlePostProduct = async(req,res) => {
  const {sku,titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo} = req.body
  const result = await agregaProducto (sku,titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo)
  if (result) {
    const msg = {'msg':'Producto agregado con éxito'}
    res.status(200).json(msg)
  } else {
    const msg = {'msg':'Error al agregar producto'}
    res.status(502).json(msg)
  }
}

const handlePutProduct = async(req,res) => {
  const {titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo} = req.body
  const {id} = req.params
  const result = await modificaProducto (id,titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo)
  if (result) {
    const msg = {'msg':'Producto modificado con éxito'}
    res.status(200).json(msg)
  } else {
    const msg = {'msg':'Error al modificar producto'}
    res.status(502).json(msg)
  }
}

const handleDeleteProduct = async(req,res) => {

}

module.exports = {
  handleGetCategorias,
  handleGetProductsAll,
  handleGetProductId,
  handlePostProduct,
  handlePutProduct,
  handleDeleteProduct
}