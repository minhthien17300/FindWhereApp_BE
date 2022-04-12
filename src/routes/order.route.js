const express = require('express')
const Controller = require('../controllers/order.controller')
const SchemaValidateOrder = require("../validators/order.validator")
const router = express.Router()
const Validate = require("../validators")
const jwtServices = require("../services/jwt.service")
const verifyHelper = require('../helpers/verifyUser.helper')
const { defaultRoles } = require('../config/defineModel')


router.get('/getOrderByDate', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Controller.getOrderByDateAsync)
router.get('/getOrderByTotalPrice', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Controller.getOrderByTotalPriceAsync)
router.post('/placeOrder', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Validate.body(SchemaValidateOrder.placeOrder), Controller.placeOrderAsync)
router.get('/getShipperOrder', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.Shipper]), Controller.getShipperOrderAsync)
router.get('/confirmOrder', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.Shipper]), Controller.confirmOrderAsync)


module.exports = router