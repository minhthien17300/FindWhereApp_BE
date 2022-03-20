const express = require('express')
const userRoute = require('./user.route')
const productRoute = require('./product.route')
const evaluateRoute = require('./evaluate.route')
const typeRoute = require('./type.route')
const discountRoute = require('./discount.route')
const cartRoute = require('./cart.route')
const orderRoute = require('./order.route')



const router = express.Router()
router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/evaluate', evaluateRoute)
router.use('/type', typeRoute)
router.use('/discount', discountRoute)
router.use('/cart', cartRoute)
router.use('/order', orderRoute)




router.get('/*', (req, res) => res.status(200).send('Welcome to FindWhere'))

module.exports = router