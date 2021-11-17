const express = require('express')
const Controller = require('../controllers/product.controller')
const SchemaValidateProduct = require("../validators/product.validator")
const router = express.Router()
const Validate = require("../validators")

router.post('/addProduct', Validate.body(SchemaValidateProduct.addProduct), Controller.addProductAsync)
router.post('/editProduct', Validate.body(SchemaValidateProduct.editProduct), Controller.editProductAsync)
router.post('/deleteProduct', Controller.deleteProductAsync)
router.get('/findProductByType', Validate.body(SchemaValidateProduct.findProductByType), Controller.findProductByTypeAsync)
router.get('/getALLProduct', Controller.getALLProductAsync)
router.get('/getProductDetail', Controller.getProductDetailAsync)
router.get('/findProductByName', Validate.body(SchemaValidateProduct.findProductByName), Controller.findProductByNameAsync)

module.exports = router