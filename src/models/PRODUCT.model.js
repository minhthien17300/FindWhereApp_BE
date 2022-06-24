const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel');

// Product Schema
const ProductSchema = mongoose.Schema({
  eID: defaultModel.stringR,
  name: defaultModel.stringR,
  price: defaultModel.number,
  description: defaultModel.string,
  types: defaultModel.array,
  images: defaultModel.array,
  score: defaultModel.number,
  isOutStock: defaultModel.booleanFalse,
  isDeleted: defaultModel.booleanFalse
});

const Product = module.exports = mongoose.model('PRODUCT', ProductSchema, 'PRODUCT');