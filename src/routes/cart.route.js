const express = require('express')
const Controller = require('../controllers/cart.controller')
const router = express.Router()
const SchemaValidateCart = require("../validators/cart.validator")
const Validate = require("../validators")
const jwtServices = require("../services/jwt.service")
const verifyHelper = require('../helpers/verifyUser.helper')
const { defaultRoles } = require('../config/defineModel')


router.get('/getCart', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Controller.getCartAsync);
router.post('/addProductIntoCart', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Validate.body(SchemaValidateCart.addProductIntoCart), Controller.addProductIntoCartAsync);
router.post('/editProductInCart', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Validate.body(SchemaValidateCart.editProductInCart), Controller.editProductInCartAsync);
router.post('/deleteProductInCart', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Controller.deleteProductInCartAsync);


module.exports = router
