const express = require('express')
const Controller = require('../controllers/order.controller')
const SchemaValidateOrder = require("../validators/order.validator")
const router = express.Router()
const Validate = require("../validators")
const jwtServices = require("../services/jwt.service")
const verifyHelper = require('../helpers/verifyUser.helper')
const { defaultRoles } = require('../config/defineModel')


router.get('/getOrderByDate', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Controller.getOrderByDateAsync)
router.get('/getNotConfirmOrderByDate', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Controller.getNotConfirmOrderByDateAsync)
router.get('/getOrderByTotalPrice', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Controller.getOrderByTotalPriceAsync)
router.post('/placeOrder', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Validate.body(SchemaValidateOrder.placeOrder), Controller.placeOrderAsync)
router.get('/getProductsOrder', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.Enterprise]), Controller.getProductsOrderAsync)
router.get('/getNotConfirmProductsOrder', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.Enterprise]), Controller.getNotConfirmProductsOrderAsync)
router.post('/confirmOrder', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.Enterprise]), Controller.confirmOrderAsync)


module.exports = router