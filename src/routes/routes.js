const express = require('express')
const userRoute = require('./user.route')
const productRoute = require('./product.route')
const evaluateRoute = require('./evaluate.route')



const router = express.Router()
router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/evaluate', evaluateRoute)




router.get('/healCheck', (req, res) => res.status(200).send('Welcome to FindWhere'))

module.exports = router