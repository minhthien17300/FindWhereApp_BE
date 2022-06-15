const express = require('express')
const Controller = require('../controllers/user.controller')
const SchemaValidateUser = require("../validators/user.validator")
const router = express.Router()
const Validate = require("../validators")
const jwtServices = require("../services/jwt.service")
const verifyHelper = require('../helpers/verifyUser.helper')
const { defaultRoles } = require('../config/defineModel')


router.post('/login', Validate.body(SchemaValidateUser.login), Controller.loginAsync)
router.post('/register', Validate.body(SchemaValidateUser.register), Controller.registerAsync)
router.post('/confirmUnlock', Validate.body(SchemaValidateUser.confirmUnlock), Controller.confirmUnlockAsync)
router.post('/addEnterprise', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateUser.addEnterprise), Controller.addEnterpriseAsync)
router.post('/changePassword', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.User, defaultRoles.Enterprise]), Validate.body(SchemaValidateUser.changePass), Controller.changePasswordAsync)
router.get('/forgotPassword', Controller.forgotPasswordAsync)
router.post('/resetPassword', Validate.body(SchemaValidateUser.resetPassword), Controller.resetPasswordAsync)
router.get('/findUserByToken', jwtServices.verify, Controller.findUserByTokenAsync)
router.post('/changeInfo', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.User]), Validate.body(SchemaValidateUser.changeInfo), Controller.changeInfoAsync)
router.post('/changeEnterpriseInfo', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin, defaultRoles.Enterprise]), Validate.body(SchemaValidateUser.changeEnterpriseInfo), Controller.changeEnterpriseInfoAsync)
router.post('/banUser', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin]), Controller.banUserAsync)
router.post('/unbanUser', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Admin]), Controller.unbanUserAsync)
router.get('/getALLUser', Controller.getALLUserAsync);
router.get('/getALLEnterprise', Controller.getALLEnterpriseAsync);
router.get('/getEnterpriseByID', Controller.getEnterpriseByIDAsync);
router.post('/addSearchHistory', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Validate.body(SchemaValidateUser.addSearchHistory), Controller.addSearchHistoryAsync)
router.get('/getSearchHistory', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Controller.getSearchHistoryAsync)
router.get('/uploadUserLocation', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User, defaultRoles.Enterprise, defaultRoles.Shipper]), Controller.UploadUserLocationAsync)
router.get('/getShipperAround', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Enterprise]), Controller.getShipperAroundAsync)
router.get('/getShipperAround2', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Enterprise]), Controller.getShipperAroundAsync2)


module.exports = router