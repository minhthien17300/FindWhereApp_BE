const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel')

// Order Schema
const OrderSchema = mongoose.Schema({
  userID: defaultModel.string,
  name: defaultModel.string,
  phone: defaultModel.stringPhone,
  location: defaultModel.string,
  lat: defaultModel.number,
  lng: defaultModel.number,
  orderDetail: defaultModel.array,
  orderDate: defaultModel.date,
  enterpriseID: defaultModel.string,
  enterpriseName: defaultModel.string,
  discount: defaultModel.number,
  shipCost: defaultModel.number,
  totalPrice: defaultModel.number,
  isConfirm: defaultModel.booleanFalse
});

const Order = module.exports = mongoose.model('ORDER', OrderSchema, 'ORDER');