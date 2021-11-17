const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel');

// Image Schema
const ImageSchema = mongoose.Schema({
  url: defaultModel.array
});

const Image = module.exports = mongoose.model('IMAGEUPLOAD', ImageSchema, 'IMAGEUPLOAD');