const joi = require('@hapi/joi');
const schemas = {
	addDiscount: joi.object().keys({
		dName: joi.string().required(),
		dAmount: joi.number(),
        dType: joi.boolean().required(),
        dCondition: joi.number(),
        dDate: joi.date()
	}),
	editDiscount: joi.object().keys({
        dID: joi.string().required(),
		dName: joi.string().required(),
		dAmount: joi.number(),
        dType: joi.boolean().required(),
        dCondition: joi.number(),
        dDate: joi.date()
	}),
};
module.exports = schemas;