const joi = require('@hapi/joi');
const schemas = {
	addProductIntoCart: joi.object().keys({
		pID: joi.string().required(),
        pName: joi.string().required(),
		pAmount: joi.number(),
        pPrice: joi.number(),
		pImage: joi.string().required(),
	}),
	editProductInCart: joi.object().keys({
        pID: joi.string().required(),
		pAmount: joi.number(),
	}),
};
module.exports = schemas;