const express = require('express')
const userRoute = require('./user.route')
const productRoute = require('./product.route')
const evaluateRoute = require('./evaluate.route')
const typeRoute = require('./type.route')
const discountRoute = require('./discount.route')



const router = express.Router()
router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/evaluate', evaluateRoute)
router.use('/type', typeRoute)
router.use('/discount', discountRoute)




router.get('/healCheck', (req, res) => res.status(200).send('Welcome to FindWhere'))

module.exports = router