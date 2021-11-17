const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel');

// Product Schema
const ProductSchema = mongoose.Schema({
  eID: defaultModel.stringR,
  name: defaultModel.stringR,
  price: defaultModel.number,
  types: defaultModel.array,
  image: defaultModel.number,
  score: defaultModel.number
});

const Product = module.exports = mongoose.model('PRODUCT', ProductSchema, 'PRODUCT');