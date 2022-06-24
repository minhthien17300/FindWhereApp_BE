const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel')

// User Schema
const UserSchema = mongoose.Schema({
  userName: defaultModel.stringUnique,
  userPwd: defaultModel.stringR,
  name: defaultModel.stringR,
  email: defaultModel.stringUnique,
  phone: defaultModel.stringPhone,
  gender: defaultModel.number,
  //location: defaultModel.string,
  lat: defaultModel.number,
  lng: defaultModel.number,
  dateofBirth: defaultModel.date,
  role: defaultModel.number,
  searchHistory: defaultModel.array,
  orderHistory: defaultModel.array,
  activeTime: defaultModel.string,
  otp: defaultModel.string,
  isWarned: defaultModel.number,
  isActived: defaultModel.booleanFalse
});

const User = module.exports = mongoose.model('USERINFO', UserSchema, 'USERINFO');