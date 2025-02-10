const {obtieneCategorias,obtieneProductosTodos,obtieneProductoId} = require('../models/productos')

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

module.exports = {
  handleGetCategorias,
  handleGetProductsAll,
  handleGetProductId
}