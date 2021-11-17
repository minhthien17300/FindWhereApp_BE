const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel')

// Enterprise Schema
const EnterpriseSchema = mongoose.Schema({
  accountName: defaultModel.stringUnique,
  accountPwd: defaultModel.stringR,
  name: defaultModel.stringR,
  email: defaultModel.stringUnique,
  phone: defaultModel.stringPhone,
  location: defaultModel.string,
  role: defaultModel.number,
  otp: defaultModel.string,
  isActived: defaultModel.boolean
});

const Enterprise = module.exports = mongoose.model('ENTERPRISEINFO', EnterpriseSchema, 'ENTERPRISEINFO');