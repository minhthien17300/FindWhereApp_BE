const express = require('express')
const Controller = require('../controllers/type.controller')
const router = express.Router()



router.get('/getALLType', Controller.getALLTypeAsync);
router.get('/addType', Controller.addTypeAsync);

module.exports = router
