const {obtieneCategorias,obtieneProductosTodos,obtieneProductoId,agregaProducto,modificaProducto} = require('../models/productos')
const {getHeadersToken,verifyToken,decodeToken} = require('../helpers/jwt')
const {ValidateAdmin} = require('../controllers/usuarios')

const handleGetCategorias = async(req,res,next) => {
  try {
    const result = await obtieneCategorias()
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const handleGetProductsAll = async(req,res,next) => {
  try {
    const result = await obtieneProductosTodos()
    return res.status(200).json(result) 
  } catch (error) {
    next(error)
  }
}

const handleGetProductId = async(req,res,next) => {
  try {
    const {id} = req.params
    const result = await obtieneProductoId(id)
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const handlePostProduct = async(req,res,next) => {
  try {
    const token = getHeadersToken(req)
    verifyToken(token)
    const user = decodeToken(token)
    const admin = await ValidateAdmin(user)
    if (!admin) {
      const msg = {'msg':'Accion solo para administradores'}
      return res.status(402).json(msg)
    }
    const {sku,titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo} = req.body
    const result = await agregaProducto (sku,titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo)
    if (result) {
      const msg = {'msg':'Producto agregado con éxito'}
      return res.status(200).json(msg)
    } else {
      const msg = {'msg':'Error al agregar producto'}
      return res.status(502).json(msg)
    }
  } catch (error) {
    next(error)
  }

}

const handlePutProduct = async(req,res,next) => {
  try {
    const token = getHeadersToken(req)
    verifyToken(token)
    const user = decodeToken(token)
    const admin = await ValidateAdmin(user)
    if (!admin) {
      const msg = {'msg':'Solo para administradores'}
      return res.status(402).json(msg)
    }
    const {titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo} = req.body
    const {id} = req.params
    const result = await modificaProducto (id,titulo,subtitulo,categoria_id,precio,descripcion,destacado,stock,url_img,activo)
    if (result) {
      const msg = {'msg':'Producto modificado con éxito'}
      return res.status(200).json(msg)
    } else {
      const msg = {'msg':'Error al modificar producto'}
      return res.status(502).json(msg)
    }
  } catch (error) {
    next(error)
  }
}


module.exports = {
  handleGetCategorias,
  handleGetProductsAll,
  handleGetProductId,
  handlePostProduct,
  handlePutProduct
}