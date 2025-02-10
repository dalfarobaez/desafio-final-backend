const {Router} = require('express')
const {handleGetCategorias,handleGetProductsAll,handleGetProductId,handlePostProduct,handlePutProduct} = require('../controllers/productos')
const {handlePostRegister,handlePostLogin,handleGetUserId} = require('../controllers/usuarios')

const router = Router()

router.get('/categories',handleGetCategorias)

router.get('/products/all',handleGetProductsAll)
router.get('/products/:id',handleGetProductId)
router.post('/product',handlePostProduct)
router.put('/product/:id',handlePutProduct)

router.post('/register',handlePostRegister)
router.post('/login',handlePostLogin)
router.get('/user/:id',handleGetUserId)

module.exports = router;