const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel')

// Cart Schema
const CartSchema = mongoose.Schema({
  userID: defaultModel.string,
  ListEnterpriseID: defaultModel.array,
  cartDetail: defaultModel.array,
  totalPrice: defaultModel.number,
});

const Cart = module.exports = mongoose.model('CART', CartSchema, 'CART');