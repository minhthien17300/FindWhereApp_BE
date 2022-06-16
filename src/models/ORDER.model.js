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
  shipperID: defaultModel.string,
  shipperName: defaultModel.string,
  discount: defaultModel.number,
  shipCost: defaultModel.number,
  totalPrice: defaultModel.number,
  isOnlinePayment: defaultModel.booleanFalse,
  status: defaultModel.number
});

const Order = module.exports = mongoose.model('ORDER', OrderSchema, 'ORDER');