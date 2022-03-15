const express = require('express')
const Controller = require('../controllers/discount.controller')
const router = express.Router()
const SchemaValidateDiscount = require("../validators/discount.validator")
const Validate = require("../validators")
const jwtServices = require("../services/jwt.service")
const verifyHelper = require('../helpers/verifyUser.helper')
const { defaultRoles } = require('../config/defineModel')



router.post('/addDiscount', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateDiscount.addDiscount), Controller.addDiscountAsync);
router.post('/editDiscount', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateDiscount.editDiscount), Controller.editDiscountAsync);
router.post('/deleteDiscount', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin]), Controller.deleteDiscountAsync);
router.get('/getDiscount', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Controller.getDiscountAsync);
router.get('/getAvalableDiscount', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Controller.getAvalableDiscountAsync);
router.post('/useDiscount', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Controller.useDiscountAsync);

module.exports = router
