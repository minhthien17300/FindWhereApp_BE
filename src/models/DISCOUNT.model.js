const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel')

// Discount Schema
const DiscountSchema = mongoose.Schema({
  name: defaultModel.string,
  discountAmount: defaultModel.number,
  //type of discount, true is directed minor, false is sale off % 
  discountType: defaultModel.boolean,
  //the number that the total price need to be above to apply discount
  applyCondition: defaultModel.number,
  expDate: defaultModel.date,
  usedCheck: defaultModel.array,
  isActive: defaultModel.boolean 
});

const Discount = module.exports = mongoose.model('DISCOUNT', DiscountSchema, 'DISCOUNT');