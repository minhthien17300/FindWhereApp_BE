const joi = require('@hapi/joi');
const schemas = {
	register: joi.object().keys({
		userName: joi.string().required(),
		userPwd: joi.string().required(),
		confirmPassword: joi.string().required(),
		name: joi.string().required(),
		email: joi.string().email().required(),
	}),
	confirmUnlock: joi.object().keys({
		email: joi.string().email().required(),
		otp: joi.string().required()
	}),
	addEnterprise: joi.object().keys({
		userName: joi.string().required(),
		name: joi.string().required(),
		email: joi.string().email().required(),
		phone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
		//location: joi.string(),
		lat: joi.number(),
		lng: joi.number(),
	}),
	addShipper: joi.object().keys({
		userName: joi.string().required(),
		name: joi.string().required(),
		email: joi.string().email().required(),
		phone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
		//location: joi.string(),
		lat: joi.number(),
		lng: joi.number(),
	}),
	login: joi.object().keys({
		userName: joi.string().required(),
		userPwd: joi.string().required()
	}),
	changePass: joi.object().keys({
		oldPassword: joi.string().required(),
		newPassword: joi.string().required(),
		confirmPassword: joi.string().required() 
	}),
	resetPassword: joi.object().keys({
		email: joi.string().email().required(),
		password: joi.string().required(),
		confirmPassword: joi.string().required(),
		otp: joi.string().required()
	}),
	changeInfo: joi.object().keys({
		name: joi.string().required(),
		email: joi.string().email().required(),
		phone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
		gender: joi.number(),
		dateofBirth: joi.date()
	}),
	changeEnterpriseInfo: joi.object().keys({
		name: joi.string().required(),
		//email: joi.string().email().required(),
		phone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
		gender: joi.number(),
		dateofBirth: joi.date(),
		lat: joi.number(),
		lng: joi.number(),
		activeTime: joi.string().required()
	}),
	addSearchHistory: joi.object().keys({
		pID: joi.string().required(),
		pName: joi.string().required(),
		pPrice: joi.number(),
		pImage: joi.string().required(),
	}),
};
module.exports = schemas;