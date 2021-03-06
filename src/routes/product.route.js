const express = require('express')
const Controller = require('../controllers/product.controller')
const SchemaValidateProduct = require("../validators/product.validator")
const router = express.Router()
const Validate = require("../validators")
const jwtServices = require("../services/jwt.service")
const verifyHelper = require('../helpers/verifyUser.helper')
const { defaultRoles } = require('../config/defineModel')

const path = require("path");
var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "temp/images/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + Math.floor(Math.random() * 100) + path.extname(file.originalname));
    },
  });
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'images', maxCount: 100 }]);

router.post('/addProduct', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Enterprise]), cpUpload, Validate.body(SchemaValidateProduct.addProduct), Controller.addProductAsync)
router.post('/editProduct', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Enterprise]), cpUpload, Validate.body(SchemaValidateProduct.editProduct), Controller.editProductAsync)
router.post('/deleteProduct', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Enterprise]), Controller.deleteProductAsync)
router.get('/findProductByType', Controller.findProductByTypeAsync)
router.get('/getALLProduct', Controller.getALLProductAsync)
router.get('/getProductDetail', Controller.getProductDetailAsync)
router.get('/findProductByName', Controller.findProductByNameAsync)
router.get('/getProductSort', Controller.getProductSortAsync)
router.get('/getEnterpriseProductSort', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Enterprise]), Controller.getEnterpriseProductSortAsync)
router.get('/getEnterpriseProductSort2', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Enterprise]), Controller.getEnterpriseProductSort2Async)
router.get('/getProductOfEnterpriseSort',  Controller.getProductOfEnterpriseSortAsync)
router.get('/getSuggestedProducts', jwtServices.verify, verifyHelper.checkRole([defaultRoles.User]), Controller.getSuggestedProductsAsync)
router.post('/changeProductStatus', jwtServices.verify, verifyHelper.checkRole([defaultRoles.Enterprise]), Controller.changeProductStatusAsync)


module.exports = router