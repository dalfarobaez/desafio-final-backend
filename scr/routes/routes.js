const {Router} = require('express')
const {handleGetCategorias,handleGetProductsAll,handleGetProductId} = require('../controllers/productos')
const {handlePostRegister} = require('../controllers/usuarios')

const router = Router()

router.get('/categories',handleGetCategorias)

router.get('/products/all',handleGetProductsAll)
router.get('/products/:id',handleGetProductId)

router.post('/register',handlePostRegister)

module.exports = router;